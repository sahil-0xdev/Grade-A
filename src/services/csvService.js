/**
 * CSV Service for Grade A
 * Robust CSV parsing, strict educational validation, and RFC-4180 compliant CSV export.
 */

/**
 * Escapes a cell value for safe RFC-4180 CSV export.
 */
function escapeCSVCell(value) {
  if (value === null || value === undefined) return '""';
  const str = String(value);
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

/**
 * Downloads a text content as a file in the browser.
 */
export function downloadFile(filename, content, mimeType = 'text/csv;charset=utf-8;') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates and downloads the standard student template CSV.
 */
export function downloadStudentTemplateCSV() {
  const headers = [
    'student_id',
    'student_name',
    'class',
    'section',
    'total_classes',
    'classes_attended',
    'total_assignments',
    'assignments_submitted',
    'average_marks',
    'test1',
    'test2',
    'test3'
  ];

  const sampleRows = [
    ['STU-1001', 'Aarav Sharma', 'Grade 10', 'A', '60', '38', '12', '5', '42', '60', '48', '42'],
    ['STU-1002', 'Priya Patel', 'Grade 10', 'B', '60', '39', '10', '4', '45', '58', '49', '44'],
    ['STU-1003', 'Rohan Verma', 'Grade 11 Science', 'A', '65', '41', '14', '6', '39', '52', '44', '38'],
    ['STU-1004', 'Ananya Iyer', 'Grade 11 Commerce', 'B', '60', '40', '10', '5', '46', '62', '50', '43'],
    ['STU-1005', 'Aditya Joshi', 'Grade 10', 'A', '60', '46', '12', '9', '62', '68', '64', '61'],
    ['STU-1006', 'Meera Sen', 'Grade 10', 'B', '60', '47', '10', '7', '58', '65', '60', '56'],
    ['STU-1007', 'Shaurya Dasgupta', 'Grade 11 Science', 'A', '65', '41', '14', '13', '84', '88', '85', '82'],
    ['STU-1008', 'Sneha Chatterjee', 'Grade 10', 'B', '60', '58', '10', '10', '92', '90', '93', '94'],
    ['STU-1009', 'Harshvardhan Agarwal', 'Grade 10', 'A', '60', '56', '12', '12', '88', '85', '88', '91'],
    ['STU-1010', 'Diya Sengupta', 'Grade 10', 'A', '60', '58', '10', '10', '95', '94', '96', '97']
  ];

  const csvRows = [
    headers.join(','),
    ...sampleRows.map(row => row.map(escapeCSVCell).join(','))
  ];

  downloadFile('grade_a_indian_students_sample.csv', csvRows.join('\r\n'));
}

/**
 * Exports complete student directory with performance & risk metrics.
 */
export function exportStudentsCSV(studentsWithRisk) {
  const headers = [
    'Student ID',
    'Student Name',
    'Class',
    'Section',
    'Classes Attended',
    'Total Classes',
    'Attendance %',
    'Assignments Submitted',
    'Total Assignments',
    'Assignment Completion %',
    'Average Marks %',
    'Risk Level',
    'Risk Score',
    'Needs Review Safeguard',
    'Primary Warning',
    'Contact Email',
    'Last Updated'
  ];

  const rows = studentsWithRisk.map(s => [
    s.studentId,
    s.name,
    s.className,
    s.section,
    s.classesAttended,
    s.totalClasses,
    `${s.attendancePct}%`,
    s.assignmentsSubmitted,
    s.totalAssignments,
    `${s.assignmentsPct}%`,
    `${s.averageMarks}%`,
    s.riskLevel,
    s.weightedScore,
    s.needsReview ? 'YES' : 'NO',
    s.reasons && s.reasons.length > 0 ? s.reasons[0].text : 'None',
    s.contactEmail || '',
    s.lastUpdated || ''
  ]);

  const csvContent = [
    headers.map(escapeCSVCell).join(','),
    ...rows.map(r => r.map(escapeCSVCell).join(','))
  ].join('\r\n');

  const timestamp = new Date().toISOString().split('T')[0];
  downloadFile(`grade_a_students_export_${timestamp}.csv`, csvContent);
}

/**
 * Exports targeted Academic Risk & Explainability Report.
 */
export function exportRiskReportCSV(studentsWithRisk) {
  const headers = [
    'Student ID',
    'Student Name',
    'Class',
    'Section',
    'Overall Risk Category',
    'Weighted Score (0-100)',
    'Attendance Concern Level',
    'Assignment Concern Level',
    'Marks Concern Level',
    'Single-Signal Safeguard Triggered',
    'Explainability Notes',
    'Identified Supporting / Positive Factors',
    'Recommended Action'
  ];

  const rows = studentsWithRisk.map(s => [
    s.studentId,
    s.name,
    s.className,
    s.section,
    s.riskLevel,
    s.weightedScore,
    s.signals?.attendance?.concern?.toUpperCase() || 'LOW',
    s.signals?.assignments?.concern?.toUpperCase() || 'LOW',
    s.signals?.marks?.concern?.toUpperCase() || 'LOW',
    s.needsReview ? 'YES (High Concern in single signal)' : 'NO',
    s.reasons?.map(r => r.text).join(' | ') || 'All metrics within standard target',
    s.supportingFactors?.join(' | ') || 'None recorded',
    s.recommendedAction || 'Continue routine monitoring'
  ]);

  const csvContent = [
    headers.map(escapeCSVCell).join(','),
    ...rows.map(r => r.map(escapeCSVCell).join(','))
  ].join('\r\n');

  const timestamp = new Date().toISOString().split('T')[0];
  downloadFile(`grade_a_academic_risk_report_${timestamp}.csv`, csvContent);
}

/**
 * Exports current Interventions log.
 */
export function exportInterventionsCSV(interventions) {
  const headers = [
    'Intervention ID',
    'Student ID',
    'Student Name',
    'Class',
    'Risk Level',
    'Action Description',
    'Reason for Flag',
    'Current Status',
    'Assigned Educator',
    'Target Follow-up Date',
    'Educator Notes',
    'Created Date'
  ];

  const rows = interventions.map(item => [
    item.id,
    item.studentId,
    item.studentName || '',
    item.className || '',
    item.riskLevel || '',
    item.action,
    item.reason,
    item.status,
    item.assignedTo,
    item.targetDate || '',
    item.notes || '',
    item.createdAt || ''
  ]);

  const csvContent = [
    headers.map(escapeCSVCell).join(','),
    ...rows.map(r => r.map(escapeCSVCell).join(','))
  ].join('\r\n');

  const timestamp = new Date().toISOString().split('T')[0];
  downloadFile(`grade_a_interventions_${timestamp}.csv`, csvContent);
}

/**
 * Basic line-by-line CSV parser with quote support.
 */
function parseCSVLines(text) {
  const clean = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = [];
  let currentRow = [];
  let currentField = '';
  let insideQuote = false;

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    const nextChar = clean[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if (char === '\n' && !insideQuote) {
      currentRow.push(currentField.trim());
      if (currentRow.some(c => c !== '')) {
        lines.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some(c => c !== '')) {
      lines.push(currentRow);
    }
  }

  return lines;
}

/**
 * Parses and validates uploaded CSV text.
 * Returns { valid: boolean, errors: string[], preview: object[], validStudents: object[] }
 */
export function parseAndValidateStudentCSV(rawCSVText) {
  const errors = [];
  const validStudents = [];
  const seenIds = new Set();

  if (!rawCSVText || !rawCSVText.trim()) {
    return {
      valid: false,
      errors: ['The uploaded CSV file is empty.'],
      preview: [],
      validStudents: []
    };
  }

  const rows = parseCSVLines(rawCSVText);
  if (rows.length < 2) {
    return {
      valid: false,
      errors: ['The CSV file must contain a header row and at least one data row.'],
      preview: [],
      validStudents: []
    };
  }

  const headerRow = rows[0].map(h => h.toLowerCase().trim().replace(/[\s_-]+/g, '_'));
  
  // Required column mappings
  const requiredColumns = [
    'student_id',
    'student_name',
    'class',
    'section',
    'total_classes',
    'classes_attended',
    'total_assignments',
    'assignments_submitted',
    'average_marks'
  ];

  const colIdx = {};
  for (const col of requiredColumns) {
    const idx = headerRow.findIndex(h => h === col || h === col.replace(/_/g, ''));
    if (idx === -1) {
      errors.push(`Missing required column: "${col}". Expected header columns: ${requiredColumns.join(', ')}`);
    } else {
      colIdx[col] = idx;
    }
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors,
      preview: [],
      validStudents: []
    };
  }

  // Process data rows
  for (let i = 1; i < rows.length; i++) {
    const rowNum = i + 1; // 1-based line number
    const row = rows[i];
    const rowErrors = [];

    const studentId = row[colIdx.student_id] || '';
    const studentName = row[colIdx.student_name] || '';
    const className = row[colIdx.class] || '';
    const section = row[colIdx.section] || '';
    const totalClassesRaw = row[colIdx.total_classes];
    const classesAttendedRaw = row[colIdx.classes_attended];
    const totalAssignmentsRaw = row[colIdx.total_assignments];
    const assignmentsSubmittedRaw = row[colIdx.assignments_submitted];
    const averageMarksRaw = row[colIdx.average_marks];

    // Validations
    if (!studentId) rowErrors.push('Student ID is missing');
    if (!studentName) rowErrors.push('Student Name is missing');

    if (seenIds.has(studentId)) {
      rowErrors.push(`Duplicate Student ID "${studentId}" within the CSV file`);
    } else if (studentId) {
      seenIds.add(studentId);
    }

    const totalClasses = parseInt(totalClassesRaw, 10);
    const classesAttended = parseInt(classesAttendedRaw, 10);
    if (isNaN(totalClasses) || totalClasses <= 0) {
      rowErrors.push(`Total classes must be a positive integer (found "${totalClassesRaw}")`);
    }
    if (isNaN(classesAttended) || classesAttended < 0) {
      rowErrors.push(`Classes attended must be non-negative (found "${classesAttendedRaw}")`);
    } else if (classesAttended > totalClasses) {
      rowErrors.push(`Classes attended (${classesAttended}) cannot exceed total classes (${totalClasses})`);
    }

    const totalAssignments = parseInt(totalAssignmentsRaw, 10);
    const assignmentsSubmitted = parseInt(assignmentsSubmittedRaw, 10);
    if (isNaN(totalAssignments) || totalAssignments < 0) {
      rowErrors.push(`Total assignments must be non-negative (found "${totalAssignmentsRaw}")`);
    }
    if (isNaN(assignmentsSubmitted) || assignmentsSubmitted < 0) {
      rowErrors.push(`Assignments submitted must be non-negative (found "${assignmentsSubmittedRaw}")`);
    } else if (assignmentsSubmitted > totalAssignments) {
      rowErrors.push(`Assignments submitted (${assignmentsSubmitted}) cannot exceed total assignments (${totalAssignments})`);
    }

    const averageMarks = parseFloat(averageMarksRaw);
    if (isNaN(averageMarks) || averageMarks < 0 || averageMarks > 100) {
      rowErrors.push(`Average marks must be a number between 0 and 100 (found "${averageMarksRaw}")`);
    }

    if (rowErrors.length > 0) {
      errors.push(`Row ${rowNum} (${studentName || studentId || 'unnamed'}): ${rowErrors.join(', ')}`);
    } else {
      // Build normalized student record
      const attendancePct = totalClasses > 0 ? Math.round((classesAttended / totalClasses) * 100) : 0;
      validStudents.push({
        studentId,
        name: studentName,
        className,
        section,
        totalClasses,
        classesAttended,
        totalAssignments,
        assignmentsSubmitted,
        averageMarks: Math.round(averageMarks),
        assessmentHistory: [
          { name: "Prior Assessment", marks: Math.max(30, Math.round(averageMarks - 3)), date: "2026-09-15" },
          { name: "Latest Assessment", marks: Math.round(averageMarks), date: "2026-10-20" }
        ],
        attendanceHistory: [
          { week: "Prior Period", percentage: Math.min(100, Math.max(40, attendancePct - 2)) },
          { week: "Current Period", percentage: attendancePct }
        ],
        lastUpdated: new Date().toISOString().split('T')[0],
        imported: true
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    validCount: validStudents.length,
    invalidCount: errors.length,
    preview: validStudents.slice(0, 5),
    validStudents
  };
}
