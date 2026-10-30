# Antigravity Build Prompt — Grade A
## Detect Early. Understand Better. Support Smarter.

**Project:** Grade A — Student Performance Early-Warning & Support Platform  
**Build instruction:** Build the application from scratch for a six-hour hackathon.  
**Primary users:** Teachers and academic coordinators  
**Optional user:** Students (student portal is not part of the essential MVP)  

---

# 1. Product Vision

Build **Grade A**, an academic monitoring platform that analyses student attendance, assignment completion, and assessment marks to identify students who may need additional academic support.

The application must do more than assign a Low, Medium, or High label. It must:

1. **Detect** concerning academic patterns early.
2. **Explain** exactly which data points caused a student to be flagged.
3. **Support** teachers with practical, non-punitive interventions and follow-up tracking.

Example warning:

> Student may need academic support. Attendance has declined, two assignments are incomplete, and recent assessment scores show a downward trend.

Possible next steps:
- Have a private, supportive conversation with the student.
- Check pending assignments and identify academic difficulties.
- Offer a remedial session if appropriate.
- Record a follow-up date and monitor progress.

The product must never present a risk indicator as a final judgement of a student's ability. It must not automatically punish, grade, rank, or make admission/promotion decisions about students.

**Tagline:** Detect Early. Understand Better. Support Smarter.

---

# 2. Important Technology and External-Service Decision

The team wants to minimize setup time and avoid unnecessary third-party services. Build a working local-first prototype.

## Required stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| UI styling | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| Backend | Python + FastAPI |
| Data processing | Pandas |
| Risk indicators | Transparent Python rules + statistical trend analysis |
| Local persistence | Browser localStorage for demo state; local files/in-memory processing where appropriate |
| Report export | Browser CSV export and/or local Python PDF library |
| Database | Not required for the MVP |

## External services: do not configure by default

- **Supabase:** Optional only if persistent multi-user/cloud storage becomes essential. Do not configure it for the initial hackathon build.
- **LLM API:** Optional enhancement only. Do not make the app depend on an API key or internet connection.
- **Email provider / Resend:** Not required.
- **Cloud storage / storage bucket:** Not required.
- **Firebase, AWS, Cloudflare, hosted database, paid APIs:** Do not add for the MVP.

### AI explanation fallback

The core analysis must work without a generative AI API.

- Calculate indicators using Python rules and statistical analysis.
- Generate clear explanations and suggested actions using reliable templates based on the actual detected signals.
- If the team later provides an LLM API key and explicitly chooses to enable it, an LLM may improve the wording of explanations and suggestions.
- The LLM must never be the sole authority deciding the student's risk category.
- Do not send real student personal data to an external AI service.
- If no API key is configured, the entire application must continue working normally.

**Antigravity must not silently add external platforms.** If you believe a service is essential, stop and tell the team what it enables, why it is needed, how much setup it requires, and what local alternative exists. Wait for approval before integrating it.

---

# 3. User Roles and MVP Scope

## Primary: Teacher / Academic Coordinator

Teachers can:
- Open the dashboard.
- Load sample data.
- Upload CSV or Excel student data.
- Validate and analyse a class.
- View class-level early-warning indicators.
- Search and filter students.
- Open individual student analysis.
- View why a student was flagged.
- View positive/supporting factors.
- Record interventions and follow-ups.
- Export class or individual reports.

## Optional: Student

A student-facing portal may eventually allow students to view their own performance and improvement recommendations.

**Do not let the optional student portal delay the MVP.** Build the teacher dashboard first. Do not expose one student's data to another student.

## Hackathon demo access

Judges must be able to try the app without creating an account.

Provide:
- **Open Dashboard**
- **Try Demo Data**
- **How It Works**

Use a clear demo mode. Do not build external authentication or email verification for the MVP.

---

# 4. Application Navigation

Create a polished responsive application with these main sections:

1. **Landing Page**
2. **Teacher Dashboard**
3. **Students**
4. **Individual Student Analysis**
5. **Intervention Tracker**
6. **Reports / Export**
7. **Data Import**

A compact Settings / How It Works area may be included for thresholds, methodology, and responsible-use information.

Use a desktop sidebar and a mobile-friendly drawer or compact navigation. Clearly indicate the current page.

---

# 5. Landing Page

Show:

**Grade A**

**Headline:** Identify academic difficulties before they become bigger problems.

Supporting text should explain that Grade A analyses attendance, assignment completion, and marks to help teachers identify students who may benefit from additional support.

Main actions:
- **Open Dashboard**
- **Try Demo Data**
- **How It Works**

Requirements:
- Modern education-technology design.
- Clear explanation of the three pillars: Detect, Explain, Support.
- A short visual preview of the dashboard.
- Demo mode must work immediately without registration.
- Do not overbuild the landing page at the expense of the functional dashboard.

---

# 6. Teacher Dashboard — Main MVP Screen

The dashboard should provide an immediate overview of the selected class.

## 6.1 Summary cards

Include cards such as:

- Total Students
- Students Needing Attention
- Assignment Completion
- Class Performance Trend

Optional additional metrics:
- Average Attendance
- Average Marks
- Students with Improving Performance

All values must be calculated from the currently loaded dataset. Never hard-code example numbers into dashboard cards.

Example demo values may resemble:
- Total Students: 100
- Students Needing Attention: 12
- Assignment Completion: 78%
- Class Performance Trend: Declining

These are illustrative only. The real displayed values must come from the sample/imported records.

## 6.2 Student overview table

Show:

| Student | Attendance | Assignments | Marks Trend | Support Indicator |
|---|---:|---:|---|---|
| Student A | 92% | 95% | Improving | Low |
| Student B | 68% | 55% | Declining | High |
| Student C | 81% | 80% | Stable | Low |

Use actual generated demo records rather than these illustrative rows.

Each row must have a **View Details** action.

## 6.3 Dashboard charts

Include clear, responsive charts for:
- Support-priority distribution (Low / Medium / High).
- Attendance patterns.
- Assignment completion.
- Assessment marks over time.
- Improving vs declining performance.

Use labels, legends, tooltips, and visible values. Charts must be derived from the same data as the cards and student records.

## 6.4 Attention list

Show students who may need support, prioritizing students with multiple concerning indicators. Include the reason and a link to their individual analysis.

---

# 7. Data Import and Demo Data

This is a core MVP feature.

## 7.1 Try Demo Data

Provide a one-click **Try Demo Data** action.

Create a realistic synthetic dataset of approximately 30–100 fictional students. Include varied patterns:
- Strong and stable performance.
- Low attendance.
- Incomplete assignments.
- Declining marks over three tests.
- Multiple warning signals.
- Students whose performance is improving.
- Mixed signals where one metric is weak but others are positive.

Clearly label the dataset **Synthetic Demo Data**. Do not use real student information.

All dashboard metrics, charts, flags, student details, and reports must derive from the same loaded dataset.

## 7.2 Upload Student Data

Allow teachers to upload:
- CSV files.
- Excel `.xlsx` files if practical within the time available.

Use Pandas in the local FastAPI backend to parse and validate the uploaded file.

### Suggested input columns

Support a simple documented format:

- Student ID
- Student Name (optional if the source contains it)
- Class (optional)
- Section (optional)
- Attendance percentage
- Assignment completion percentage
- Test 1 marks
- Test 2 marks
- Test 3 marks

Use consistent internal field names, but accept common variations in column headings where feasible (for example, `Student ID`, `student_id`, `ID`).

### Required import actions

Provide buttons/actions:
- **Upload CSV / Excel**
- **Download Sample Template**
- **Preview Data**
- **Validate Data**
- **Analyse Class**

### Import workflow

1. Teacher selects a file.
2. Backend reads the file.
3. System checks required columns and data types.
4. System validates numeric ranges and missing values.
5. Show a preview of the uploaded records.
6. Clearly list row-level errors and warnings.
7. Teacher can correct the file and retry.
8. Teacher confirms analysis only after reviewing the preview.

Do not silently discard invalid rows. Do not simply reject the entire upload without explaining the problem. Show which row and column need correction.

### Validation rules

- Attendance must be within 0–100.
- Assignment completion must be within 0–100.
- Marks must be within the valid scale used by the uploaded template (use 0–100 for the default template).
- Student IDs should be unique.
- Missing values must be reported.
- Missing data must be labelled **Insufficient Data / Needs Review**, not automatically treated as low risk.
- Do not invent missing marks or attendance values.
- If a column is missing, explain how to fix the file.
- Preserve valid rows in the preview, but require an explicit confirmation before analysing partial data.

Provide a downloadable sample CSV template with example rows.

---

# 8. Analysis Engine — Core Technical Feature

When the teacher clicks **Analyse Class**, process the uploaded or demo dataset in this order:

1. Data validation.
2. Attendance pattern analysis.
3. Assignment completion analysis.
4. Marks trend calculation.
5. Potential support indicators identification.
6. Explanation generation.
7. Suggested intervention generation.
8. Dashboard and individual profile update.

The risk indicators must be calculated from actual data. Do not let generative AI decide the risk category from raw numbers.

## 8.1 Support-priority categories

Use these labels:

- **Low:** No major warning pattern detected in the available data.
- **Medium:** One or more patterns may need teacher review.
- **High:** Multiple concerning indicators are present; teacher review is recommended.
- **Insufficient Data / Needs Review:** There is not enough valid information to make a meaningful assessment.

Use green, amber/yellow, and red visual indicators, but always include text labels. Do not rely on colour alone.

## 8.2 Risk/priority calculation

Implement transparent, configurable rules using:
- Attendance level and recent attendance decline.
- Assignment completion and missing assignments.
- Marks level and recent marks trend.

Suggested starting thresholds for the demo:
- Attendance below 75%: warning signal.
- Assignment completion below 65%: warning signal.
- Marks below 50%: warning signal.
- A consistent downward marks trend across recent assessments: trend warning.
- A recent decline in attendance: trend warning.

These are configurable demo defaults, not universal standards. Put the thresholds in one central configuration so they can be changed easily.

Use a transparent scoring or rule system to determine Low / Medium / High. Document the exact rules in the application and README. Do not invent a scientific accuracy claim.

### Important safeguards

- A single low metric should not automatically be treated as a final judgement of the student.
- Show each contributing signal separately.
- Multiple concerning signals may raise the support priority.
- A strong positive trend should be visible even when another signal is concerning.
- Missing data must never be interpreted as good performance or low risk.
- Allow teachers to review and interpret the indicators.

## 8.3 Trend-based detection

Do not analyse only the latest marks.

Example:
- Test 1: 85
- Test 2: 75
- Test 3: 62

The system should detect a downward trend even if the latest mark is not the lowest in the class.

Also detect:
- Recent attendance decline.
- Assignment completion decline where historical data is available.
- Recent improvement in marks or attendance.

If historical information is not available, state that the trend cannot be calculated rather than inventing a trend.

## 8.4 Explainable alerts

Every flagged student must have:
- Support-priority category.
- Contributing indicators.
- Actual values used.
- Relevant thresholds or trend changes.
- Plain-language explanation.
- Positive/supporting factors, if present.
- Suggested next steps.

Example:

> Support review suggested because attendance fell from 88% to 68%, two assignments remain incomplete, and marks declined across three assessments.

Only generate this type of explanation when the student's data actually supports every part of the statement.

---

# 9. Risk Filters and Student Search

Teacher must be able to click a category and see the matching students.

Filters:
- All Students
- Low Priority
- Medium Priority
- High Priority
- Insufficient Data / Needs Review
- Declining Performance
- Low Assignment Completion
- Attendance Concern
- Improving Performance

Add a search bar supporting Student ID and, if names are available, student name.

Filters must work together and have a **Clear Filters** action. Display the number of matching students.

---

# 10. Individual Student Analysis

Clicking **View Details** opens a dedicated, responsive student detail page or panel.

Organize the page into four main sections.

## A. Performance Trends

Show:
- Attendance over time (if history is available).
- Assignment completion.
- Test marks across assessments.
- Recent improvement or decline.

Use clear charts and also show the underlying numeric values. Do not create fake historical points.

## B. Why Flagged?

Explain in simple language why the student was flagged.

Example:

> Support review suggested because attendance fell from 88% to 68%, two assignments remain incomplete, and marks declined across three assessments.

Show the evidence:
- Current attendance.
- Previous attendance, if available.
- Assignment completion and incomplete count.
- Test scores and direction of change.
- Thresholds/rules that were triggered.

## C. Supporting Factors

The platform must show positive signals too.

Examples:
- Strong assignment performance in earlier weeks.
- Improvement in the latest assessment.
- Improving attendance.
- Consistent participation in a particular subject, if that data is available.

Do not show a positive factor unless the data supports it.

## D. Suggested Next Steps

Examples:
- Arrange a private, supportive check-in.
- Identify difficult topics.
- Create a manageable plan for pending assignments.
- Offer academic counselling or a remedial session if appropriate.
- Set a follow-up date and monitor progress.

Recommendations must be supportive and non-punitive.

---

# 11. Intervention Tracker

This is a key differentiating feature. The product must help teachers act on an alert, not just view it.

Provide actions such as:
- **Schedule Check-in**
- **Offer Remedial Support**
- **Set Follow-up Date**
- **Mark Follow-up Complete**

For each intervention, store:
- Student ID.
- Student name, if available.
- Intervention type.
- Reason for support.
- Date created.
- Follow-up date.
- Status (Planned / In Progress / Completed).
- Teacher notes.

Allow teachers to:
- Create an intervention.
- Update its status.
- Change its follow-up date.
- Add notes.
- View intervention history for a student.
- Filter interventions by status and priority.

Use local persistence for the MVP. Do not send email or SMS notifications.

### Follow-up and progress

When new academic data is imported later, allow the teacher to compare available performance indicators and see whether the student:
- Improved.
- Remained stable.
- Needs further review.

Do not claim that an intervention caused an improvement. Show the before/after data and let the educator interpret it.

---

# 12. What-If Analysis

Implement a simple illustrative scenario tool if the core workflow is complete.

Example prompt:

> What if assignment completion improves and attendance remains stable? How might the current support indicators change?

Requirements:
- Let the teacher adjust hypothetical attendance, assignment completion, and/or marks values.
- Recalculate the rule-based support indicators using the same scoring rules.
- Show current vs hypothetical results side by side.
- Clearly label the result **Illustrative Scenario — Not a Prediction**.
- Do not modify the student's actual record.
- Provide a reset scenario button.
- Do not claim to guarantee future performance.

This feature is lower priority than import, analysis, explanations, and intervention tracking.

---

# 13. Reports and Export

Allow teachers to download:
- Class-level report.
- Individual student report.
- Student support-priority list.
- Intervention/follow-up report.

At minimum, implement CSV export that opens correctly in Excel and Google Sheets.

If time permits, implement PDF report generation locally using a Python PDF library or browser-side PDF generation. Do not use a cloud PDF service.

Reports should include:
- Dataset/class name.
- Generated date.
- Student ID.
- Available performance indicators.
- Support-priority category.
- Explanation and contributing signals.
- Intervention status where relevant.

Do not expose unnecessary personal data. Make reports clear and readable.

---

# 14. Privacy, Fairness, and Responsible Use

This is an education-support tool. Treat student information carefully.

- Use fictional data for the public hackathon demo.
- Do not expose student records publicly.
- Do not send real student personal data to external AI services.
- Do not use risk indicators as automatic punishment, grading, admission, or promotion decisions.
- Make it clear that indicators are prompts for teacher review.
- Show the evidence behind each alert.
- Show positive progress as well as concerns.
- Do not infer student ability, motivation, health, family circumstances, or personal reasons from marks/attendance.
- Do not invent explanations for why a student is absent or underperforming.
- Missing data must be shown as missing/insufficient, not low risk.
- Provide a way to correct or replace imported data.
- Use supportive, non-stigmatizing language.

---

# 15. UI / UX Design Requirements

Build a polished, credible education analytics product suitable for a live hackathon judging session.

## Visual direction

- Modern, clean education technology interface.
- Trustworthy navy/blue primary palette.
- Light background and readable cards.
- Green / amber / red for support-priority indicators.
- Clear typography and visual hierarchy.
- Subtle borders and shadows.
- Consistent spacing, icons, and button styles.
- Avoid clutter, excessive gradients, and unnecessary animations.

## Responsive behaviour

Desktop:
- Sidebar navigation.
- Multi-column metric cards.
- Full student table.
- Charts arranged in a balanced grid.

Tablet:
- Collapsible sidebar.
- Reflowed cards and charts.

Mobile / Android:
- No page-level horizontal overflow.
- Drawer or compact navigation.
- Cards reflow into one or two columns.
- Tables become cards or controlled horizontal scrolling.
- Student detail views remain readable.
- Charts resize properly.
- Buttons and form controls are touch-friendly.

Test widths around 360px, 390px, 768px, 1024px, and desktop.

Add:
- Helpful empty states.
- Upload progress/loading states.
- Validation error messages.
- Success feedback.
- Confirmation dialogs for destructive actions.
- Accessible labels and visible keyboard focus.

---

# 16. Suggested Architecture and Project Structure

Keep the frontend and local backend separate but easy to run.

```text
grade-a/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── charts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── services/
│   │   │   ├── validation.py
│   │   │   ├── analysis.py
│   │   │   ├── explanations.py
│   │   │   └── reports.py
│   │   └── models/
│   └── requirements.txt
├── sample-data/
│   ├── demo_students.csv
│   └── student_template.csv
├── README.md
└── .gitignore
```

You may adjust the structure if there is a good technical reason. Keep code modular and understandable. Do not put the entire application in one giant component or Python file.

## Suggested API endpoints

Use a small local FastAPI API. Suggested endpoints:

- `GET /api/health` — backend health check.
- `GET /api/demo-data` — return synthetic demo data.
- `POST /api/upload/preview` — parse file and return preview plus validation results.
- `POST /api/analyse` — analyse validated student records.
- `POST /api/report/csv` — generate/download a report if server-side export is used.

Keep the API minimal. Do not create unnecessary CRUD infrastructure or authentication for the demo.

The frontend should show a useful error if the backend is not running, including the command needed to start it.

---

# 17. Six-Hour Hackathon Build Plan

Prioritize a complete end-to-end working flow before advanced features and visual polish.

| Time | Task | Priority |
|---|---|---|
| 9:00–9:30 | Project setup and base UI | Essential |
| 9:30–10:15 | Dashboard and synthetic demo data | Essential |
| 10:15–11:00 | CSV upload, preview, and validation | Essential |
| 11:00–12:00 | Risk rules and trend analysis | Essential |
| 12:00–1:00 | Charts and individual student profiles | Essential |
| 1:00–1:45 | Explanations and suggested interventions | Essential |
| 1:45–2:20 | Intervention tracker and report export | Essential |
| 2:20–3:00 | Testing and final demo | Essential |

Treat the times as a suggested sequence, not a reason to leave the core workflow unfinished. If time is running out, finish the essential path before implementing What-If Analysis or optional AI API integration.

---

# 18. Build Priorities

## P0 — Must work for the hackathon MVP

- Landing page and demo access.
- Synthetic demo dataset.
- Teacher dashboard.
- CSV upload.
- Data preview and validation.
- Attendance, assignment, and marks analysis.
- Trend-based detection.
- Low / Medium / High support indicators.
- Insufficient-data handling.
- Explainable alerts.
- Individual student profile.
- Positive/supporting factors.
- Suggested interventions.
- Intervention tracking and follow-up dates.
- CSV report export.
- Responsive desktop and mobile UI.

## P1 — Implement if P0 is stable

- Excel `.xlsx` upload.
- PDF report export.
- What-If Analysis.
- Configurable thresholds.
- More detailed class comparisons.
- Additional historical trend views.

## P2 — Future enhancements, not required now

- Student portal.
- Persistent hosted database.
- Teacher accounts and authentication.
- Cloud deployment and file storage.
- External LLM integration.
- Email/SMS notifications.
- Multi-institution support.

---

# 19. Acceptance Checklist

Do not mark the MVP complete until the following are verified:

- [ ] App starts locally with documented commands.
- [ ] Judges can try demo data without an account.
- [ ] Demo dataset is clearly labelled synthetic.
- [ ] Dashboard metrics are calculated from loaded records.
- [ ] CSV template can be downloaded.
- [ ] CSV upload works.
- [ ] Excel upload works if included.
- [ ] Preview appears before analysis.
- [ ] Invalid/missing values produce row-level messages.
- [ ] Missing data is not automatically classified as low risk.
- [ ] Attendance, assignment, and marks indicators use actual values.
- [ ] Marks decline across assessments is detected.
- [ ] Attendance decline is detected when history exists.
- [ ] Every alert explains its evidence.
- [ ] Positive/supporting factors are displayed when supported.
- [ ] Search by Student ID works.
- [ ] Risk and performance filters work.
- [ ] Individual student details show correct data.
- [ ] Suggested interventions are relevant to detected indicators.
- [ ] Intervention status and follow-up date can be updated.
- [ ] Intervention changes persist during the demo.
- [ ] CSV report export works.
- [ ] What-If results are labelled illustrative and do not alter real data.
- [ ] App is usable on Android/mobile widths.
- [ ] No buttons are merely decorative.
- [ ] No external API key or cloud account is required for the core demo.
- [ ] No false claim of AI/ML prediction or accuracy is displayed.

---

# 20. Hackathon Judge Demo Flow

Prepare a reliable two-to-three-minute demonstration:

1. Open Grade A landing page.
2. Click **Try Demo Data**.
3. Show the teacher dashboard and class overview.
4. Point out students needing attention.
5. Filter to High Priority or Declining Performance.
6. Open one student profile.
7. Explain the actual attendance, assignment, and marks evidence.
8. Show both warning signals and positive/supporting factors.
9. Create an intervention such as **Schedule Check-in**.
10. Set a follow-up date and mark the intervention as planned.
11. Export a class or individual report.
12. Explain that the system uses transparent analysis and synthetic demo data, and can accept real institutional data through the import workflow.

The key story for judges is:

**Data → Detect → Explain → Support → Follow Up**

---

# 21. Final Instructions to Antigravity

Act as a senior full-stack developer and product designer.

1. Inspect the current workspace first.
2. If it is empty, create the project from scratch.
3. Follow this specification as the product source of truth.
4. Build the P0 workflow before P1/P2 features.
5. Use React + Vite, Tailwind CSS, Recharts, FastAPI, and Pandas as the default local stack.
6. Keep the backend local and minimal.
7. Do not add Supabase, Firebase, cloud storage, Resend, email, or any external service by default.
8. Do not require an LLM API key. Use transparent rule-based analysis and template-based explanations as the reliable default.
9. If an external service seems necessary, stop and ask the team before integrating it.
10. Use fictional synthetic data for the demo.
11. Do not hard-code dashboard numbers that contradict the dataset.
12. Do not use static mockups instead of working features.
13. Test each phase before proceeding.
14. Fix runtime errors, console errors, API errors, and responsive layout problems.
15. Keep the code modular and include comments for important analysis logic.
16. Document installation, startup, API endpoints, data format, risk rules, and limitations in README.md.

At completion, provide:
- Features completed and any incomplete features.
- Exact commands to install dependencies and start frontend/backend.
- Required local ports.
- How to load demo data.
- How to prepare and upload CSV/Excel files.
- The risk and trend analysis logic.
- How intervention records persist.
- Any limitations or optional features not implemented.

**Final objective:** Deliver a polished, reliable, local-first Grade A MVP that demonstrates explainable early-warning indicators and an actionable teacher intervention workflow. Minimize setup and maximize the amount of working functionality judges can test.
