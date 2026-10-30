# Grade A — Student Performance Early-Warning & Support Platform
> **Detect Early. Understand Better. Support Smarter.**

**Grade A** is a local-first academic diagnostic and early-intervention platform designed for educators, academic coordinators, and school administrators. It correlates student attendance rates, assignment completion discipline, and multi-assessment score trajectories to identify students needing proactive academic assistance — with explainable evidence, positive supporting factors, What-If trajectory simulation, Groq-powered AI diagnostic queries, and an actionable intervention tracker.

---

## ⚡ Platform Highlights

- **Zero Third-Party Cloud Platforms:** 100% self-contained. No external database or cloud subscription accounts required.
- **Dual-Mode Resilient Architecture:**
  1. **Frontend Standalone:** Runs independently in the browser using `localStorage` and client-side deterministic scoring.
  2. **Python FastAPI + Pandas Backend:** Minimal local backend in `backend/` providing data parsing, validation, and analytics at `http://localhost:8000`.
- **Explainable, Rule-Based Engine:** Transparent, verifiable weighted scoring (40% Attendance, 30% Assignments, 30% Marks) with single-signal high-concern safeguards.
- **Trend Detection:** Catches downward test score trajectories (e.g. Test 1 $\to$ Test 2 $\to$ Test 3) and attendance velocity drops before terminal exam failure.
- **Supportive & Non-Punitive:** Displays recognized strengths and positive supporting factors alongside warning flags.
- **What-If Scenario Simulation:** Interactive sandbox allowing educators to simulate how assignment remediation or attendance improvements alter support priority indicators.
- **Groq AI Integration:** Real-time conversational analysis powered by Groq's high-speed inference engine (`OpenAI GPT-OSS 120B` / `Llama 3.3 70B`) grounded in active cohort data with zero cloud data storage.
- **Comprehensive Interventions Tracker:** Log check-ins, tutoring sessions, and track statuses (`Planned`, `In Progress`, `Completed`) with target follow-up dates.

---

## 🚀 Quick Start Guide

### 1. Frontend Setup & Run
```powershell
npm install
npm run dev
```
Open **[http://localhost:5174](http://localhost:5174)** in your browser.

### 2. (Optional) Start Python FastAPI Backend
```powershell
pip install -r backend/requirements.txt
python backend/run.py
```
- API Documentation: **[http://localhost:8000/docs](http://localhost:8000/docs)**
- Health Check: **[http://localhost:8000/api/health](http://localhost:8000/api/health)**

> **Note:** The frontend automatically checks for FastAPI on port 8000. If the backend is running, it connects seamlessly; if not, it gracefully operates in full offline/local mode.

---

## 📋 Product Walkthrough

1. **Landing Page:**
   - Review the headline: *"Detect Early. Understand Why. Support Better."*
   - Review the 3 core pillars: **Detect, Understand, Support**.
   - Click **Open Teacher Dashboard** or **Load Sample Cohort**.
2. **Teacher Dashboard (Overview):**
   - Real-time aggregate KPI cards: Total Students, High Support Priority, Moderate Watchlist, On Track, Average Attendance, and Average Marks.
   - Interactive charts: **Risk Distribution Donut** and **Signal vs. Benchmark** comparison.
3. **Priority Attention List:**
   - Prioritized list of students requiring immediate attention.
   - Inspect individual student profile with multi-test score trajectories and root-cause evidence.
4. **Individual Student Analysis:**
   - **Trends:** Multi-test score trajectories and weekly attendance progression.
   - **Why Flagged:** Exact threshold boundaries crossed and downward trend reasons.
   - **Supporting Factors:** Highlight positive student strengths (asset-based guidance).
   - **Actionable Next Steps:** Recommended pedagogic interventions.
5. **What-If Analysis Sandbox:**
   - Move sliders to test hypothetical assignment completion and marks recovery.
   - Live recalculation showing risk score reduction in real time.
6. **Interventions Tracker:**
   - Log an action (e.g. *Schedule Check-in*), set a follow-up date, and track status.
7. **Data Ingestion & Reports:**
   - Drag and drop `sample_students_india.csv` to instantly populate 40 student records.
   - Export audit reports and printable executive summaries.

---

## 📂 Project Structure

```text
Hackthon muit/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI endpoints & CORS configuration
│   │   └── services/
│   │       ├── analysis.py      # Statistical scoring & trend evaluation
│   │       ├── validation.py    # Pandas spreadsheet parsing & schema validation
│   │       └── explanations.py  # Natural-language reason generators
│   ├── requirements.txt         # FastAPI, Pandas, Uvicorn, OpenPyXL
│   └── run.py                   # One-command backend launcher
├── sample-data/
│   ├── demo_students.csv        # Ready-to-import CSV sample dataset
│   └── student_template.csv     # Empty standard template for teachers
├── src/
│   ├── components/
│   │   ├── common/              # ConfirmModal, MetricCard, RiskBadge
│   │   ├── layout/              # Sidebar (with Landing link), Topbar (with FastAPI status)
│   │   └── modals/              # ImportCsvModal, InterventionModal, StudentDetailModal
│   ├── data/
│   │   └── demoStudents.js      # 42 realistic synthetic student records
│   ├── pages/
│   │   ├── DataManagement.jsx   # CSV upload, template download, reset controls
│   │   ├── Interventions.jsx    # Action tracker with status pills & filters
│   │   ├── LandingPage.jsx      # High-impact product landing page
│   │   ├── Overview.jsx         # Executive teacher dashboard & KPI cards
│   │   ├── Reports.jsx          # Audit reports, printable summary, CSV exports
│   │   ├── RiskAnalysis.jsx     # Mathematical explainability & threshold matrix
│   │   ├── Settings.jsx         # Configurable weights, thresholds, branding
│   │   ├── Students.jsx         # Directory with multi-criteria filtering & sorting
│   │   └── WhatIfAnalysis.jsx   # Interactive trajectory scenario simulator
│   ├── services/
│   │   ├── csvService.js        # RFC-4180 parsing, validation, and CSV export
│   │   ├── riskService.js       # Scoring formulas, trends, & safeguards
│   │   └── storageService.js    # Client-side localStorage persistence layer
│   ├── App.jsx                  # Main application orchestrator
│   └── main.jsx                 # React root entry
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🧮 Mathematical Scoring & Safeguard Specification

$$\text{Risk Score} = (\text{Attendance Concern} \times 0.40) + (\text{Assignment Concern} \times 0.30) + (\text{Marks Concern} \times 0.30)$$

- **Attendance:** $\ge 85\%$ Low concern ($0$), $75\%-84\%$ Medium concern ($50$), $<75\%$ High concern ($100$).
- **Assignments:** $\ge 85\%$ Low concern ($0$), $65\%-84\%$ Medium concern ($50$), $<65\%$ High concern ($100$).
- **Marks:** $\ge 70\%$ Low concern ($0$), $50\%-69\%$ Medium concern ($50$), $<50\%$ High concern ($100$).
- **Single-Signal Safeguard:** Any student with a critical metric (e.g. attendance $<75\%$) is flagged for educator review even if other scores keep their weighted score lower.
- **Insufficient Data Handling:** Incomplete records are tagged with **"Insufficient Data / Needs Review"** and never mistakenly treated as low risk.

---

## 🛡️ Responsible Educational Use

Grade A is an assistive diagnostic tool for human educators. It does not automate punitive measures, grading reductions, or promotion decisions.
