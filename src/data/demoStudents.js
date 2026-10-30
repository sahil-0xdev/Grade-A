/**
 * Synthetic Demo Dataset for Grade A Dashboard
 * 42 realistic student records distributed across multiple classes and risk profiles.
 * All names, IDs, and metrics are completely fictional.
 */

export const DEMO_STUDENTS = [
  // High Risk - Multiple Warning Signals
  {
    studentId: "STU-1001",
    name: "Aarav Sharma",
    className: "Senior",
    section: "S2",
    totalClasses: 60,
    classesAttended: 40, // 67%
    totalAssignments: 10,
    assignmentsSubmitted: 5, // 50%
    averageMarks: 46, // 46%
    contactEmail: "aarav.sharma@demo-school.edu",
    guardianName: "Sunita Sharma",
    guardianPhone: "+1 (555) 019-2831",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 62, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 51, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 44, date: "2026-10-18" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 80 },
      { week: "Week 2", percentage: 70 },
      { week: "Week 3", percentage: 65 },
      { week: "Week 4", percentage: 60 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1002",
    name: "Marcus Vance",
    className: "Senior",
    section: "S1",
    totalClasses: 60,
    classesAttended: 38, // 63%
    totalAssignments: 12,
    assignmentsSubmitted: 6, // 50%
    averageMarks: 42,
    contactEmail: "marcus.vance@demo-school.edu",
    guardianName: "David Vance",
    guardianPhone: "+1 (555) 019-4822",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 58, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 45, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 39, date: "2026-10-18" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 75 },
      { week: "Week 2", percentage: 68 },
      { week: "Week 3", percentage: 60 },
      { week: "Week 4", percentage: 55 }
    ],
    lastUpdated: "2026-10-29"
  },
  {
    studentId: "STU-1003",
    name: "Elena Rostova",
    className: "Grade 11",
    section: "A",
    totalClasses: 55,
    classesAttended: 36, // 65%
    totalAssignments: 10,
    assignmentsSubmitted: 4, // 40%
    averageMarks: 48,
    contactEmail: "elena.r@demo-school.edu",
    guardianName: "Irina Rostova",
    guardianPhone: "+1 (555) 019-9941",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 55, date: "2026-08-14" },
      { name: "Midterm Exam", marks: 49, date: "2026-09-22" },
      { name: "Unit Test 2", marks: 45, date: "2026-10-20" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 72 },
      { week: "Week 2", percentage: 68 },
      { week: "Week 3", percentage: 62 },
      { week: "Week 4", percentage: 58 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1004",
    name: "Tariq Mansoor",
    className: "Grade 11",
    section: "B",
    totalClasses: 55,
    classesAttended: 37, // 67%
    totalAssignments: 10,
    assignmentsSubmitted: 5, // 50%
    averageMarks: 45,
    contactEmail: "tariq.m@demo-school.edu",
    guardianName: "Farhan Mansoor",
    guardianPhone: "+1 (555) 018-7712",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 60, date: "2026-08-14" },
      { name: "Midterm Exam", marks: 48, date: "2026-09-22" },
      { name: "Unit Test 2", marks: 40, date: "2026-10-20" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 70 },
      { week: "Week 2", percentage: 67 },
      { week: "Week 3", percentage: 65 },
      { week: "Week 4", percentage: 64 }
    ],
    lastUpdated: "2026-10-28"
  },
  {
    studentId: "STU-1005",
    name: "Chloe Bennett",
    className: "Grade 10",
    section: "A",
    totalClasses: 50,
    classesAttended: 33, // 66%
    totalAssignments: 10,
    assignmentsSubmitted: 4, // 40%
    averageMarks: 44,
    contactEmail: "chloe.b@demo-school.edu",
    guardianName: "Sarah Bennett",
    guardianPhone: "+1 (555) 017-3388",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 52, date: "2026-08-12" },
      { name: "Midterm Exam", marks: 46, date: "2026-09-18" },
      { name: "Unit Test 2", marks: 41, date: "2026-10-15" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 75 },
      { week: "Week 2", percentage: 68 },
      { week: "Week 3", percentage: 62 },
      { week: "Week 4", percentage: 60 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1006",
    name: "Kofi Mensah",
    className: "Grade 10",
    section: "B",
    totalClasses: 50,
    classesAttended: 35, // 70%
    totalAssignments: 10,
    assignmentsSubmitted: 5, // 50%
    averageMarks: 49,
    contactEmail: "kofi.m@demo-school.edu",
    guardianName: "Akosua Mensah",
    guardianPhone: "+1 (555) 017-5541",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 56, date: "2026-08-12" },
      { name: "Midterm Exam", marks: 50, date: "2026-09-18" },
      { name: "Unit Test 2", marks: 47, date: "2026-10-15" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 74 },
      { week: "Week 2", percentage: 72 },
      { week: "Week 3", percentage: 68 },
      { week: "Week 4", percentage: 66 }
    ],
    lastUpdated: "2026-10-27"
  },

  // Single-Signal Severe Trigger (Needs Review despite decent overall)
  {
    studentId: "STU-1007",
    name: "Liam O'Connor",
    className: "Senior",
    section: "S1",
    totalClasses: 60,
    classesAttended: 41, // 68% -> High Attendance Concern (<75%)
    totalAssignments: 10,
    assignmentsSubmitted: 9, // 90% (Good)
    averageMarks: 78, // 78% (Good)
    contactEmail: "liam.oc@demo-school.edu",
    guardianName: "Patrick O'Connor",
    guardianPhone: "+1 (555) 019-3311",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 82, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 76, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 79, date: "2026-10-18" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 85 },
      { week: "Week 2", percentage: 72 },
      { week: "Week 3", percentage: 62 },
      { week: "Week 4", percentage: 55 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1008",
    name: "Devon Reed",
    className: "Grade 11",
    section: "A",
    totalClasses: 55,
    classesAttended: 50, // 91% (Good)
    totalAssignments: 10,
    assignmentsSubmitted: 5, // 50% -> High Assignment Concern (<65%)
    averageMarks: 74, // 74% (Good)
    contactEmail: "devon.r@demo-school.edu",
    guardianName: "Karen Reed",
    guardianPhone: "+1 (555) 018-8833",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 78, date: "2026-08-14" },
      { name: "Midterm Exam", marks: 72, date: "2026-09-22" },
      { name: "Unit Test 2", marks: 75, date: "2026-10-20" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 92 },
      { week: "Week 2", percentage: 90 },
      { week: "Week 3", percentage: 91 },
      { week: "Week 4", percentage: 91 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1009",
    name: "Maya Patel",
    className: "Grade 10",
    section: "B",
    totalClasses: 50,
    classesAttended: 46, // 92% (Good)
    totalAssignments: 10,
    assignmentsSubmitted: 9, // 90% (Good)
    averageMarks: 45, // 45% -> High Marks Concern (<50%)
    contactEmail: "maya.patel@demo-school.edu",
    guardianName: "Rajesh Patel",
    guardianPhone: "+1 (555) 017-9922",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 52, date: "2026-08-12" },
      { name: "Midterm Exam", marks: 44, date: "2026-09-18" },
      { name: "Unit Test 2", marks: 41, date: "2026-10-15" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 90 },
      { week: "Week 2", percentage: 92 },
      { week: "Week 3", percentage: 94 },
      { week: "Week 4", percentage: 92 }
    ],
    lastUpdated: "2026-10-29"
  },

  // Medium Risk Students - Borderline / Mixed
  {
    studentId: "STU-1010",
    name: "Jackson Miller",
    className: "Senior",
    section: "S2",
    totalClasses: 60,
    classesAttended: 47, // 78% (Medium Concern)
    totalAssignments: 10,
    assignmentsSubmitted: 7, // 70% (Medium Concern)
    averageMarks: 62, // 62% (Medium Concern)
    contactEmail: "jackson.m@demo-school.edu",
    guardianName: "Brenda Miller",
    guardianPhone: "+1 (555) 019-1123",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 68, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 61, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 59, date: "2026-10-18" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 82 },
      { week: "Week 2", percentage: 78 },
      { week: "Week 3", percentage: 76 },
      { week: "Week 4", percentage: 77 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1011",
    name: "Zoe Chen",
    className: "Senior",
    section: "S1",
    totalClasses: 60,
    classesAttended: 48, // 80% (Medium Concern)
    totalAssignments: 10,
    assignmentsSubmitted: 8, // 80% (Medium Concern)
    averageMarks: 65, // 65% (Medium Concern)
    contactEmail: "zoe.chen@demo-school.edu",
    guardianName: "Wei Chen",
    guardianPhone: "+1 (555) 019-5432",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 70, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 64, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 63, date: "2026-10-18" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 84 },
      { week: "Week 2", percentage: 80 },
      { week: "Week 3", percentage: 78 },
      { week: "Week 4", percentage: 79 }
    ],
    lastUpdated: "2026-10-28"
  },
  {
    studentId: "STU-1012",
    name: "Amara Diallo",
    className: "Grade 11",
    section: "A",
    totalClasses: 55,
    classesAttended: 44, // 80% (Medium Concern)
    totalAssignments: 10,
    assignmentsSubmitted: 7, // 70% (Medium Concern)
    averageMarks: 61,
    contactEmail: "amara.d@demo-school.edu",
    guardianName: "Mamadou Diallo",
    guardianPhone: "+1 (555) 018-4491",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 65, date: "2026-08-14" },
      { name: "Midterm Exam", marks: 60, date: "2026-09-22" },
      { name: "Unit Test 2", marks: 59, date: "2026-10-20" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 82 },
      { week: "Week 2", percentage: 80 },
      { week: "Week 3", percentage: 79 },
      { week: "Week 4", percentage: 80 }
    ],
    lastUpdated: "2026-10-29"
  },
  {
    studentId: "STU-1013",
    name: "Gabriel Santos",
    className: "Grade 11",
    section: "B",
    totalClasses: 55,
    classesAttended: 43, // 78%
    totalAssignments: 10,
    assignmentsSubmitted: 8, // 80%
    averageMarks: 64,
    contactEmail: "gabriel.s@demo-school.edu",
    guardianName: "Fernanda Santos",
    guardianPhone: "+1 (555) 018-2234",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 68, date: "2026-08-14" },
      { name: "Midterm Exam", marks: 63, date: "2026-09-22" },
      { name: "Unit Test 2", marks: 62, date: "2026-10-20" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 80 },
      { week: "Week 2", percentage: 78 },
      { week: "Week 3", percentage: 76 },
      { week: "Week 4", percentage: 78 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1014",
    name: "Fatima Al-Hassan",
    className: "Grade 10",
    section: "A",
    totalClasses: 50,
    classesAttended: 39, // 78%
    totalAssignments: 10,
    assignmentsSubmitted: 7, // 70%
    averageMarks: 58,
    contactEmail: "fatima.ah@demo-school.edu",
    guardianName: "Tariq Al-Hassan",
    guardianPhone: "+1 (555) 017-6655",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 64, date: "2026-08-12" },
      { name: "Midterm Exam", marks: 56, date: "2026-09-18" },
      { name: "Unit Test 2", marks: 55, date: "2026-10-15" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 82 },
      { week: "Week 2", percentage: 79 },
      { week: "Week 3", percentage: 76 },
      { week: "Week 4", percentage: 76 }
    ],
    lastUpdated: "2026-10-27"
  },

  // Improving Students (Positive Trajectory)
  {
    studentId: "STU-1015",
    name: "Lucas Wright",
    className: "Senior",
    section: "S2",
    totalClasses: 60,
    classesAttended: 47, // 78% (Past dip, recent improvement)
    totalAssignments: 10,
    assignmentsSubmitted: 8, // 80%
    averageMarks: 68,
    contactEmail: "lucas.w@demo-school.edu",
    guardianName: "Jonathan Wright",
    guardianPhone: "+1 (555) 019-7788",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 55, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 66, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 78, date: "2026-10-18" } // Rapid rise!
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 72 },
      { week: "Week 2", percentage: 75 },
      { week: "Week 3", percentage: 82 },
      { week: "Week 4", percentage: 88 } // Improving!
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1016",
    name: "Priya Nair",
    className: "Grade 11",
    section: "A",
    totalClasses: 55,
    classesAttended: 45, // 82%
    totalAssignments: 10,
    assignmentsSubmitted: 9, // 90%
    averageMarks: 71,
    contactEmail: "priya.nair@demo-school.edu",
    guardianName: "Anand Nair",
    guardianPhone: "+1 (555) 018-9901",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 60, date: "2026-08-14" },
      { name: "Midterm Exam", marks: 72, date: "2026-09-22" },
      { name: "Unit Test 2", marks: 80, date: "2026-10-20" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 76 },
      { week: "Week 2", percentage: 80 },
      { week: "Week 3", percentage: 84 },
      { week: "Week 4", percentage: 87 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1017",
    name: "Mateo Gomez",
    className: "Grade 10",
    section: "B",
    totalClasses: 50,
    classesAttended: 41, // 82%
    totalAssignments: 10,
    assignmentsSubmitted: 8, // 80%
    averageMarks: 69,
    contactEmail: "mateo.g@demo-school.edu",
    guardianName: "Camila Gomez",
    guardianPhone: "+1 (555) 017-4321",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 58, date: "2026-08-12" },
      { name: "Midterm Exam", marks: 68, date: "2026-09-18" },
      { name: "Unit Test 2", marks: 76, date: "2026-10-15" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 78 },
      { week: "Week 2", percentage: 80 },
      { week: "Week 3", percentage: 84 },
      { week: "Week 4", percentage: 86 }
    ],
    lastUpdated: "2026-10-28"
  },

  // Low Risk Students - High Achievers and Solid Performers
  {
    studentId: "STU-1018",
    name: "Sophia Taylor",
    className: "Senior",
    section: "S1",
    totalClasses: 60,
    classesAttended: 58, // 97%
    totalAssignments: 10,
    assignmentsSubmitted: 10, // 100%
    averageMarks: 94,
    contactEmail: "sophia.t@demo-school.edu",
    guardianName: "Robert Taylor",
    guardianPhone: "+1 (555) 019-3329",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 92, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 95, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 96, date: "2026-10-18" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 98 },
      { week: "Week 2", percentage: 96 },
      { week: "Week 3", percentage: 97 },
      { week: "Week 4", percentage: 97 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1019",
    name: "Alexander Kim",
    className: "Senior",
    section: "S2",
    totalClasses: 60,
    classesAttended: 57, // 95%
    totalAssignments: 10,
    assignmentsSubmitted: 10, // 100%
    averageMarks: 91,
    contactEmail: "alex.kim@demo-school.edu",
    guardianName: "Min-jun Kim",
    guardianPhone: "+1 (555) 019-6612",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 88, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 92, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 94, date: "2026-10-18" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 95 },
      { week: "Week 2", percentage: 94 },
      { week: "Week 3", percentage: 96 },
      { week: "Week 4", percentage: 95 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1020",
    name: "Ananya Deshmukh",
    className: "Grade 11",
    section: "A",
    totalClasses: 55,
    classesAttended: 53, // 96%
    totalAssignments: 10,
    assignmentsSubmitted: 10, // 100%
    averageMarks: 89,
    contactEmail: "ananya.d@demo-school.edu",
    guardianName: "Sanjay Deshmukh",
    guardianPhone: "+1 (555) 018-2287",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 86, date: "2026-08-14" },
      { name: "Midterm Exam", marks: 89, date: "2026-09-22" },
      { name: "Unit Test 2", marks: 92, date: "2026-10-20" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 96 },
      { week: "Week 2", percentage: 96 },
      { week: "Week 3", percentage: 97 },
      { week: "Week 4", percentage: 96 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1021",
    name: "Benjamin Scott",
    className: "Grade 11",
    section: "B",
    totalClasses: 55,
    classesAttended: 51, // 93%
    totalAssignments: 10,
    assignmentsSubmitted: 9, // 90%
    averageMarks: 85,
    contactEmail: "ben.scott@demo-school.edu",
    guardianName: "Heather Scott",
    guardianPhone: "+1 (555) 018-9182",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 82, date: "2026-08-14" },
      { name: "Midterm Exam", marks: 85, date: "2026-09-22" },
      { name: "Unit Test 2", marks: 88, date: "2026-10-20" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 92 },
      { week: "Week 2", percentage: 93 },
      { week: "Week 3", percentage: 94 },
      { week: "Week 4", percentage: 93 }
    ],
    lastUpdated: "2026-10-29"
  },
  {
    studentId: "STU-1022",
    name: "Clara Johansson",
    className: "Grade 10",
    section: "A",
    totalClasses: 50,
    classesAttended: 48, // 96%
    totalAssignments: 10,
    assignmentsSubmitted: 10, // 100%
    averageMarks: 92,
    contactEmail: "clara.j@demo-school.edu",
    guardianName: "Lars Johansson",
    guardianPhone: "+1 (555) 017-8821",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 90, date: "2026-08-12" },
      { name: "Midterm Exam", marks: 93, date: "2026-09-18" },
      { name: "Unit Test 2", marks: 94, date: "2026-10-15" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 96 },
      { week: "Week 2", percentage: 95 },
      { week: "Week 3", percentage: 96 },
      { week: "Week 4", percentage: 97 }
    ],
    lastUpdated: "2026-10-28"
  },
  {
    studentId: "STU-1023",
    name: "Daniel Morales",
    className: "Grade 10",
    section: "B",
    totalClasses: 50,
    classesAttended: 46, // 92%
    totalAssignments: 10,
    assignmentsSubmitted: 9, // 90%
    averageMarks: 83,
    contactEmail: "daniel.m@demo-school.edu",
    guardianName: "Rosa Morales",
    guardianPhone: "+1 (555) 017-4902",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 81, date: "2026-08-12" },
      { name: "Midterm Exam", marks: 84, date: "2026-09-18" },
      { name: "Unit Test 2", marks: 85, date: "2026-10-15" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 92 },
      { week: "Week 2", percentage: 91 },
      { week: "Week 3", percentage: 93 },
      { week: "Week 4", percentage: 92 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1024",
    name: "Emily Watson",
    className: "Senior",
    section: "S1",
    totalClasses: 60,
    classesAttended: 55, // 92%
    totalAssignments: 10,
    assignmentsSubmitted: 9, // 90%
    averageMarks: 86,
    contactEmail: "emily.w@demo-school.edu",
    guardianName: "Andrew Watson",
    guardianPhone: "+1 (555) 019-8711",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 84, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 86, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 89, date: "2026-10-18" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 91 },
      { week: "Week 2", percentage: 92 },
      { week: "Week 3", percentage: 93 },
      { week: "Week 4", percentage: 92 }
    ],
    lastUpdated: "2026-10-30"
  },

  // Additional 18 students for rich distribution & pagination
  {
    studentId: "STU-1025",
    name: "Felix Zimmerman",
    className: "Senior",
    section: "S2",
    totalClasses: 60,
    classesAttended: 51, // 85%
    totalAssignments: 10,
    assignmentsSubmitted: 9, // 90%
    averageMarks: 76,
    contactEmail: "felix.z@demo-school.edu",
    guardianName: "Greta Zimmerman",
    guardianPhone: "+1 (555) 019-3320",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 74, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 76, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 78, date: "2026-10-18" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 86 },
      { week: "Week 2", percentage: 84 },
      { week: "Week 3", percentage: 85 },
      { week: "Week 4", percentage: 85 }
    ],
    lastUpdated: "2026-10-27"
  },
  {
    studentId: "STU-1026",
    name: "Grace Hopper-Lee",
    className: "Grade 11",
    section: "A",
    totalClasses: 55,
    classesAttended: 54, // 98%
    totalAssignments: 10,
    assignmentsSubmitted: 10, // 100%
    averageMarks: 97,
    contactEmail: "grace.hl@demo-school.edu",
    guardianName: "Kenneth Lee",
    guardianPhone: "+1 (555) 018-4421",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 96, date: "2026-08-14" },
      { name: "Midterm Exam", marks: 98, date: "2026-09-22" },
      { name: "Unit Test 2", marks: 98, date: "2026-10-20" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 98 },
      { week: "Week 2", percentage: 99 },
      { week: "Week 3", percentage: 98 },
      { week: "Week 4", percentage: 99 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1027",
    name: "Hannah Becker",
    className: "Grade 11",
    section: "B",
    totalClasses: 55,
    classesAttended: 44, // 80% (Medium Concern)
    totalAssignments: 10,
    assignmentsSubmitted: 7, // 70% (Medium Concern)
    averageMarks: 63,
    contactEmail: "hannah.b@demo-school.edu",
    guardianName: "Stefan Becker",
    guardianPhone: "+1 (555) 018-7762",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 66, date: "2026-08-14" },
      { name: "Midterm Exam", marks: 62, date: "2026-09-22" },
      { name: "Unit Test 2", marks: 61, date: "2026-10-20" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 82 },
      { week: "Week 2", percentage: 79 },
      { week: "Week 3", percentage: 78 },
      { week: "Week 4", percentage: 80 }
    ],
    lastUpdated: "2026-10-29"
  },
  {
    studentId: "STU-1028",
    name: "Ibrahim Qureshi",
    className: "Grade 10",
    section: "A",
    totalClasses: 50,
    classesAttended: 34, // 68% (High Attendance Concern)
    totalAssignments: 10,
    assignmentsSubmitted: 6, // 60% (High Assignment Concern)
    averageMarks: 47, // 47% (High Marks Concern)
    contactEmail: "ibrahim.q@demo-school.edu",
    guardianName: "Zubair Qureshi",
    guardianPhone: "+1 (555) 017-2234",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 54, date: "2026-08-12" },
      { name: "Midterm Exam", marks: 46, date: "2026-09-18" },
      { name: "Unit Test 2", marks: 42, date: "2026-10-15" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 74 },
      { week: "Week 2", percentage: 68 },
      { week: "Week 3", percentage: 65 },
      { week: "Week 4", percentage: 62 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1029",
    name: "Jessica Park",
    className: "Grade 10",
    section: "B",
    totalClasses: 50,
    classesAttended: 47, // 94%
    totalAssignments: 10,
    assignmentsSubmitted: 10, // 100%
    averageMarks: 88,
    contactEmail: "jessica.p@demo-school.edu",
    guardianName: "Hoon Park",
    guardianPhone: "+1 (555) 017-8899",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 87, date: "2026-08-12" },
      { name: "Midterm Exam", marks: 88, date: "2026-09-18" },
      { name: "Unit Test 2", marks: 90, date: "2026-10-15" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 95 },
      { week: "Week 2", percentage: 94 },
      { week: "Week 3", percentage: 94 },
      { week: "Week 4", percentage: 94 }
    ],
    lastUpdated: "2026-10-28"
  },
  {
    studentId: "STU-1030",
    name: "Kavita Rao",
    className: "Senior",
    section: "S1",
    totalClasses: 60,
    classesAttended: 56, // 93%
    totalAssignments: 10,
    assignmentsSubmitted: 10, // 100%
    averageMarks: 90,
    contactEmail: "kavita.rao@demo-school.edu",
    guardianName: "Venkatesh Rao",
    guardianPhone: "+1 (555) 019-7711",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 88, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 91, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 92, date: "2026-10-18" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 94 },
      { week: "Week 2", percentage: 93 },
      { week: "Week 3", percentage: 93 },
      { week: "Week 4", percentage: 94 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1031",
    name: "Lucas Rossi",
    className: "Senior",
    section: "S2",
    totalClasses: 60,
    classesAttended: 42, // 70% (High Attendance Concern)
    totalAssignments: 10,
    assignmentsSubmitted: 6, // 60% (High Assignment Concern)
    averageMarks: 52, // 52% (Medium Marks Concern)
    contactEmail: "lucas.rossi@demo-school.edu",
    guardianName: "Marco Rossi",
    guardianPhone: "+1 (555) 019-4402",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 60, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 52, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 46, date: "2026-10-18" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 76 },
      { week: "Week 2", percentage: 72 },
      { week: "Week 3", percentage: 68 },
      { week: "Week 4", percentage: 64 }
    ],
    lastUpdated: "2026-10-29"
  },
  {
    studentId: "STU-1032",
    name: "Mia Thorne",
    className: "Grade 11",
    section: "A",
    totalClasses: 55,
    classesAttended: 52, // 95%
    totalAssignments: 10,
    assignmentsSubmitted: 10, // 100%
    averageMarks: 87,
    contactEmail: "mia.t@demo-school.edu",
    guardianName: "Charles Thorne",
    guardianPhone: "+1 (555) 018-9933",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 85, date: "2026-08-14" },
      { name: "Midterm Exam", marks: 88, date: "2026-09-22" },
      { name: "Unit Test 2", marks: 89, date: "2026-10-20" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 95 },
      { week: "Week 2", percentage: 95 },
      { week: "Week 3", percentage: 94 },
      { week: "Week 4", percentage: 96 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1033",
    name: "Noah Fischer",
    className: "Grade 11",
    section: "B",
    totalClasses: 55,
    classesAttended: 46, // 84% (Medium Concern)
    totalAssignments: 10,
    assignmentsSubmitted: 8, // 80% (Medium Concern)
    averageMarks: 67,
    contactEmail: "noah.f@demo-school.edu",
    guardianName: "Sabine Fischer",
    guardianPhone: "+1 (555) 018-1122",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 71, date: "2026-08-14" },
      { name: "Midterm Exam", marks: 66, date: "2026-09-22" },
      { name: "Unit Test 2", marks: 64, date: "2026-10-20" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 86 },
      { week: "Week 2", percentage: 84 },
      { week: "Week 3", percentage: 82 },
      { week: "Week 4", percentage: 83 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1034",
    name: "Olivia Zhang",
    className: "Grade 10",
    section: "A",
    totalClasses: 50,
    classesAttended: 48, // 96%
    totalAssignments: 10,
    assignmentsSubmitted: 10, // 100%
    averageMarks: 95,
    contactEmail: "olivia.z@demo-school.edu",
    guardianName: "Li Zhang",
    guardianPhone: "+1 (555) 017-5566",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 94, date: "2026-08-12" },
      { name: "Midterm Exam", marks: 95, date: "2026-09-18" },
      { name: "Unit Test 2", marks: 96, date: "2026-10-15" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 96 },
      { week: "Week 2", percentage: 96 },
      { week: "Week 3", percentage: 97 },
      { week: "Week 4", percentage: 96 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1035",
    name: "Paulina Silva",
    className: "Grade 10",
    section: "B",
    totalClasses: 50,
    classesAttended: 40, // 80% (Medium Concern)
    totalAssignments: 10,
    assignmentsSubmitted: 7, // 70% (Medium Concern)
    averageMarks: 64,
    contactEmail: "paulina.s@demo-school.edu",
    guardianName: "Rodrigo Silva",
    guardianPhone: "+1 (555) 017-9090",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 68, date: "2026-08-12" },
      { name: "Midterm Exam", marks: 63, date: "2026-09-18" },
      { name: "Unit Test 2", marks: 62, date: "2026-10-15" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 84 },
      { week: "Week 2", percentage: 80 },
      { week: "Week 3", percentage: 78 },
      { week: "Week 4", percentage: 79 }
    ],
    lastUpdated: "2026-10-27"
  },
  {
    studentId: "STU-1036",
    name: "Quinn Holloway",
    className: "Senior",
    section: "S1",
    totalClasses: 60,
    classesAttended: 54, // 90%
    totalAssignments: 10,
    assignmentsSubmitted: 9, // 90%
    averageMarks: 82,
    contactEmail: "quinn.h@demo-school.edu",
    guardianName: "Margaret Holloway",
    guardianPhone: "+1 (555) 019-1299",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 80, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 82, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 84, date: "2026-10-18" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 90 },
      { week: "Week 2", percentage: 89 },
      { week: "Week 3", percentage: 91 },
      { week: "Week 4", percentage: 90 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1037",
    name: "Rohan Gupta",
    className: "Senior",
    section: "S2",
    totalClasses: 60,
    classesAttended: 56, // 93%
    totalAssignments: 10,
    assignmentsSubmitted: 10, // 100%
    averageMarks: 89,
    contactEmail: "rohan.g@demo-school.edu",
    guardianName: "Manoj Gupta",
    guardianPhone: "+1 (555) 019-6543",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 87, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 89, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 91, date: "2026-10-18" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 93 },
      { week: "Week 2", percentage: 94 },
      { week: "Week 3", percentage: 93 },
      { week: "Week 4", percentage: 94 }
    ],
    lastUpdated: "2026-10-28"
  },
  {
    studentId: "STU-1038",
    name: "Samantha Brooks",
    className: "Grade 11",
    section: "A",
    totalClasses: 55,
    classesAttended: 35, // 64% (High Attendance Concern)
    totalAssignments: 10,
    assignmentsSubmitted: 5, // 50% (High Assignment Concern)
    averageMarks: 49, // 49% (High Marks Concern)
    contactEmail: "samantha.b@demo-school.edu",
    guardianName: "Brian Brooks",
    guardianPhone: "+1 (555) 018-7711",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 56, date: "2026-08-14" },
      { name: "Midterm Exam", marks: 50, date: "2026-09-22" },
      { name: "Unit Test 2", marks: 44, date: "2026-10-20" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 72 },
      { week: "Week 2", percentage: 67 },
      { week: "Week 3", percentage: 62 },
      { week: "Week 4", percentage: 56 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1039",
    name: "Tyler Jenkins",
    className: "Grade 11",
    section: "B",
    totalClasses: 55,
    classesAttended: 50, // 91%
    totalAssignments: 10,
    assignmentsSubmitted: 9, // 90%
    averageMarks: 84,
    contactEmail: "tyler.j@demo-school.edu",
    guardianName: "Craig Jenkins",
    guardianPhone: "+1 (555) 018-3345",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 82, date: "2026-08-14" },
      { name: "Midterm Exam", marks: 84, date: "2026-09-22" },
      { name: "Unit Test 2", marks: 86, date: "2026-10-20" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 91 },
      { week: "Week 2", percentage: 90 },
      { week: "Week 3", percentage: 92 },
      { week: "Week 4", percentage: 91 }
    ],
    lastUpdated: "2026-10-29"
  },
  {
    studentId: "STU-1040",
    name: "Uma Thurman-Venkatesh",
    className: "Grade 10",
    section: "A",
    totalClasses: 50,
    classesAttended: 46, // 92%
    totalAssignments: 10,
    assignmentsSubmitted: 9, // 90%
    averageMarks: 87,
    contactEmail: "uma.tv@demo-school.edu",
    guardianName: "Deepak Venkatesh",
    guardianPhone: "+1 (555) 017-2211",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 86, date: "2026-08-12" },
      { name: "Midterm Exam", marks: 87, date: "2026-09-18" },
      { name: "Unit Test 2", marks: 88, date: "2026-10-15" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 92 },
      { week: "Week 2", percentage: 91 },
      { week: "Week 3", percentage: 93 },
      { week: "Week 4", percentage: 92 }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    studentId: "STU-1041",
    name: "Victor Hernandez",
    className: "Grade 10",
    section: "B",
    totalClasses: 50,
    classesAttended: 42, // 84% (Medium Attendance Concern)
    totalAssignments: 10,
    assignmentsSubmitted: 8, // 80% (Medium Assignment Concern)
    averageMarks: 66, // 66% (Medium Marks Concern)
    contactEmail: "victor.h@demo-school.edu",
    guardianName: "Elena Hernandez",
    guardianPhone: "+1 (555) 017-7654",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 70, date: "2026-08-12" },
      { name: "Midterm Exam", marks: 66, date: "2026-09-18" },
      { name: "Unit Test 2", marks: 63, date: "2026-10-15" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 86 },
      { week: "Week 2", percentage: 84 },
      { week: "Week 3", percentage: 83 },
      { week: "Week 4", percentage: 83 }
    ],
    lastUpdated: "2026-10-28"
  },
  {
    studentId: "STU-1042",
    name: "Wren Gallagher",
    className: "Senior",
    section: "S1",
    totalClasses: 60,
    classesAttended: 57, // 95%
    totalAssignments: 10,
    assignmentsSubmitted: 10, // 100%
    averageMarks: 93,
    contactEmail: "wren.g@demo-school.edu",
    guardianName: "Fiona Gallagher",
    guardianPhone: "+1 (555) 019-9087",
    assessmentHistory: [
      { name: "Unit Test 1", marks: 91, date: "2026-08-15" },
      { name: "Midterm Exam", marks: 93, date: "2026-09-20" },
      { name: "Unit Test 2", marks: 95, date: "2026-10-18" }
    ],
    attendanceHistory: [
      { week: "Week 1", percentage: 95 },
      { week: "Week 2", percentage: 96 },
      { week: "Week 3", percentage: 94 },
      { week: "Week 4", percentage: 95 }
    ],
    lastUpdated: "2026-10-30"
  }
];

export const INITIAL_INTERVENTIONS = [
  {
    id: "INT-001",
    studentId: "STU-1001",
    studentName: "Aarav Sharma",
    className: "Senior - S2",
    riskLevel: "High",
    action: "Schedule academic conference with student and advisor",
    reason: "Attendance (67%) and assignments (50%) both below support threshold",
    status: "In Progress",
    assignedTo: "Ms. Vance (Coordinator)",
    targetDate: "2026-11-04",
    notes: "Guardian contacted via phone on Oct 28. Aarav committed to turning in two missing senior assignments by Friday.",
    createdAt: "2026-10-25"
  },
  {
    id: "INT-002",
    studentId: "STU-1002",
    studentName: "Marcus Vance",
    className: "Senior - S1",
    riskLevel: "High",
    action: "Assign peer study mentor and offer tutoring catch-up",
    reason: "Marks (42%) and attendance (63%) indicate critical learning gaps",
    status: "Planned",
    assignedTo: "Mr. Henderson (Math Dept)",
    targetDate: "2026-11-06",
    notes: "Needs targeted support in Calculus Unit 2 fundamentals.",
    createdAt: "2026-10-27"
  },
  {
    id: "INT-003",
    studentId: "STU-1007",
    studentName: "Liam O'Connor",
    className: "Senior - S1",
    riskLevel: "Medium",
    action: "Counseling check-in regarding recent attendance drop",
    reason: "Attendance dropped to 68% despite strong marks (78%)",
    status: "In Progress",
    assignedTo: "Mrs. Alvarez (Counselor)",
    targetDate: "2026-11-03",
    notes: "Checking if medical or family transit difficulties are causing morning class absences.",
    createdAt: "2026-10-28"
  },
  {
    id: "INT-004",
    studentId: "STU-1008",
    studentName: "Devon Reed",
    className: "Grade 11 - A",
    riskLevel: "Medium",
    action: "Homework completion catch-up session during study hall",
    reason: "Missing 5 of 10 assignments despite 91% attendance",
    status: "Completed",
    assignedTo: "Ms. Vance (Coordinator)",
    targetDate: "2026-10-30",
    notes: "Devon submitted 3 outstanding assignments during yesterday's study hall. Submissions back on track.",
    createdAt: "2026-10-22"
  },
  {
    id: "INT-005",
    studentId: "STU-1003",
    studentName: "Elena Rostova",
    className: "Grade 11 - A",
    riskLevel: "High",
    action: "Multidisciplinary academic support plan",
    reason: "Attendance at 65% and marks down to 48%",
    status: "Planned",
    assignedTo: "Academic Support Team",
    targetDate: "2026-11-08",
    notes: "Formulating catch-up module for midterm topics.",
    createdAt: "2026-10-29"
  }
];
