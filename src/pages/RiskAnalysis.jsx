import React, { useState } from 'react';
import {
  ShieldAlert,
  Info,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Layers,
  Award,
  BookOpen,
  Clock,
  Sparkles
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import RiskBadge from '../components/common/RiskBadge';

export default function RiskAnalysis({
  students = [],
  thresholds,
  weights,
  onSelectStudent,
  onNavigateToSettings
}) {
  const [selectedSignalTab, setSelectedSignalTab] = useState('all');

  let highAtt = 0, medAtt = 0, lowAtt = 0;
  let highAsg = 0, medAsg = 0, lowAsg = 0;
  let highMrk = 0, medMrk = 0, lowMrk = 0;

  students.forEach(s => {
    if (s.signals?.attendance?.concern === 'high') highAtt++;
    else if (s.signals?.attendance?.concern === 'medium') medAtt++;
    else lowAtt++;

    if (s.signals?.assignments?.concern === 'high') highAsg++;
    else if (s.signals?.assignments?.concern === 'medium') medAsg++;
    else lowAsg++;

    if (s.signals?.marks?.concern === 'high') highMrk++;
    else if (s.signals?.marks?.concern === 'medium') medMrk++;
    else lowMrk++;
  });

  const signalChartData = [
    {
      signal: 'Attendance',
      'High Concern': highAtt,
      'Medium Concern': medAtt,
      'Low Concern': lowAtt
    },
    {
      signal: 'Assignments',
      'High Concern': highAsg,
      'Medium Concern': medAsg,
      'Low Concern': lowAsg
    },
    {
      signal: 'Assessment Marks',
      'High Concern': highMrk,
      'Medium Concern': medMrk,
      'Low Concern': lowMrk
    }
  ];

  const displayStudents = students.filter(s => {
    if (selectedSignalTab === 'attendance') return s.signals?.attendance?.concern === 'high';
    if (selectedSignalTab === 'assignments') return s.signals?.assignments?.concern === 'high';
    if (selectedSignalTab === 'marks') return s.signals?.marks?.concern === 'high';
    if (selectedSignalTab === 'safeguard') return s.needsReview;
    return s.riskLevel === 'High' || s.needsReview;
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider font-extrabold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              Explainable Rule Engine
            </span>
            <span className="text-xs text-slate-400 font-medium">Transparent & Audit-Ready</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-2">
            Multi-Signal Academic Risk Scoring & Explainability
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Every risk level is deterministically generated from verifiable behavioral signals without black-box opacity. The system explains exactly what triggered each flag.
          </p>
        </div>

        <button
          onClick={onNavigateToSettings}
          className="shrink-0 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Configure Thresholds</span>
        </button>
      </div>

      {/* Model Explainability Framework */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Formula & Weights Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#F9870D]" />
            <h3 className="text-sm font-bold text-slate-900">Weighted Risk Calculation</h3>
          </div>

          <div className="p-3.5 bg-slate-950 text-slate-100 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto shadow-inner">
            Risk Score = (Att Concern × {((weights?.attendance || 40) / 100).toFixed(2)}) +<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Asg Concern × {((weights?.assignments || 30) / 100).toFixed(2)}) +<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Mrk Concern × {((weights?.marks || 30) / 100).toFixed(2)})
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">Attendance Weight</span>
              <span className="font-bold text-[#F9870D]">{weights?.attendance || 40}%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">Assignments Weight</span>
              <span className="font-bold text-[#F9870D]">{weights?.assignments || 30}%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">Assessment Marks Weight</span>
              <span className="font-bold text-[#F9870D]">{weights?.marks || 30}%</span>
            </div>
          </div>

          <div className="p-3.5 bg-[#F9870D]/10 border border-[#F9870D]/30 rounded-xl text-[11px] text-slate-800 leading-relaxed">
            <strong>Risk Classification:</strong>
            <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px]">
              <li>0–29 Score: <strong>Low Priority</strong> (Green)</li>
              <li>30–59 Score: <strong>Medium Priority</strong> (Amber)</li>
              <li>60–100 Score: <strong>High Priority</strong> (Red)</li>
            </ul>
          </div>
        </div>

        {/* Signal Thresholds Reference */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#F9870D]" />
            <h3 className="text-sm font-bold text-slate-900">Current Threshold Matrix</h3>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Signal</th>
                  <th className="p-2.5 text-emerald-700">Low (0)</th>
                  <th className="p-2.5 text-amber-700">Med (50)</th>
                  <th className="p-2.5 text-rose-700">High (100)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                <tr>
                  <td className="p-2.5 font-semibold">Attendance</td>
                  <td className="p-2.5">≥ {thresholds?.attendance?.lowConcernMin || 85}%</td>
                  <td className="p-2.5">75%–84%</td>
                  <td className="p-2.5">&lt; {thresholds?.attendance?.mediumConcernMin || 75}%</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">Assignments</td>
                  <td className="p-2.5">≥ {thresholds?.assignments?.lowConcernMin || 85}%</td>
                  <td className="p-2.5">65%–84%</td>
                  <td className="p-2.5">&lt; {thresholds?.assignments?.mediumConcernMin || 65}%</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">Marks</td>
                  <td className="p-2.5">≥ {thresholds?.marks?.lowConcernMin || 70}%</td>
                  <td className="p-2.5">50%–69%</td>
                  <td className="p-2.5">&lt; {thresholds?.marks?.mediumConcernMin || 50}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Single-Signal Safeguard Note */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Single-Signal Safeguard Active</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              If any single signal drops into the High Concern tier (e.g. attendance &lt; 75%), the student is prominently flagged for educator review even if high scores in other areas keep their weighted score lower.
            </p>
          </div>
        </div>

        {/* Concern Breakdown Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Signal Concern Distribution</h3>
                <p className="text-xs text-slate-500">Student count by concern tier across signals</p>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={signalChartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="signal" stroke="#94a3b8" fontSize={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="High Concern" fill="#ef4444" stackId="a" />
                  <Bar dataKey="Medium Concern" fill="#f59e0b" stackId="a" />
                  <Bar dataKey="Low Concern" fill="#10b981" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-100 text-center">
            Helps coordinators allocate remedial subject tutoring
          </p>
        </div>

      </div>

      {/* Flagged Students & Explainability Explorer */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Flagged Student Explainability Records</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review exact threshold deviations, plain language reasons, and positive factors
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => setSelectedSignalTab('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedSignalTab === 'all'
                  ? 'bg-[#F9870D] text-[#000000]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All High / Safeguard
            </button>
            <button
              onClick={() => setSelectedSignalTab('attendance')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedSignalTab === 'attendance'
                  ? 'bg-[#F9870D] text-[#000000]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Attendance &lt; 75% ({highAtt})
            </button>
            <button
              onClick={() => setSelectedSignalTab('assignments')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedSignalTab === 'assignments'
                  ? 'bg-[#F9870D] text-[#000000]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Assignments &lt; 65% ({highAsg})
            </button>
            <button
              onClick={() => setSelectedSignalTab('marks')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedSignalTab === 'marks'
                  ? 'bg-[#F9870D] text-[#000000]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Marks &lt; 50% ({highMrk})
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {displayStudents.length === 0 ? (
            <div className="p-10 text-center text-xs text-slate-500">
              No students match the selected signal filter criteria.
            </div>
          ) : (
            displayStudents.map((s) => (
              <div
                key={s.studentId}
                onClick={() => onSelectStudent(s)}
                className="p-5 hover:bg-slate-50/80 transition-colors cursor-pointer space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{s.name}</span>
                        <span className="font-mono text-xs text-slate-400">({s.studentId})</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-600">{s.className} - {s.section}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Attendance: <strong className="text-slate-700">{s.attendancePct}%</strong> | Assignments: <strong className="text-slate-700">{s.assignmentsPct}%</strong> | Marks: <strong className="text-slate-700">{s.averageMarks}%</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <RiskBadge level={s.riskLevel} size="md" needsReview={s.needsReview} />
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg">
                      Score: {s.weightedScore}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="bg-rose-50/50 border border-rose-200/60 rounded-xl p-3.5 text-xs text-rose-950">
                    <div className="font-bold text-rose-800 mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Why this student was flagged:</span>
                    </div>
                    <ul className="space-y-1 pl-4 list-disc text-[11px] text-rose-900">
                      {s.reasons?.map((r, idx) => (
                        <li key={idx}>{r.text}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-xl p-3.5 text-xs text-emerald-950">
                    <div className="font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Supporting / Positive Indicators:</span>
                    </div>
                    <ul className="space-y-1 pl-4 list-disc text-[11px] text-emerald-900">
                      {s.supportingFactors?.map((sf, idx) => (
                        <li key={idx}>{sf}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
