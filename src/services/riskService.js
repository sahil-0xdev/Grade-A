/**
 * Risk Scoring and Explainability Service for "Grade A"
 * Implements transparent, rule-based academic early warning logic,
 * multi-assessment trend analysis, and Insufficient Data handling.
 */

export const DEFAULT_THRESHOLDS = {
  attendance: {
    lowConcernMin: 85,    // >= 85%
    mediumConcernMin: 75, // 75% - 84%
    // Below 75% is High Concern
  },
  assignments: {
    lowConcernMin: 85,    // >= 85%
    mediumConcernMin: 65, // 65% - 84%
    // Below 65% is High Concern
  },
  marks: {
    lowConcernMin: 70,    // >= 70%
    mediumConcernMin: 50, // 50% - 69%
    // Below 50% is High Concern
  }
};

export const DEFAULT_WEIGHTS = {
  attendance: 40,
  assignments: 30,
  marks: 30
};

/**
 * Calculates raw percentages from counts or direct percentages.
 */
export function calculatePercentages(student) {
  const attendancePct = typeof student.attendancePct === 'number'
    ? student.attendancePct
    : student.totalClasses > 0
    ? Math.round((student.classesAttended / student.totalClasses) * 100)
    : null;

  const assignmentsPct = typeof student.assignmentsPct === 'number'
    ? student.assignmentsPct
    : student.totalAssignments > 0
    ? Math.round((student.assignmentsSubmitted / student.totalAssignments) * 100)
    : null;

  const averageMarks = typeof student.averageMarks === 'number'
    ? Math.round(student.averageMarks)
    : null;

  return { attendancePct, assignmentsPct, averageMarks };
}

/**
 * Detects marks progression direction (declining, improving, stable).
 */
export function detectMarksTrend(student) {
  if (!student.assessmentHistory || student.assessmentHistory.length < 2) {
    return 'stable';
  }

  const scores = student.assessmentHistory.map(a => a.marks).filter(m => typeof m === 'number');
  if (scores.length < 2) return 'stable';

  const first = scores[0];
  const last = scores[scores.length - 1];

  if (last <= first - 10) return 'declining';
  if (last >= first + 8) return 'improving';

  // Check monotonic decline
  let isMonotonicDecline = true;
  for (let i = 1; i < scores.length; i++) {
    if (scores[i] >= scores[i - 1]) {
      isMonotonicDecline = false;
      break;
    }
  }
  if (isMonotonicDecline && scores.length >= 3) return 'declining';

  return 'stable';
}

/**
 * Detects attendance progression direction.
 */
export function detectAttendanceTrend(student) {
  if (!student.attendanceHistory || student.attendanceHistory.length < 2) {
    return 'stable';
  }

  const pcts = student.attendanceHistory.map(a => a.percentage).filter(p => typeof p === 'number');
  if (pcts.length < 2) return 'stable';

  const first = pcts[0];
  const last = pcts[pcts.length - 1];

  if (last <= first - 8) return 'declining';
  if (last >= first + 6) return 'improving';

  return 'stable';
}

/**
 * Determine concern levels: 'low', 'medium', or 'high' and numerical concern score (0, 50, 100).
 */
export function evaluateSignals(attendancePct, assignmentsPct, averageMarks, thresholds = DEFAULT_THRESHOLDS) {
  // Attendance
  let attendanceConcern = 'low';
  let attendanceConcernScore = 0;
  if (attendancePct === null) {
    attendanceConcern = 'insufficient';
  } else if (attendancePct < thresholds.attendance.mediumConcernMin) {
    attendanceConcern = 'high';
    attendanceConcernScore = 100;
  } else if (attendancePct < thresholds.attendance.lowConcernMin) {
    attendanceConcern = 'medium';
    attendanceConcernScore = 50;
  }

  // Assignments
  let assignmentsConcern = 'low';
  let assignmentsConcernScore = 0;
  if (assignmentsPct === null) {
    assignmentsConcern = 'insufficient';
  } else if (assignmentsPct < thresholds.assignments.mediumConcernMin) {
    assignmentsConcern = 'high';
    assignmentsConcernScore = 100;
  } else if (assignmentsPct < thresholds.assignments.lowConcernMin) {
    assignmentsConcern = 'medium';
    assignmentsConcernScore = 50;
  }

  // Marks
  let marksConcern = 'low';
  let marksConcernScore = 0;
  if (averageMarks === null) {
    marksConcern = 'insufficient';
  } else if (averageMarks < thresholds.marks.mediumConcernMin) {
    marksConcern = 'high';
    marksConcernScore = 100;
  } else if (averageMarks < thresholds.marks.lowConcernMin) {
    marksConcern = 'medium';
    marksConcernScore = 50;
  }

  return {
    attendance: { concern: attendanceConcern, score: attendanceConcernScore, pct: attendancePct },
    assignments: { concern: assignmentsConcern, score: assignmentsConcernScore, pct: assignmentsPct },
    marks: { concern: marksConcern, score: marksConcernScore, pct: averageMarks },
  };
}

/**
 * Generate natural language explanation for why a student was flagged.
 */
function generateReasons(student, signals, marksTrend, attTrend, thresholds) {
  const reasons = [];

  // Attendance reasons
  if (signals.attendance.concern === 'high') {
    const classesMissed = student.totalClasses ? (student.totalClasses - student.classesAttended) : null;
    reasons.push({
      signal: 'attendance',
      severity: 'high',
      text: `Attendance is ${signals.attendance.pct}%, below the ${thresholds.attendance.mediumConcernMin}% support threshold${classesMissed ? ` (${classesMissed} classes missed out of ${student.totalClasses})` : ''}.`
    });
  } else if (signals.attendance.concern === 'medium') {
    reasons.push({
      signal: 'attendance',
      severity: 'medium',
      text: `Attendance is ${signals.attendance.pct}%, approaching the support threshold.`
    });
  }

  if (attTrend === 'declining') {
    reasons.push({
      signal: 'attendance_trend',
      severity: 'medium',
      text: 'Recent weekly attendance exhibits a noticeable downward trend.'
    });
  }

  // Assignment reasons
  const missingAssignments = student.totalAssignments ? (student.totalAssignments - student.assignmentsSubmitted) : null;
  if (signals.assignments.concern === 'high') {
    reasons.push({
      signal: 'assignments',
      severity: 'high',
      text: `Assignment completion is ${signals.assignments.pct}%${missingAssignments ? `, with ${missingAssignments} assignments unsubmitted` : ''}.`
    });
  } else if (signals.assignments.concern === 'medium') {
    reasons.push({
      signal: 'assignments',
      severity: 'medium',
      text: `Assignment completion is ${signals.assignments.pct}%, in the moderate concern band.`
    });
  }

  // Marks reasons & trend
  if (signals.marks.concern === 'high') {
    reasons.push({
      signal: 'marks',
      severity: 'high',
      text: `Average marks stand at ${signals.marks.pct}%, falling under the ${thresholds.marks.mediumConcernMin}% passing threshold.`
    });
  } else if (signals.marks.concern === 'medium') {
    reasons.push({
      signal: 'marks',
      severity: 'medium',
      text: `Average marks stand at ${signals.marks.pct}%, within the moderate concern band (50%–69%).`
    });
  }

  // Check assessment history trend
  if (marksTrend === 'declining' && student.assessmentHistory && student.assessmentHistory.length >= 2) {
    const firstScore = student.assessmentHistory[0].marks;
    const latestScore = student.assessmentHistory[student.assessmentHistory.length - 1].marks;
    reasons.push({
      signal: 'marks_trend',
      severity: 'medium',
      text: `Assessment marks show a downward trend from ${firstScore}% to ${latestScore}% across the term.`
    });
  }

  return reasons;
}

/**
 * Identify positive/supporting factors to maintain balanced, supportive feedback.
 */
function identifySupportingFactors(student, signals, marksTrend, attTrend) {
  const supporting = [];

  if (signals.attendance.concern === 'low') {
    supporting.push(`Consistent attendance of ${signals.attendance.pct}%, well above institutional target.`);
  }

  if (signals.assignments.concern === 'low') {
    supporting.push(`High assignment discipline with ${signals.assignments.pct}% completed.`);
  }

  if (signals.marks.concern === 'low') {
    supporting.push(`Strong academic baseline with average marks of ${signals.marks.pct}%.`);
  }

  if (marksTrend === 'improving' && student.assessmentHistory && student.assessmentHistory.length >= 2) {
    const prev = student.assessmentHistory[student.assessmentHistory.length - 2].marks;
    const curr = student.assessmentHistory[student.assessmentHistory.length - 1].marks;
    supporting.push(`Marks improved from ${prev}% to ${curr}% in the most recent assessment.`);
  }

  if (attTrend === 'improving') {
    supporting.push('Weekly attendance exhibits positive upward momentum.');
  }

  if (supporting.length === 0) {
    supporting.push('Active enrollment with opportunity for targeted, supportive early intervention.');
  }

  return supporting;
}

/**
 * Suggest initial actionable interventions based on specific warning signals.
 */
export function getRecommendedIntervention(signals, marksTrend) {
  if (signals.attendance.concern === 'high' && signals.assignments.concern === 'high') {
    return 'Schedule a comprehensive educator-student conference and notify academic advisor regarding attendance & backlog.';
  }
  if (signals.attendance.concern === 'high') {
    return 'Initiate a supportive check-in to identify attendance barriers and establish a 2-week attendance tracking goal.';
  }
  if (signals.assignments.concern === 'high') {
    return 'Offer assignment catch-up session and assign a peer study partner for homework completion.';
  }
  if (signals.marks.concern === 'high' || marksTrend === 'declining') {
    return 'Recommend subject-specific remedial tutoring and review foundational syllabus modules.';
  }
  if (signals.marks.concern === 'medium' || signals.assignments.concern === 'medium') {
    return 'Conduct brief 1-on-1 check-in before the upcoming assessment and monitor submissions.';
  }
  return 'Maintain standard monitoring and provide positive reinforcement for steady progress.';
}

/**
 * Core risk calculation for a student record.
 */
export function calculateStudentRisk(student, thresholds = DEFAULT_THRESHOLDS, weights = DEFAULT_WEIGHTS) {
  const { attendancePct, assignmentsPct, averageMarks } = calculatePercentages(student);

  // Check Insufficient Data condition
  const hasInsufficientData = attendancePct === null || assignmentsPct === null || averageMarks === null;
  if (hasInsufficientData) {
    return {
      ...student,
      attendancePct: attendancePct || 0,
      assignmentsPct: assignmentsPct || 0,
      averageMarks: averageMarks || 0,
      weightedScore: 0,
      riskLevel: 'Insufficient Data',
      needsReview: true,
      reviewReason: 'Missing key academic data. Manual verification required before risk assessment.',
      trend: 'unknown',
      reasons: [{ signal: 'data', severity: 'high', text: 'Incomplete academic performance records on file.' }],
      supportingFactors: ['Active student record awaiting complete data synchronization.'],
      recommendedAction: 'Input missing attendance or assessment records.',
      lastCalculated: new Date().toISOString()
    };
  }

  const marksTrend = detectMarksTrend(student);
  const attTrend = detectAttendanceTrend(student);
  const signals = evaluateSignals(attendancePct, assignmentsPct, averageMarks, thresholds);

  // Normalize weights to sum to 1.0
  const totalWeight = (weights.attendance || 40) + (weights.assignments || 30) + (weights.marks || 30);
  const wAtt = (weights.attendance || 40) / totalWeight;
  const wAsg = (weights.assignments || 30) / totalWeight;
  const wMrk = (weights.marks || 30) / totalWeight;

  // Weighted score (0 - 100)
  const weightedScore = Math.round(
    (signals.attendance.score * wAtt) +
    (signals.assignments.score * wAsg) +
    (signals.marks.score * wMrk)
  );

  // Safeguard: single-signal trigger
  const hasHighConcernSignal =
    signals.attendance.concern === 'high' ||
    signals.assignments.concern === 'high' ||
    signals.marks.concern === 'high';

  let riskLevel = 'Low';
  if (weightedScore >= 60) {
    riskLevel = 'High';
  } else if (weightedScore >= 30) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'Low';
  }

  const needsReview = hasHighConcernSignal && riskLevel !== 'High';

  const reasons = generateReasons(student, signals, marksTrend, attTrend, thresholds);
  const supportingFactors = identifySupportingFactors(student, signals, marksTrend, attTrend);
  const recommendedAction = getRecommendedIntervention(signals, marksTrend);

  return {
    ...student,
    attendancePct,
    assignmentsPct,
    averageMarks,
    signals,
    weightedScore,
    riskLevel,
    marksTrend,
    attTrend,
    needsReview,
    reviewReason: needsReview
      ? `Flagged for educator review: High concern in ${[
          signals.attendance.concern === 'high' ? 'Attendance' : null,
          signals.assignments.concern === 'high' ? 'Assignments' : null,
          signals.marks.concern === 'high' ? 'Marks' : null,
        ].filter(Boolean).join(', ')} despite overall weighted score.`
      : null,
    reasons,
    supportingFactors,
    recommendedAction,
    lastCalculated: new Date().toISOString()
  };
}

/**
 * Calculate risk for an entire array of students.
 */
export function calculateAllStudentsRisk(students, thresholds = DEFAULT_THRESHOLDS, weights = DEFAULT_WEIGHTS) {
  return students.map(student => calculateStudentRisk(student, thresholds, weights));
}
