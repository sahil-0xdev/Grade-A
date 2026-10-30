import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  ShieldAlert,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  Clock,
  BookOpen
} from 'lucide-react';
import { exportStudentsCSV, exportRiskReportCSV, exportInterventionsCSV } from '../services/csvService';

export default function Reports({
  students = [],
  interventions = [],
  meta
}) {
  const [selectedCohort, setSelectedCohort] = useState('ALL');

  const reportStudents = selectedCohort === 'ALL'
    ? students
    : students.filter(s => s.className === selectedCohort);

  const total = reportStudents.length;
  const highRisk = reportStudents.filter(s => s.riskLevel === 'High').length;
  const medRisk = reportStudents.filter(s => s.riskLevel === 'Medium').length;
  const lowRisk = reportStudents.filter(s => s.riskLevel === 'Low').length;
  const needsReview = reportStudents.filter(s => s.needsReview).length;

  const avgAtt = total > 0
    ? Math.round(reportStudents.reduce((acc, s) => acc + s.attendancePct, 0) / total)
    : 0;
  const avgAsg = total > 0
    ? Math.round(reportStudents.reduce((acc, s) => acc + s.assignmentsPct, 0) / total)
    : 0;
  const avgMrk = total > 0
    ? Math.round(reportStudents.reduce((acc, s) => acc + s.averageMarks, 0) / total)
    : 0;

  const cohorts = Array.from(new Set(students.map(s => s.className).filter(Boolean)));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider font-extrabold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              Audit & Reports Hub
            </span>
            <span className="text-xs text-slate-400 font-medium">RFC-4180 Compliant Exports</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-2">
            Academic Performance & Intervention Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate executive compliance summaries and spreadsheet exports for educators and academic boards
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-end md:self-auto">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Executive Summary</span>
          </button>
        </div>
      </div>

      {/* CSV Exports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Export 1: Students Roster */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-[#F9870D]/10 text-[#F9870D] border border-[#F9870D]/20 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Full Student Roster CSV</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Complete student dataset with calculated attendance %, assignment completion %, average marks %, and current risk tiers.
            </p>
          </div>
          <button
            onClick={() => exportStudentsCSV(students)}
            className="w-full py-2.5 bg-[#F9870D] hover:bg-[#ea7600] text-[#000000] rounded-xl text-xs font-black transition-all shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Download className="w-3.5 h-3.5 text-[#000000]" />
            <span>Download Students CSV ({students.length})</span>
          </button>
        </div>

        {/* Export 2: Risk & Explainability */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Academic Risk & Explainability CSV</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Detailed audit log including concern scores, threshold boundaries crossed, natural language explanations, and supporting strengths.
            </p>
          </div>
          <button
            onClick={() => exportRiskReportCSV(students)}
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Risk Audit CSV</span>
          </button>
        </div>

        {/* Export 3: Interventions */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Interventions Tracking CSV</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Log of all proactive actions, meeting statuses, assigned educators, follow-up target dates, and documented conference notes.
            </p>
          </div>
          <button
            onClick={() => exportInterventionsCSV(interventions)}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Interventions CSV ({interventions.length})</span>
          </button>
        </div>
      </div>

      {/* Cohort Filter Selector */}
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Executive Summary Scope:
        </span>
        <select
          value={selectedCohort}
          onChange={(e) => setSelectedCohort(e.target.value)}
          className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">Entire Active Institution ({students.length} Students)</option>
          {cohorts.map((cls) => (
            <option key={cls} value={cls}>Class: {cls}</option>
          ))}
        </select>
      </div>

      {/* Printable Executive Report Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6 print:border-none print:shadow-none">
        
        {/* Report Header */}
        <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{meta?.institutionName || 'Oakridge Academy'}</h2>
            <p className="text-xs text-slate-500">
              Institutional Academic Health Report • Term: {meta?.academicTerm || 'Fall 2026'}
            </p>
          </div>
          <div className="text-left sm:text-right text-xs text-slate-400">
            <div>Report Generated: {new Date().toLocaleDateString()}</div>
            <div>Prepared by: {meta?.activeUser || 'Academic Coordinator'}</div>
          </div>
        </div>

        {/* Aggregate KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Evaluated</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{total} Students</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Scope: {selectedCohort}</div>
          </div>

          <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-200/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">High Risk Rate</span>
            <div className="text-2xl font-bold text-rose-700 mt-1">
              {highRisk} ({total > 0 ? Math.round((highRisk / total) * 100) : 0}%)
            </div>
            <div className="text-[11px] text-rose-600/80 mt-0.5">Critical academic flags</div>
          </div>

          <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Moderate Risk</span>
            <div className="text-2xl font-bold text-amber-700 mt-1">
              {medRisk} ({total > 0 ? Math.round((medRisk / total) * 100) : 0}%)
            </div>
            <div className="text-[11px] text-amber-600/80 mt-0.5">Approaching thresholds</div>
          </div>

          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">On Target Rate</span>
            <div className="text-2xl font-bold text-emerald-700 mt-1">
              {lowRisk} ({total > 0 ? Math.round((lowRisk / total) * 100) : 0}%)
            </div>
            <div className="text-[11px] text-emerald-600/80 mt-0.5">Low risk / steady</div>
          </div>
        </div>

        {/* Signal Benchmarks */}
        <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 font-bold text-slate-800">
            Diagnostic Signal Summary vs Institutional Target
          </div>
          <div className="divide-y divide-slate-100">
            <div className="p-3 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#F9870D]" />
                Average Attendance Rate
              </span>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Target: ≥ 85%</span>
                <span className={`font-bold ${avgAtt >= 85 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {avgAtt}%
                </span>
              </div>
            </div>

            <div className="p-3 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[#F9870D]" />
                Average Assignment Completion
              </span>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Target: ≥ 85%</span>
                <span className={`font-bold ${avgAsg >= 85 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {avgAsg}%
                </span>
              </div>
            </div>

            <div className="p-3 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#F9870D]" />
                Average Assessment Marks
              </span>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Target: ≥ 70%</span>
                <span className={`font-bold ${avgMrk >= 70 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {avgMrk}%
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
