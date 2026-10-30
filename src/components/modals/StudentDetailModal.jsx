import React, { useState } from 'react';
import {
  X,
  Mail,
  User,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Award,
  BookOpen,
  Clock,
  PlusCircle,
  HelpCircle,
  Sliders
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import RiskBadge from '../common/RiskBadge';

export default function StudentDetailModal({
  student,
  isOpen,
  onClose,
  onCreateIntervention,
  onUpdateNotes,
  onLaunchWhatIf
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'trends' | 'support'
  const [localNotes, setLocalNotes] = useState(student?.notes || '');
  const [savedNotesMessage, setSavedNotesMessage] = useState(false);

  if (!isOpen || !student) return null;

  const handleSaveNotes = () => {
    if (onUpdateNotes) {
      onUpdateNotes(student.studentId, localNotes);
      setSavedNotesMessage(true);
      setTimeout(() => setSavedNotesMessage(false), 2000);
    }
  };

  const attendanceChartData = student.attendanceHistory || [
    { week: "Week 1", percentage: student.attendancePct },
    { week: "Week 2", percentage: student.attendancePct },
    { week: "Week 3", percentage: student.attendancePct }
  ];

  const assessmentChartData = student.assessmentHistory || [
    { name: "Test 1", marks: student.averageMarks },
    { name: "Test 2", marks: student.averageMarks }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#000000] border-2 border-[#F9870D] text-[#F9870D] font-black text-lg flex items-center justify-center shrink-0 shadow-sm">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
                <RiskBadge
                  level={student.riskLevel}
                  size="md"
                  needsReview={student.needsReview}
                />
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="font-mono font-semibold text-slate-700">{student.studentId}</span>
                <span>•</span>
                <span>Cohort: <strong className="text-slate-700">{student.className}</strong> (Sec {student.section})</span>
                {student.contactEmail && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {student.contactEmail}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onLaunchWhatIf && (
              <button
                onClick={() => {
                  onClose();
                  onLaunchWhatIf(student);
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-200 transition-colors"
                title="Simulate hypothetical outcome scenarios"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Simulate What-If</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-200 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 flex gap-6 text-xs font-semibold text-slate-500 bg-white">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 font-bold transition-colors ${
              activeTab === 'overview'
                ? 'border-[#F9870D] text-[#F9870D]'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            Diagnostic Overview
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`py-3 border-b-2 font-bold transition-colors ${
              activeTab === 'trends'
                ? 'border-[#F9870D] text-[#F9870D]'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            A. Performance Trends
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`py-3 border-b-2 font-bold transition-colors ${
              activeTab === 'support'
                ? 'border-[#F9870D] text-[#F9870D]'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            Intervention & Educator Notes
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {activeTab === 'overview' && (
            <>
              {/* 3 Core Metric Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Attendance */}
                <div className={`p-4 rounded-xl border ${
                  student.signals?.attendance?.concern === 'high'
                    ? 'bg-rose-50/50 border-rose-200'
                    : student.signals?.attendance?.concern === 'medium'
                    ? 'bg-amber-50/50 border-amber-200'
                    : 'bg-emerald-50/50 border-emerald-200'
                }`}>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Attendance Rate</span>
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">
                    {student.attendancePct}%
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {student.classesAttended} of {student.totalClasses} classes attended
                  </div>
                  <div className="mt-2 text-[11px] font-medium">
                    Concern level: <span className="uppercase font-bold">{student.signals?.attendance?.concern || 'LOW'}</span>
                  </div>
                </div>

                {/* Assignments */}
                <div className={`p-4 rounded-xl border ${
                  student.signals?.assignments?.concern === 'high'
                    ? 'bg-rose-50/50 border-rose-200'
                    : student.signals?.assignments?.concern === 'medium'
                    ? 'bg-amber-50/50 border-amber-200'
                    : 'bg-emerald-50/50 border-emerald-200'
                }`}>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Assignment Completion</span>
                    <BookOpen className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">
                    {student.assignmentsPct}%
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {student.assignmentsSubmitted} of {student.totalAssignments} assignments submitted
                  </div>
                  <div className="mt-2 text-[11px] font-medium">
                    Concern level: <span className="uppercase font-bold">{student.signals?.assignments?.concern || 'LOW'}</span>
                  </div>
                </div>

                {/* Marks */}
                <div className={`p-4 rounded-xl border ${
                  student.signals?.marks?.concern === 'high'
                    ? 'bg-rose-50/50 border-rose-200'
                    : student.signals?.marks?.concern === 'medium'
                    ? 'bg-amber-50/50 border-amber-200'
                    : 'bg-emerald-50/50 border-emerald-200'
                }`}>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Average Marks</span>
                    <Award className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">
                    {student.averageMarks}%
                  </div>
                  <div className="mt-1 text-xs text-slate-500 flex items-center gap-1.5">
                    <span>Trend: <strong className="capitalize">{student.marksTrend || 'stable'}</strong></span>
                    {student.marksTrend === 'declining' && <TrendingDown className="w-3.5 h-3.5 text-rose-600" />}
                    {student.marksTrend === 'improving' && <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <div className="mt-2 text-[11px] font-medium">
                    Concern level: <span className="uppercase font-bold">{student.signals?.marks?.concern || 'LOW'}</span>
                  </div>
                </div>
              </div>

              {/* B. Why Flagged? (Explainability) */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    B. Why Was This Student Flagged? ({student.riskLevel} Priority • Score {student.weightedScore}/100)
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Transparent rule-based scoring
                  </span>
                </div>

                {student.needsReview && (
                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-900">
                    <strong>Single-Signal Safeguard Active:</strong> {student.reviewReason}
                  </div>
                )}

                {student.reasons && student.reasons.length > 0 ? (
                  <ul className="space-y-2">
                    {student.reasons.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          r.severity === 'high' ? 'bg-rose-500' : 'bg-amber-500'
                        }`} />
                        <span>{r.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-600">
                    All primary signals (attendance, assignments, and test marks) meet or exceed institutional support standards.
                  </p>
                )}
              </div>

              {/* C. Supporting Factors */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-5 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  C. Supporting & Positive Factors
                </h3>
                <p className="text-xs text-slate-600">
                  Recognizing student strengths alongside support needs provides balanced, non-punitive guidance.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {student.supportingFactors?.map((sf, idx) => (
                    <div key={idx} className="text-xs text-emerald-800 bg-white/80 p-2.5 rounded-lg border border-emerald-200/60 flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{sf}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* D. Suggested Next Steps */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase text-blue-700 tracking-wider">
                    D. Suggested Immediate Next Steps
                  </span>
                  <p className="text-xs font-medium text-slate-800 mt-1">
                    {student.recommendedAction}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onCreateIntervention(student);
                  }}
                  className="shrink-0 px-3.5 py-2 bg-[#F9870D] hover:bg-[#ea7600] text-[#000000] rounded-lg text-xs font-black flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <PlusCircle className="w-4 h-4 text-[#000000]" />
                  Log Actionable Intervention
                </button>
              </div>
            </>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-6">
              {/* Attendance Trend Chart */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Weekly Attendance Progression</h4>
                    <p className="text-xs text-slate-500">Weekly recorded attendance rate (%)</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Support Threshold: 75%
                  </span>
                </div>
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                      <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} unit="%" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                        formatter={(val) => [`${val}%`, 'Attendance']}
                      />
                      <Line
                        type="monotone"
                        dataKey="percentage"
                        stroke="#2563eb"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: '#2563eb' }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Marks Trend Chart */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Assessment Scores Progression</h4>
                    <p className="text-xs text-slate-500">Performance trajectory across assessments</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Passing: 70%+
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      student.marksTrend === 'declining' ? 'bg-rose-100 text-rose-700' : student.marksTrend === 'improving' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {student.marksTrend?.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={assessmentChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                      <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} unit="%" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                        formatter={(val) => [`${val}%`, 'Marks']}
                      />
                      <Line
                        type="monotone"
                        dataKey="marks"
                        stroke={student.marksTrend === 'declining' ? '#ef4444' : '#059669'}
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: student.marksTrend === 'declining' ? '#ef4444' : '#059669' }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Student Educator Notes (Persisted Locally)</h4>
                <p className="text-xs text-slate-500">
                  Record informal observation notes, teacher conference outcomes, or guardian discussions.
                </p>

                <textarea
                  rows={4}
                  value={localNotes}
                  onChange={(e) => setLocalNotes(e.target.value)}
                  placeholder="e.g., Met with student on Oct 28. Incomplete assignments attributed to family transit difficulties. Established 2-week catch-up plan."
                  className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                />

                <div className="flex items-center justify-between">
                  {savedNotesMessage ? (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Notes saved to local storage!
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">Notes stored in client browser storage</span>
                  )}
                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Save Notes
                  </button>
                </div>
              </div>

              {/* Demo Guardian Info */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Demo Contact & Guardian Info
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 mt-2">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Primary Guardian:</span>
                    <span className="font-semibold text-slate-900">{student.guardianName || 'Guardian on file'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Contact Phone:</span>
                    <span className="font-semibold text-slate-900">{student.guardianPhone || '+1 (555) 019-0000'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Last calculation: {new Date(student.lastCalculated || Date.now()).toLocaleDateString()}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
