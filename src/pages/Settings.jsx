import React, { useState, useMemo } from 'react';
import {
  Sliders,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Building2,
  ShieldAlert,
  Info,
  Save,
  HelpCircle,
  Activity,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { DEFAULT_THRESHOLDS, DEFAULT_WEIGHTS, calculateAllStudentsRisk } from '../services/riskService';
import AdminInfoCard from '../components/common/AdminInfoCard';

export default function Settings({
  thresholds,
  weights,
  meta,
  students = [],
  onSaveSettings,
  onSaveMeta,
  onResetSettings
}) {
  const [localThresholds, setLocalThresholds] = useState(thresholds || DEFAULT_THRESHOLDS);
  const [localWeights, setLocalWeights] = useState(weights || DEFAULT_WEIGHTS);
  const [localMeta, setLocalMeta] = useState(meta || {});
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Validate weights total
  const weightTotal = (parseInt(localWeights.attendance, 10) || 0) +
                      (parseInt(localWeights.assignments, 10) || 0) +
                      (parseInt(localWeights.marks, 10) || 0);
  const isWeightValid = weightTotal === 100;

  // Real-time recalculation preview for the active cohort
  const liveProjectedResults = useMemo(() => {
    if (!students || students.length === 0) return null;
    const recalculated = calculateAllStudentsRisk(students, localThresholds, localWeights);
    const high = recalculated.filter(s => s.riskLevel === 'High').length;
    const med = recalculated.filter(s => s.riskLevel === 'Medium').length;
    const low = recalculated.filter(s => s.riskLevel === 'Low').length;
    const safeguards = recalculated.filter(s => s.needsReview).length;
    return { high, med, low, safeguards, total: recalculated.length };
  }, [students, localThresholds, localWeights]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!isWeightValid) return;

    onSaveSettings({
      thresholds: localThresholds,
      weights: {
        attendance: parseInt(localWeights.attendance, 10),
        assignments: parseInt(localWeights.assignments, 10),
        marks: parseInt(localWeights.marks, 10),
      }
    });

    onSaveMeta(localMeta);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleRestoreDefaults = () => {
    setLocalThresholds(DEFAULT_THRESHOLDS);
    setLocalWeights(DEFAULT_WEIGHTS);
    onResetSettings();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl animate-fade-in-up">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider font-extrabold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              Admin Configuration & Policy Calibration
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Real-Time Recalculation Engine</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-2">
            System Settings & Academic Thresholds
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Calibrate rule weights, early-warning trigger boundaries, and institutional branding with live impact feedback
          </p>
        </div>

        <button
          onClick={handleRestoreDefaults}
          className="shrink-0 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 border border-slate-300 shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restore Default Thresholds</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-800 animate-fade-in shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Settings saved! All student risk scores and cohort distributions have been recalculated.</span>
        </div>
      )}

      {/* Real-time Live Impact Preview Bar (Shows Admin Exact Effect of Tweaks) */}
      {liveProjectedResults && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 border border-indigo-500/30 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Live Policy Recalculation Preview
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Adjusting the levers below will classify your {liveProjectedResults.total} students as follows:
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-center">
                <span className="text-[10px] uppercase font-bold text-rose-300 block">High Priority</span>
                <span className="text-base font-black text-white">{liveProjectedResults.high}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">Medium Priority</span>
                <span className="text-base font-black text-white">{liveProjectedResults.med}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">Low Priority</span>
                <span className="text-base font-black text-white">{liveProjectedResults.low}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-center">
                <span className="text-[10px] uppercase font-bold text-indigo-300 block">Safeguards Active</span>
                <span className="text-base font-black text-white">{liveProjectedResults.safeguards}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Comment & Guidance Callout */}
      <AdminInfoCard
        title="Admin Guide: How Grade A Scoring Works & Why It Matters"
        badge="Best Practice"
        variant="blue"
      >
        <div className="space-y-2 text-xs">
          <p>
            <strong>Transparent Multi-Factor Scoring:</strong> Rather than an unexplainable machine learning model, Grade A converts three quantifiable behaviors into concern scores (0, 50, or 100), multiplies them by their configured weights, and computes a 0–100 Risk Score.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1 text-[11px]">
            <div className="p-2.5 rounded-xl bg-white/80 border border-blue-200">
              <strong className="text-blue-900 block mb-0.5">Attendance (40% Weight):</strong>
              Chronic absenteeism is the leading leading indicator of disengagement. Missing 2 classes weekly often precedes failing test scores by 4–6 weeks.
            </div>
            <div className="p-2.5 rounded-xl bg-white/80 border border-blue-200">
              <strong className="text-blue-900 block mb-0.5">Assignments (30% Weight):</strong>
              Homework completion reflects day-to-day discipline, syllabus engagement, and early conceptual roadblocks.
            </div>
            <div className="p-2.5 rounded-xl bg-white/80 border border-blue-200">
              <strong className="text-blue-900 block mb-0.5">Assessment Marks (30% Weight):</strong>
              Evaluates test mastery and captures downward trajectories across assessments (e.g. Unit Test 1 → Midterm → Unit Test 2).
            </div>
          </div>
        </div>
      </AdminInfoCard>

      <form onSubmit={handleSave} className="space-y-6">

        {/* Section 1: Signal Weights with Synchronized Sliders */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-[#F9870D]" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Risk Score Weights (Must sum to 100%)</h3>
                <p className="text-xs text-slate-500">Determine relative emphasis on each academic performance signal</p>
              </div>
            </div>

            <div className={`text-xs font-bold px-3 py-1 rounded-full border transition-colors ${
              isWeightValid
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              Total: {weightTotal}% {isWeightValid ? '✓ (Valid)' : '(Must equal exactly 100%)'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-3">
            
            {/* Attendance Weight */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Attendance Weight</span>
                <span className="text-[#F9870D] font-extrabold text-sm">{localWeights.attendance}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={localWeights.attendance}
                onChange={(e) => setLocalWeights({ ...localWeights, attendance: parseInt(e.target.value, 10) })}
                className="w-full accent-[#F9870D]"
              />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Default: <strong>40%</strong>. Captures class presence and unexcused absences.
              </p>
            </div>

            {/* Assignments Weight */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Assignments Weight</span>
                <span className="text-[#F9870D] font-extrabold text-sm">{localWeights.assignments}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={localWeights.assignments}
                onChange={(e) => setLocalWeights({ ...localWeights, assignments: parseInt(e.target.value, 10) })}
                className="w-full accent-[#F9870D]"
              />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Default: <strong>30%</strong>. Evaluates homework submission frequency and backlogs.
              </p>
            </div>

            {/* Marks Weight */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Marks Weight</span>
                <span className="text-[#F9870D] font-extrabold text-sm">{localWeights.marks}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={localWeights.marks}
                onChange={(e) => setLocalWeights({ ...localWeights, marks: parseInt(e.target.value, 10) })}
                className="w-full accent-[#F9870D]"
              />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Default: <strong>30%</strong>. Evaluates test mastery and downward assessment slopes.
              </p>
            </div>

          </div>
        </div>

        {/* Section 2: Concern Threshold Boundaries with Admin Explanations */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-[#F9870D]" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Concern Threshold Boundaries</h3>
              <p className="text-xs text-slate-500">
                Configure when a metric is considered Optimal (0 Concern), Moderate (50 Concern), or Critical (100 Concern)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            
            {/* Attendance Thresholds */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">
                  Attendance (%)
                </span>
                <span className="text-[11px] text-slate-500">Institutional target calibration</span>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Target / Low Concern Min (≥):</span>
                  <span className="text-emerald-700 font-bold">{localThresholds.attendance.lowConcernMin}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={localThresholds.attendance.lowConcernMin}
                  onChange={(e) => setLocalThresholds({
                    ...localThresholds,
                    attendance: { ...localThresholds.attendance, lowConcernMin: parseInt(e.target.value, 10) }
                  })}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Critical / High Concern Cutoff (&lt;):</span>
                  <span className="text-rose-700 font-bold">{localThresholds.attendance.mediumConcernMin}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="85"
                  value={localThresholds.attendance.mediumConcernMin}
                  onChange={(e) => setLocalThresholds({
                    ...localThresholds,
                    attendance: { ...localThresholds.attendance, mediumConcernMin: parseInt(e.target.value, 10) }
                  })}
                  className="w-full accent-rose-600"
                />
              </div>

              <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/80">
                Comment: Students below <strong>{localThresholds.attendance.mediumConcernMin}%</strong> immediately trigger the Single-Signal Safeguard flag.
              </div>
            </div>

            {/* Assignments Thresholds */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">
                  Assignments (%)
                </span>
                <span className="text-[11px] text-slate-500">Submission discipline cutoff</span>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Target / Low Concern Min (≥):</span>
                  <span className="text-emerald-700 font-bold">{localThresholds.assignments.lowConcernMin}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={localThresholds.assignments.lowConcernMin}
                  onChange={(e) => setLocalThresholds({
                    ...localThresholds,
                    assignments: { ...localThresholds.assignments, lowConcernMin: parseInt(e.target.value, 10) }
                  })}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Critical / High Concern Cutoff (&lt;):</span>
                  <span className="text-rose-700 font-bold">{localThresholds.assignments.mediumConcernMin}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="80"
                  value={localThresholds.assignments.mediumConcernMin}
                  onChange={(e) => setLocalThresholds({
                    ...localThresholds,
                    assignments: { ...localThresholds.assignments, mediumConcernMin: parseInt(e.target.value, 10) }
                  })}
                  className="w-full accent-rose-600"
                />
              </div>

              <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/80">
                Comment: Students submitting less than <strong>{localThresholds.assignments.mediumConcernMin}%</strong> of assignments receive 100 Concern Points.
              </div>
            </div>

            {/* Marks Thresholds */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">
                  Assessment Marks (%)
                </span>
                <span className="text-[11px] text-slate-500">Passing & mastery boundaries</span>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Target / Low Concern Min (≥):</span>
                  <span className="text-emerald-700 font-bold">{localThresholds.marks.lowConcernMin}%</span>
                </div>
                <input
                  type="range"
                  min="55"
                  max="90"
                  value={localThresholds.marks.lowConcernMin}
                  onChange={(e) => setLocalThresholds({
                    ...localThresholds,
                    marks: { ...localThresholds.marks, lowConcernMin: parseInt(e.target.value, 10) }
                  })}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Critical / High Concern Cutoff (&lt;):</span>
                  <span className="text-rose-700 font-bold">{localThresholds.marks.mediumConcernMin}%</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="70"
                  value={localThresholds.marks.mediumConcernMin}
                  onChange={(e) => setLocalThresholds({
                    ...localThresholds,
                    marks: { ...localThresholds.marks, mediumConcernMin: parseInt(e.target.value, 10) }
                  })}
                  className="w-full accent-rose-600"
                />
              </div>

              <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/80">
                Comment: Below <strong>{localThresholds.marks.mediumConcernMin}%</strong> indicates failing academic performance requiring remedial tutoring.
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Single-Signal Safeguard Explanation Card */}
        <AdminInfoCard
          title="Admin Policy: Single-Signal Safeguard Mechanism"
          badge="Critical Safeguard"
          variant="amber"
        >
          <div className="space-y-1.5 text-xs">
            <p>
              <strong>The Problem it solves:</strong> A student who has a 95% average in exam scores might suddenly drop to 60% attendance due to illness or personal struggle. In a naive weighted model, high test marks would mask the attendance drop, resulting in a false "Low Risk" label.
            </p>
            <p>
              <strong>Grade A Solution:</strong> If <em>any single metric</em> crosses into the High Concern tier, Grade A automatically activates the <strong>"Needs Review"</strong> safeguard badge. This guarantees educator visibility while preserving mathematically transparent weighted scoring.
            </p>
          </div>
        </AdminInfoCard>

        {/* Section 4: Institutional Branding */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-[#F9870D]" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Institution & Academic Term Customization</h3>
              <p className="text-xs text-slate-500">Customize the headers, print exports, and report banners</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institution Name
              </label>
              <input
                type="text"
                value={localMeta.institutionName || ''}
                onChange={(e) => setLocalMeta({ ...localMeta, institutionName: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Academic Term Label
              </label>
              <input
                type="text"
                value={localMeta.academicTerm || ''}
                onChange={(e) => setLocalMeta({ ...localMeta, academicTerm: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={!isWeightValid}
            className="px-7 py-3 bg-[#F9870D] hover:bg-[#ea7600] text-[#000000] rounded-xl text-xs font-black flex items-center gap-2 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          >
            <Save className="w-4 h-4 text-[#000000]" />
            <span>Save & Apply Recalculation Across Cohort</span>
          </button>
        </div>

      </form>

      {/* Section 5: Responsible AI / Ethics Disclosure */}
      <div className="bg-[#0c0c0e] text-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#000000] border-2 border-[#F9870D] rounded-2xl text-[#F9870D]">
            <HelpCircle className="w-5 h-5 text-[#F9870D]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Ethical Governance & Human-in-the-Loop Protocol
            </h3>
            <p className="text-xs text-slate-400">Guidelines for Institutional Leadership & Academic Boards</p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs leading-relaxed text-slate-300">
          <p>
            <strong>Decision Support, Not Decision Automation:</strong> Grade A is built to connect teachers with students earlier. It must never be used as an automated justification for grade deductions, course failure, or disciplinary exclusion.
          </p>
          <p>
            <strong>Preserving Student Trust:</strong> Risk scores should be treated as internal educator diagnostic prompts. Educators should approach flagged students with supportive curiosity rather than negative labels.
          </p>
          <p>
            <strong>Client-Side Storage Isolation:</strong> All student data and intervention logs remain isolated within the educator's local browser memory and localStorage. No external cloud analytics or third-party servers receive student information.
          </p>
        </div>
      </div>

    </div>
  );
}
