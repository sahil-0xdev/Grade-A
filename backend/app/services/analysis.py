"""
Transparent Risk Scoring & Statistical Trend Analysis Service for Grade A
Implements mathematical scoring, single-signal review triggers, and downward/upward trend detection.
"""
from typing import Dict, Any, List

DEFAULT_THRESHOLDS = {
    'attendance': {'lowConcernMin': 85.0, 'mediumConcernMin': 75.0},
    'assignments': {'lowConcernMin': 85.0, 'mediumConcernMin': 65.0},
    'marks': {'lowConcernMin': 70.0, 'mediumConcernMin': 50.0}
}

DEFAULT_WEIGHTS = {
    'attendance': 40,
    'assignments': 30,
    'marks': 30
}

def detect_marks_trend(test1, test2, test3) -> str:
    valid_tests = [t for t in [test1, test2, test3] if t is not None]
    if len(valid_tests) < 2:
        return 'insufficient_history'

    if len(valid_tests) == 3:
        if valid_tests[0] > valid_tests[1] > valid_tests[2] or (valid_tests[0] - valid_tests[2] >= 10):
            return 'declining'
        if valid_tests[0] < valid_tests[1] < valid_tests[2] or (valid_tests[2] - valid_tests[0] >= 10):
            return 'improving'
    elif len(valid_tests) == 2:
        if valid_tests[1] < valid_tests[0] - 8:
            return 'declining'
        if valid_tests[1] > valid_tests[0] + 8:
            return 'improving'

    return 'stable'

def evaluate_student(student: Dict[str, Any], thresholds=None, weights=None) -> Dict[str, Any]:
    thresholds = thresholds or DEFAULT_THRESHOLDS
    weights = weights or DEFAULT_WEIGHTS

    att = student.get('attendancePct')
    asg = student.get('assignmentsPct')
    mrk = student.get('averageMarks')
    t1 = student.get('test1')
    t2 = student.get('test2')
    t3 = student.get('test3')

    # Handle Insufficient Data
    if att is None or asg is None or mrk is None or student.get('hasMissingData'):
        return {
            **student,
            'riskLevel': 'Insufficient Data',
            'weightedScore': 0,
            'trend': 'unknown',
            'needsReview': True,
            'reviewReason': 'Missing critical attendance, assignment, or assessment data points on file.',
            'reasons': [{'signal': 'data', 'severity': 'high', 'text': 'Incomplete academic performance records. Manual verification required.'}],
            'supportingFactors': ['Enrolled student awaiting complete record synchronization.'],
            'recommendedAction': 'Contact registrar or teacher to enter missing attendance and assignment records.'
        }

    # Evaluate Attendance Concern
    if att < thresholds['attendance']['mediumConcernMin']:
        att_concern = 'high'
        att_score = 100
    elif att < thresholds['attendance']['lowConcernMin']:
        att_concern = 'medium'
        att_score = 50
    else:
        att_concern = 'low'
        att_score = 0

    # Evaluate Assignment Concern
    if asg < thresholds['assignments']['mediumConcernMin']:
        asg_concern = 'high'
        asg_score = 100
    elif asg < thresholds['assignments']['lowConcernMin']:
        asg_concern = 'medium'
        asg_score = 50
    else:
        asg_concern = 'low'
        asg_score = 0

    # Evaluate Marks Concern
    if mrk < thresholds['marks']['mediumConcernMin']:
        mrk_concern = 'high'
        mrk_score = 100
    elif mrk < thresholds['marks']['lowConcernMin']:
        mrk_concern = 'medium'
        mrk_score = 50
    else:
        mrk_concern = 'low'
        mrk_score = 0

    # Weighted Score
    total_w = weights['attendance'] + weights['assignments'] + weights['marks']
    w_att = weights['attendance'] / total_w
    w_asg = weights['assignments'] / total_w
    w_mrk = weights['marks'] / total_w

    weighted_score = round((att_score * w_att) + (asg_score * w_asg) + (mrk_score * w_mrk))

    # Trend calculation
    trend = detect_marks_trend(t1, t2, t3)

    # Base Risk Tier
    if weighted_score >= 60:
        risk_level = 'High'
    elif weighted_score >= 30:
        risk_level = 'Medium'
    else:
        risk_level = 'Low'

    # Safeguard check: any single high concern signal
    has_high_concern = (att_concern == 'high' or asg_concern == 'high' or mrk_concern == 'high')
    needs_review = has_high_concern and risk_level != 'High'

    reasons = []
    if att_concern == 'high':
        reasons.append({'signal': 'attendance', 'severity': 'high', 'text': f"Attendance is {att}%, below the {thresholds['attendance']['mediumConcernMin']}% support threshold."})
    elif att_concern == 'medium':
        reasons.append({'signal': 'attendance', 'severity': 'medium', 'text': f"Attendance is {att}%, approaching support threshold."})

    if asg_concern == 'high':
        reasons.append({'signal': 'assignments', 'severity': 'high', 'text': f"Assignment completion is {asg}%, significantly below expected {thresholds['assignments']['lowConcernMin']}%."})
    elif asg_concern == 'medium':
        reasons.append({'signal': 'assignments', 'severity': 'medium', 'text': f"Assignment completion is {asg}%, in the moderate concern band."})

    if mrk_concern == 'high':
        reasons.append({'signal': 'marks', 'severity': 'high', 'text': f"Assessment marks average {mrk}%, below passing target."})
    elif mrk_concern == 'medium':
        reasons.append({'signal': 'marks', 'severity': 'medium', 'text': f"Assessment marks average {mrk}%, in the moderate concern band."})

    if trend == 'declining':
        reasons.append({'signal': 'trend', 'severity': 'medium', 'text': f"Assessment scores show a downward trajectory across recent tests ({t1}% -> {t2}% -> {t3}%)."})

    supporting_factors = []
    if att_concern == 'low':
        supporting_factors.append(f"Strong class presence with {att}% attendance.")
    if asg_concern == 'low':
        supporting_factors.append(f"High assignment completion discipline ({asg}%).")
    if mrk_concern == 'low':
        supporting_factors.append(f"Solid academic baseline averaging {mrk}%.")
    if trend == 'improving':
        supporting_factors.append(f"Demonstrating positive score momentum in recent assessments ({t1}% -> {t3}%).")
    if not supporting_factors:
        supporting_factors.append("Active cohort member eligible for proactive, supportive educator intervention.")

    # Recommended Action
    if att_concern == 'high' and asg_concern == 'high':
        action = "Schedule comprehensive educator-student conference to review attendance barriers and overdue assignments."
    elif att_concern == 'high':
        action = "Conduct supportive 1-on-1 check-in to identify transit/morning schedule difficulties and monitor 2-week attendance."
    elif asg_concern == 'high':
        action = "Offer assignment catch-up session during study hall and pair with peer mentor."
    elif mrk_concern == 'high' or trend == 'declining':
        action = "Recommend targeted remedial tutoring on Unit 2 concepts and review test errors."
    else:
        action = "Maintain standard monitoring and provide positive reinforcement for consistent academic discipline."

    return {
        **student,
        'attendancePct': att,
        'assignmentsPct': asg,
        'averageMarks': mrk,
        'weightedScore': weighted_score,
        'riskLevel': risk_level,
        'trend': trend,
        'needsReview': needs_review,
        'reviewReason': f"Single-signal safeguard triggered: High concern in {', '.join([s for s, c in [('Attendance', att_concern), ('Assignments', asg_concern), ('Marks', mrk_concern)] if c == 'high'])}" if needs_review else None,
        'signals': {
            'attendance': {'concern': att_concern, 'pct': att},
            'assignments': {'concern': asg_concern, 'pct': asg},
            'marks': {'concern': mrk_concern, 'pct': mrk}
        },
        'reasons': reasons,
        'supportingFactors': supporting_factors,
        'recommendedAction': action
    }

def analyze_cohort(students: List[Dict[str, Any]], thresholds=None, weights=None) -> List[Dict[str, Any]]:
    return [evaluate_student(s, thresholds, weights) for s in students]
