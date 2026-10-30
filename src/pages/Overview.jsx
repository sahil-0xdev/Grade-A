import React from 'react';
import {
  Users,
  AlertOctagon,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Award,
  ArrowRight,
  TrendingUp,
  Activity,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import MetricCard from '../components/common/MetricCard';
import RiskBadge from '../components/common/RiskBadge';

export default function Overview({
  students = [],
  onNavigateToRiskFilter,
  onSelectStudent,
  onOpenImportModal,
  isDemo = true
}) {
  const totalStudents = students.length;
  const highRiskStudents = students.filter(s => s.riskLevel === 'High');
  const mediumRiskStudents = students.filter(s => s.riskLevel === 'Medium');
  const lowRiskStudents = students.filter(s => s.riskLevel === 'Low');
  const needsReviewStudents = students.filter(s => s.needsReview);

  const avgAttendance = totalStudents > 0
    ? Math.round(students.reduce((acc, s) => acc + s.attendancePct, 0) / totalStudents)
    : 0;

  const avgAssignments = totalStudents > 0
    ? Math.round(students.reduce((acc, s) => acc + s.assignmentsPct, 0) / totalStudents)
    : 0;

  const avgMarks = totalStudents > 0
    ? Math.round(students.reduce((acc, s) => acc + s.averageMarks, 0) / totalStudents)
    : 0;

  const riskPieData = [
    { name: 'Low Priority', value: lowRiskStudents.length, color: '#10b981' },
    { name: 'Medium Priority', value: mediumRiskStudents.length, color: '#f59e0b' },
    { name: 'High Priority', value: highRiskStudents.length, color: '#ef4444' }
  ];

  const classGroups = {};
  students.forEach(s => {
    const key = s.className || 'General';
    if (!classGroups[key]) {
      classGroups[key] = { name: key, count: 0, totalAtt: 0, totalMarks: 0, highRisk: 0 };
    }
    classGroups[key].count += 1;
    classGroups[key].totalAtt += s.attendancePct;
    classGroups[key].totalMarks += s.averageMarks;
    if (s.riskLevel === 'High') classGroups[key].highRisk += 1;
  });

  const classPerformanceData = Object.values(classGroups).map(g => ({
    name: g.name,
    avgAttendance: Math.round(g.totalAtt / g.count),
    avgMarks: Math.round(g.totalMarks / g.count),
    highRisk: g.highRisk
  }));

  const signalsComparisonData = [
    { name: 'Attendance Rate', current: avgAttendance, benchmark: 85 },
    { name: 'Assignment Completion', current: avgAssignments, benchmark: 85 },
    { name: 'Average Marks', current: avgMarks, benchmark: 70 }
  ];

  const attentionList = [
    ...highRiskStudents,
    ...needsReviewStudents.filter(s => s.riskLevel !== 'High')
  ].slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* Top Banner & Quick Context */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0d0d0f] via-[#1a140f] to-[#0d0d0f] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-[#F9870D]/40">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-extrabold bg-[#F9870D]/20 text-[#F9870D] border border-[#F9870D]/40 px-3 py-1 rounded-full">
                Diagnostic Command Center
              </span>
              {isDemo && (
                <span className="text-[11px] uppercase tracking-wider font-extrabold bg-amber-400/20 text-amber-200 border border-amber-300/30 px-3 py-1 rounded-full">
                  Synthetic Demo Data Active
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Student Performance Early-Warning
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Continuously analyzing attendance discipline, assignment completion, and multi-test score trends to surface proactive, non-punitive support opportunities.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenImportModal}
              className="px-4 py-2.5 bg-[#F9870D] hover:bg-[#ea7600] text-[#000000] font-black text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>Import Real CSV Data</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#000000]" />
            </button>
          </div>
        </div>
      </div>

      {/* 5.1 Summary Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <MetricCard
          title="Total Students"
          value={totalStudents}
          subtext="Enrolled active cohort"
          icon={Users}
          colorScheme="blue"
          onClick={() => onNavigateToRiskFilter('ALL')}
        />

        <MetricCard
          title="High Priority"
          value={highRiskStudents.length}
          subtext={`${totalStudents > 0 ? Math.round((highRiskStudents.length / totalStudents) * 100) : 0}% of cohort`}
          icon={AlertOctagon}
          colorScheme="rose"
          badge="Score 60+"
          onClick={() => onNavigateToRiskFilter('High')}
        />

        <MetricCard
          title="Medium Priority"
          value={mediumRiskStudents.length}
          subtext={`${totalStudents > 0 ? Math.round((mediumRiskStudents.length / totalStudents) * 100) : 0}% of cohort`}
          icon={AlertTriangle}
          colorScheme="amber"
          badge="Score 30-59"
          onClick={() => onNavigateToRiskFilter('Medium')}
        />

        <MetricCard
          title="Low Priority"
          value={lowRiskStudents.length}
          subtext={`${totalStudents > 0 ? Math.round((lowRiskStudents.length / totalStudents) * 100) : 0}% of cohort`}
          icon={ShieldCheck}
          colorScheme="emerald"
          badge="On Track"
          onClick={() => onNavigateToRiskFilter('Low')}
        />

        <MetricCard
          title="Avg Attendance"
          value={`${avgAttendance}%`}
          subtext="Target goal: >=85%"
          icon={Clock}
          colorScheme={avgAttendance >= 85 ? 'emerald' : avgAttendance >= 75 ? 'amber' : 'rose'}
        />

        <MetricCard
          title="Avg Marks"
          value={`${avgMarks}%`}
          subtext="Target goal: >=70%"
          icon={Award}
          colorScheme={avgMarks >= 70 ? 'emerald' : avgMarks >= 50 ? 'amber' : 'rose'}
        />
      </div>

      {/* 5.2 Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Risk Distribution Donut */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Academic Risk Distribution</h3>
                <p className="text-xs text-slate-500">Student cohort proportion by support tier</p>
              </div>
              <Activity className="w-4 h-4 text-slate-400" />
            </div>

            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {riskPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val, name) => [`${val} Students`, name]}
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
            {riskPieData.map((item) => (
              <div key={item.name} className="text-xs">
                <div className="flex items-center justify-center gap-1.5 font-bold text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name.replace(' Priority', '')}</span>
                </div>
                <div className="font-extrabold text-slate-900 mt-1">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Signal Comparison vs Benchmarks */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Signals vs. Institutional Benchmarks</h3>
                <p className="text-xs text-slate-500">Comparing cohort averages against support targets</p>
              </div>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </div>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={signalsComparisonData} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} unit="%" />
                  <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={95} />
                  <Tooltip
                    formatter={(val) => [`${val}%`]}
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="current" name="Cohort Average" fill="#2563eb" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="benchmark" name="Support Threshold" fill="#cbd5e1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic pt-3 border-t border-slate-100 text-center">
            Configurable support targets: Attendance 85%, Assignments 85%, Marks 70%
          </p>
        </div>

        {/* Class / Cohort Performance Comparison */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Cohort Academic Performance</h3>
                <p className="text-xs text-slate-500">Attendance & marks performance by class</p>
              </div>
              <Sparkles className="w-4 h-4 text-slate-400" />
            </div>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classPerformanceData} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} unit="%" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                    formatter={(val, name) => [`${val}%`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="avgAttendance" name="Avg Attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="avgMarks" name="Avg Marks" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic pt-3 border-t border-slate-100 text-center">
            Multi-class distribution allows targeted educator allocation
          </p>
        </div>

      </div>

      {/* 5.3 Attention Required Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Priority Attention Required ({attentionList.length} Students)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Flagged by rule-based weighted risk scoring or severe single-signal threshold triggers
            </p>
          </div>

          <button
            onClick={() => onNavigateToRiskFilter('High')}
            className="text-xs font-bold text-[#F9870D] hover:underline flex items-center gap-1 transition-colors"
          >
            <span>View all in directory</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F9870D]" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {attentionList.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No students are currently flagged for high academic concern.
            </div>
          ) : (
            attentionList.map((student) => (
              <div
                key={student.studentId}
                className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{student.name}</span>
                      <span className="font-mono text-xs text-slate-500 font-medium">({student.studentId})</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-medium text-slate-600">{student.className} (Sec {student.section})</span>
                      <RiskBadge level={student.riskLevel} size="sm" needsReview={student.needsReview} />
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-800 font-semibold">Primary Flag:</strong>{' '}
                      {student.reasons?.[0]?.text || 'Metrics approaching support thresholds'}
                    </p>

                    <p className="text-[11px] text-[#F9870D] font-bold">
                      Suggested Action: {student.recommendedAction}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right text-xs hidden sm:block">
                    <div className="font-bold text-slate-900">Score: {student.weightedScore}/100</div>
                    <div className="text-[11px] text-slate-400">Att: {student.attendancePct}% | Marks: {student.averageMarks}%</div>
                  </div>

                  <button
                    onClick={() => onSelectStudent(student)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-[#F9870D] hover:text-[#000000] text-slate-700 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>Inspect Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
