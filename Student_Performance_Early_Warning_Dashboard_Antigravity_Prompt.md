# Antigravity Build Specification
## Student Performance Early-Warning Dashboard

**Project:** Hackathon web application  
**Build approach:** From scratch  
**Primary users:** Teachers, academic coordinators, and administrators  
**Core purpose:** Identify students who may need academic support by analyzing attendance, assignment completion, and marks; explain why they are flagged; and suggest practical interventions.

---

# 1. Important Setup Decision — Keep the Stack Lightweight

Build this project so the team can develop and demo it without spending time configuring external services.

## Required approach for the hackathon MVP

- Use **React + Vite** for the frontend.
- Use **JavaScript** (TypeScript is also acceptable if the project is already configured for it).
- Use **Tailwind CSS** or clean modular CSS.
- Use **Recharts** for charts, if needed.
- Use **Lucide React** for icons.
- Store demo data locally in the application and persist changes with **localStorage**.
- Include CSV import and export so educators can work with spreadsheet data.
- Do **not** require Firebase, Supabase, MongoDB Atlas, Cloudflare, AWS, a storage bucket, Resend, email OTP, paid APIs, or any other external platform for the first working version.
- Do not add authentication that depends on an external identity provider. A simple demo role switch or local demo login is sufficient if a login screen is useful.
- The app must run locally with a small number of commands and must work without API keys or environment secrets.

**Backend decision:** A separate backend is not essential for the hackathon prototype. Build the first complete version as a frontend application using local demo data and localStorage. Keep data access behind a small service/helper layer so a real backend can be added later without rewriting the UI.

**Before adding any external service:** Stop and explain to the team what feature requires it, why it is necessary, what setup is involved, and whether a local alternative exists. Do not silently introduce external dependencies or services.

---

# 2. Project Overview

Build a complete, polished, responsive web application named **Student Performance Early-Warning Dashboard**.

The application helps educators identify students who may be falling behind by analyzing three core signals:

1. **Attendance** — attendance percentage and absence patterns.
2. **Assignments** — assignment completion and submission patterns.
3. **Marks** — recent assessment scores and changes in performance.

Classify students into three clear risk levels:

- **Low Risk** — green
- **Medium Risk** — yellow/amber
- **High Risk** — red

For every flagged student, clearly explain **why** the student received that risk level and provide useful **suggested next steps**.

This is an early-warning and student-support tool. It must not present predictions as certain facts, label students negatively, or make disciplinary/final academic decisions automatically.

Use a **synthetic sample dataset** initially so the project works immediately after setup. Clearly label it as synthetic/demo data. The application should be structured so real institutional data can be imported later.

---

# 3. Main Goals

The finished application must:

- Give educators a quick overview of class or institutional academic health.
- Show the number and percentage of low-, medium-, and high-risk students.
- Help educators find and inspect individual student records.
- Explain each risk flag using attendance, assignment, and marks data.
- Recommend practical interventions based on detected warning signs.
- Show trends over time rather than relying only on one score.
- Support filtering, searching, sorting, and CSV export.
- Work smoothly on desktop, tablet, and Android mobile screens.
- Include realistic, internally consistent demo data.
- Be understandable to a first-time teacher or hackathon evaluator.

Do not build only a static landing page or decorative dashboard. All major controls, filters, navigation items, charts, and student detail views must work.

---

# 4. Application Structure and Navigation

Create a clean sidebar navigation on desktop and a mobile-friendly drawer/bottom navigation on smaller screens.

Main navigation:

1. **Overview**
2. **Students**
3. **Risk Analysis**
4. **Interventions**
5. **Reports**
6. **Data Management**
7. **Settings / About**

Include a clear page title, short page description, and consistent navigation state on every page.

Add a top bar containing:

- Application name/logo.
- Current academic term or selected class.
- Search access.
- Notification/attention indicator (can be local/demo).
- User profile or demo role indicator.

Avoid unnecessary pages that do not support the core project.

---

# 5. Overview Dashboard

The Overview page is the main screen and must look polished enough for a live hackathon demonstration.

## 5.1 Summary cards

Display:

- Total Students
- High-Risk Students
- Medium-Risk Students
- Low-Risk Students
- Average Attendance
- Average Marks

Each card should show a meaningful number, label, icon, and optional comparison/trend indicator. Do not invent historical comparisons if no historical data exists.

Clicking a risk card should navigate to the Students page with the corresponding risk filter already applied.

## 5.2 Charts

Include useful, readable charts:

- **Risk Distribution:** donut/pie chart showing low, medium, and high risk.
- **Attendance Overview:** bar or line chart showing class average attendance over recent weeks.
- **Academic Performance:** line chart showing average marks over recent assessments.
- **Signal Comparison:** chart comparing attendance, assignment completion, and marks averages.

Charts must use the same data as the summary cards and student table. Add tooltips, legends, and clear labels. Charts must resize correctly on mobile.

## 5.3 Attention required section

Show a compact list of students who need attention, prioritizing high-risk students.

Each row/card should include:

- Student name and ID.
- Class/section.
- Risk badge.
- Main reason for the flag.
- One suggested next action.
- Button to open student details.

Do not display sensitive or unnecessary personal information on the overview page.

---

# 6. Students Page

Create a complete student directory.

## 6.1 Table fields

Display:

- Student ID
- Student Name
- Class / Section
- Attendance %
- Assignment Completion %
- Average Marks %
- Risk Level
- Last Updated
- View Details action

On mobile, convert the table into clean student cards or a horizontally scrollable table with clear affordances.

## 6.2 Search and filters

Implement working controls for:

- Search by student name or ID.
- Filter by Low / Medium / High risk.
- Filter by class or section.
- Filter by attendance range.
- Filter by assignment completion range.
- Filter by marks range.
- Sort by name, attendance, assignment completion, marks, or risk.

Provide a **Clear Filters** action and show the number of matching students.

## 6.3 Student detail view

Clicking a student opens a dedicated detail page or a large responsive detail panel.

Include:

**Student profile**
- Name
- Student ID
- Class / section
- Optional demo contact field (use fictional data only)

**Performance indicators**
- Attendance percentage.
- Classes attended and total classes.
- Assignment completion percentage.
- Submitted, late, and missing assignments.
- Average marks.
- Recent assessment marks.

**Trend visualizations**
- Attendance trend.
- Marks trend.
- Assignment submission trend.

**Why this student was flagged**
Show an explanation in plain language, such as:
- "Attendance is 68%, below the 75% support threshold."
- "4 of 10 assignments are missing."
- "Marks declined from 72% to 51% across the latest assessments."

Only show reasons supported by that student's actual demo/imported data.

**Supporting factors**
Also show positive indicators, for example:
- Improving marks in the latest assessment.
- Recent improvement in attendance.
- Strong assignment completion in a particular subject.

Do not show only negative information.

**Suggested interventions**
Provide relevant, actionable suggestions and allow the educator to mark an action as:
- Planned
- In Progress
- Completed

Examples:
- Schedule a supportive check-in with the student.
- Contact the student/guardian through the institution's normal process.
- Offer assignment catch-up time.
- Recommend subject-specific tutoring.
- Monitor attendance over the next two weeks.
- Review whether external circumstances are affecting participation.

Include a notes area stored locally for the demo. Make it clear that notes are demo/local data unless a real backend is later added.

---

# 7. Risk Scoring and Explainability

This is one of the most important parts of the project. Implement a transparent, understandable rule-based model first. Do not pretend that the prototype uses machine learning or AI if it does not.

## 7.1 Initial signal thresholds

Use these initial configurable thresholds:

| Signal | Low concern | Medium concern | High concern |
|---|---:|---:|---:|
| Attendance | 85% or higher | 75%–84% | Below 75% |
| Assignment completion | 85% or higher | 65%–84% | Below 65% |
| Average marks | 70% or higher | 50%–69% | Below 50% |

These are example thresholds for the demo, not universal educational standards. Add a note that educators/institutions should adjust them to their context.

## 7.2 Risk score

Implement a transparent weighted score from 0 to 100:

- Attendance concern: 40% weight.
- Assignment concern: 30% weight.
- Marks concern: 30% weight.

Convert each signal into a concern score:
- Strong performance = 0 concern.
- Medium concern = 50 concern.
- High concern = 100 concern.

Weighted risk score:

`Risk Score = (Attendance Concern × 0.40) + (Assignment Concern × 0.30) + (Marks Concern × 0.30)`

Suggested classification:
- **Low Risk:** 0–29
- **Medium Risk:** 30–59
- **High Risk:** 60–100

Also include a safeguard: if any single signal is in the high-concern range, the student should be visibly flagged for educator review even if the weighted score is lower. Clearly distinguish this single-signal warning from the overall weighted score.

Use a clear label such as **"Needs review"** and explain the triggering signal.

## 7.3 Explain every result

For every student, show:

- Overall risk score.
- Risk category.
- Contribution of each signal.
- Exact threshold crossed.
- Plain-language explanation.
- Positive/supporting factors.
- Date/time of last calculation.

Never display a risk score without showing how it was calculated.

## 7.4 Threshold settings

Allow a demo administrator/educator to adjust the thresholds and weights in Settings.

- Validate that weights total 100%.
- Provide a **Restore Default Thresholds** button.
- Recalculate all students when settings change.
- Explain that threshold changes affect flags and should be reviewed by educators.

---

# 8. Interventions Page

Create a practical intervention management page.

Show a list of recommended and tracked actions, with:

- Student name and ID.
- Risk level.
- Reason for intervention.
- Recommended action.
- Assigned staff member (fictional/demo value).
- Status: Planned / In Progress / Completed.
- Created date.
- Target follow-up date.

Allow educators to:

- Change intervention status.
- Add a note.
- Set or update a follow-up date.
- Filter by status and risk level.
- Open the related student detail page.

Use localStorage for persistence in the MVP.

Avoid automated emails or SMS. These require external integrations and are not necessary for the first hackathon version.

---

# 9. Reports Page

Build a useful reporting area with:

- Total students.
- Risk distribution.
- Average attendance.
- Average assignment completion.
- Average marks.
- Students requiring review.
- Intervention status summary.

Add date/class/section filters where supported by the data.

Include:
- **Export Students CSV**
- **Export Risk Report CSV**
- **Export Interventions CSV**

CSV files should have clear column headings and open correctly in Excel or Google Sheets. Use safe CSV escaping for commas, quotes, and newlines.

If PDF export is implemented, generate it locally in the browser. Do not add a cloud PDF service.

---

# 10. Data Management

This page is essential because the prototype starts with synthetic data but should be ready for real data.

## 10.1 Demo dataset

Seed at least 30–50 fictional students across multiple classes/sections.

Create varied but realistic records:
- Some students with strong attendance, assignments, and marks.
- Some with one warning signal.
- Some with multiple warning signals.
- Some students whose performance is improving.
- Some students with mixed results.

Use fictional names and fictional IDs. Do not use real student personal information.

Ensure all calculations, charts, summary cards, tables, and reports derive from the same dataset.

Add a visible **Demo Data** label while the synthetic dataset is active.

## 10.2 CSV import

Provide a CSV upload/import flow for student performance data.

Support a documented CSV format with columns such as:

`student_id,student_name,class,section,total_classes,classes_attended,total_assignments,assignments_submitted,average_marks`

Requirements:
- Provide a downloadable sample CSV template.
- Validate required columns.
- Validate numeric ranges.
- Reject or report invalid rows with understandable error messages.
- Detect duplicate student IDs.
- Show an import preview before applying changes.
- Let the user cancel or confirm the import.
- Never silently discard invalid records.
- After import, recalculate risk and refresh all dashboard views.
- Clearly label imported data as imported data, not synthetic demo data.

If time permits, support importing a separate assessment history CSV. Do not block the main MVP on this extra feature.

## 10.3 Reset demo data

Add a clearly labeled **Reset to Demo Data** button with a confirmation dialog. This should restore the original synthetic dataset and default settings.

---

# 11. Settings and About

Settings should include:

- Risk thresholds.
- Risk score weights.
- Institution/class display name (editable locally).
- Academic term label.
- Theme preference if easy to implement.
- Restore defaults.

About section should explain:

- What the dashboard does.
- What signals it uses.
- How the risk score is calculated.
- That the sample dataset is synthetic.
- That flags are indicators for educator review, not definitive predictions.
- That the application is a hackathon prototype.

---

# 12. UI / UX Design Direction

Create a professional education analytics product, not a generic admin template.

## Visual direction

- Clean, modern, trustworthy interface.
- Light background with navy/blue primary accents.
- Use green, amber, and red only for risk/status indicators.
- White or softly tinted cards with subtle borders and shadows.
- Clear typography and strong hierarchy.
- Consistent spacing, border radius, and icon style.
- Avoid excessive gradients, glassmorphism, animation, and visual clutter.
- Use charts that are readable and not oversized.
- Make the most important information visible without scrolling excessively.

## Responsive requirements

Desktop:
- Sidebar navigation.
- Multi-column dashboard cards and charts.
- Comfortable table layout.

Tablet:
- Collapsible sidebar.
- Reflow cards and charts.

Android/mobile:
- No horizontal page overflow.
- Navigation becomes a drawer or compact bottom navigation.
- Summary cards use a responsive two-column or one-column layout.
- Tables become cards or controlled horizontal scrolling.
- Buttons and inputs are touch-friendly.
- Student detail page is easy to read on a narrow screen.
- Charts resize and remain legible.

Test at common widths such as 360px, 390px, 768px, 1024px, and desktop.

Add loading, empty, error, and success states where appropriate. Use confirmation dialogs for destructive actions.

---

# 13. Accessibility and Responsible Use

- Use semantic HTML.
- Ensure keyboard navigation works.
- Use visible focus states.
- Do not rely on color alone to communicate risk; always include text labels/icons.
- Maintain readable contrast.
- Add labels to form inputs.
- Use plain, supportive language.
- Avoid stigmatizing terms such as "bad student" or "failure".
- Explain that a risk flag is a prompt for human review.
- Do not make automated decisions about promotion, punishment, or eligibility.
- Do not expose personal student data in public/demo views.

---

# 14. Data Model

Use a consistent data structure throughout the app. A suggested student object:

```js
{
  studentId: "STU-1001",
  name: "Aarav Sharma",
  className: "Senior",
  section: "S2",
  totalClasses: 60,
  classesAttended: 48,
  totalAssignments: 10,
  assignmentsSubmitted: 7,
  averageMarks: 64,
  assessmentHistory: [
    { name: "Test 1", marks: 72, date: "2026-08-10" },
    { name: "Test 2", marks: 66, date: "2026-09-05" },
    { name: "Test 3", marks: 54, date: "2026-10-01" }
  ],
  attendanceHistory: [
    { week: "Week 1", percentage: 90 },
    { week: "Week 2", percentage: 82 },
    { week: "Week 3", percentage: 76 }
  ],
  lastUpdated: "2026-10-30"
}
```

Derived values such as attendance percentage, assignment completion percentage, concern scores, risk score, and risk category should be calculated from source values rather than manually duplicated in the dataset.

Suggested intervention object:

```js
{
  id: "INT-001",
  studentId: "STU-1001",
  action: "Schedule a supportive academic check-in",
  reason: "Attendance has fallen below the configured threshold",
  status: "Planned",
  assignedTo: "Demo Educator",
  followUpDate: "2026-11-06",
  notes: ""
}
```

Keep the data model simple and document it.

---

# 15. Suggested Project Structure

Use a maintainable structure similar to:

```text
student-early-warning/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   ├── cards/
│   │   ├── charts/
│   │   ├── tables/
│   │   └── common/
│   ├── pages/
│   │   ├── Overview.jsx
│   │   ├── Students.jsx
│   │   ├── StudentDetails.jsx
│   │   ├── RiskAnalysis.jsx
│   │   ├── Interventions.jsx
│   │   ├── Reports.jsx
│   │   ├── DataManagement.jsx
│   │   └── Settings.jsx
│   ├── data/
│   │   └── demoStudents.js
│   ├── services/
│   │   ├── storageService.js
│   │   ├── riskService.js
│   │   └── csvService.js
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

You may adjust the structure if there is a clear technical reason. Keep components reusable and avoid putting the entire application in one giant file.

---

# 16. Functional Acceptance Checklist

Do not consider the project complete until these work:

- [ ] Application starts locally using documented commands.
- [ ] No external API keys or cloud setup are required.
- [ ] Overview cards show correct values from the dataset.
- [ ] Charts use the same source data as the cards and tables.
- [ ] Risk distribution totals match the student records.
- [ ] Risk scoring follows the documented formula.
- [ ] Every risk flag has an understandable explanation.
- [ ] Supporting/positive factors are displayed where present.
- [ ] Student search works.
- [ ] All filters and sorting work together correctly.
- [ ] Student detail view shows correct individual data.
- [ ] Interventions can be created/updated and persist after refresh.
- [ ] CSV export works and opens as a spreadsheet.
- [ ] CSV import validates, previews, and applies valid records.
- [ ] Reset demo data works after confirmation.
- [ ] Threshold settings recalculate risk correctly.
- [ ] Mobile layout works without page-level horizontal overflow.
- [ ] Empty states and error messages are understandable.
- [ ] No buttons are decorative or non-functional.
- [ ] No fake AI/ML claims are made.

---

# 17. Build Order — Follow This Sequence

Build in manageable phases. Do not attempt to create every feature in one pass without testing.

## Phase 1 — Foundation
- Inspect the existing workspace.
- If it is empty, initialize the React + Vite project.
- Install only essential dependencies.
- Set up routing, global styles, layout, sidebar, top bar, and responsive navigation.
- Create the README with run instructions.

## Phase 2 — Data and Risk Engine
- Create 30–50 synthetic student records.
- Implement attendance and assignment calculations.
- Implement weighted risk scoring and single-signal review flags.
- Implement plain-language explanations and supporting factors.
- Unit-test the calculations with known sample cases.

## Phase 3 — Overview Dashboard
- Build summary cards.
- Build charts.
- Build attention-required list.
- Verify every displayed number against the underlying dataset.

## Phase 4 — Student Directory and Details
- Build the student table/cards.
- Implement search, filters, and sorting.
- Build the student detail view and trend charts.

## Phase 5 — Interventions
- Build intervention recommendations.
- Implement status updates, notes, and follow-up dates.
- Persist changes with localStorage.

## Phase 6 — Reports and Data Management
- Implement CSV export.
- Implement CSV template download.
- Implement CSV import with validation and preview.
- Implement reset-to-demo-data flow.

## Phase 7 — Settings and Final Polish
- Implement configurable thresholds and weights.
- Recalculate all risks after settings changes.
- Add About/responsible-use information.
- Improve empty, loading, error, and success states.
- Check accessibility and mobile responsiveness.

## Phase 8 — Testing and Demo Readiness
- Run the application from a fresh start.
- Test every navigation item and button.
- Test import/export with valid and invalid CSV files.
- Test refresh persistence.
- Test the app on mobile widths.
- Fix console errors and layout issues.
- Prepare a short demo flow for judges.

---

# 18. Demo Flow for Hackathon Judges

Prepare the application so the team can demonstrate this story in 2–3 minutes:

1. Open the Overview dashboard and explain the purpose.
2. Show total students and the low/medium/high risk distribution.
3. Open the High-Risk Students filter.
4. Select one student and show attendance, assignment, and marks trends.
5. Explain exactly why the system flagged the student.
6. Show positive/supporting factors so the system is not purely negative.
7. Create or update a suggested intervention.
8. Open Reports and export the risk report as CSV.
9. Open Data Management and show the CSV template/import workflow.
10. Explain that the current dataset is synthetic and that real data can be imported.

Make the demo reliable. Do not depend on internet access, external APIs, cloud storage, or third-party accounts.

---

# 19. Instructions to Antigravity

Work as a senior full-stack engineer and product designer.

1. First inspect the current workspace and report what is already present.
2. If the workspace is empty, create the project from scratch.
3. Follow this specification as the source of truth.
4. Prioritize a fully working MVP over unnecessary complexity.
5. Do not silently add external platforms, cloud services, paid APIs, or complex backend infrastructure.
6. If you believe an external service is essential, stop and explain the reason and setup burden before implementing it.
7. Keep the application runnable throughout development.
8. Use realistic synthetic data and label it clearly.
9. Do not use static mockups in place of working functionality.
10. Do not claim to use AI/ML unless a real model is implemented and its limitations are explained.
11. After each phase, run the application/build checks and fix errors before continuing.
12. At the end, provide:
    - Features completed.
    - Features not completed.
    - Exact commands to install and run.
    - Project structure.
    - How demo data and localStorage work.
    - How to import a real CSV.
    - Any known limitations.

**Final priority:** Deliver a polished, credible, fully functional hackathon MVP that demonstrates student performance signals, transparent early-warning risk indicators, supporting factors, and actionable interventions — with minimal setup and no unnecessary external dependencies.
