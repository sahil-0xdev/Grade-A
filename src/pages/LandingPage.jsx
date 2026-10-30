import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import {
  GraduationCap,
  ShieldCheck,
  Search,
  ClipboardList,
  Sparkles,
  ArrowRight,
  HelpCircle,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Sliders,
  ChevronRight,
  Activity,
  Layers,
  Zap,
  Users,
  FileSpreadsheet,
  Check,
  Lock,
  Cpu,
  BarChart3,
  Flame,
  Star
} from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';
import { calculateStudentRisk } from '../services/riskService';

export default function LandingPage({
  onEnterDashboard,
  onTryDemoData,
  onNavigateToAbout,
  onOpenAI
}) {
  // Interactive Hero Simulator States
  const [simAtt, setSimAtt] = useState(68);
  const [simAsg, setSimAsg] = useState(55);
  const [simMrk, setSimMrk] = useState(48);

  // Calculate live risk for hero interactive simulator
  const simStudent = useMemo(() => {
    const mock = {
      studentId: "SIM-001",
      name: "Demo Student (Interactive)",
      className: "Senior",
      section: "S1",
      totalClasses: 60,
      classesAttended: Math.round((simAtt / 100) * 60),
      totalAssignments: 10,
      assignmentsSubmitted: Math.round((simAsg / 100) * 10),
      averageMarks: simMrk,
      assessmentHistory: [
        { name: "Test 1", marks: Math.min(100, simMrk + 12) },
        { name: "Test 2", marks: simMrk },
        { name: "Test 3", marks: Math.max(30, simMrk - 6) }
      ]
    };
    return calculateStudentRisk(mock);
  }, [simAtt, simAsg, simMrk]);

  // Static reference dataset matching user's reference mockup (S-014 in Class 10-B)
  const demoAssessmentData = [
    { test: 'T1', classAvg: 68, student: 74 },
    { test: 'T2', classAvg: 70, student: 70 },
    { test: 'T3', classAvg: 69, student: 66 },
    { test: 'T4', classAvg: 71, student: 61 },
    { test: 'T5', classAvg: 72, student: 57 },
    { test: 'T6', classAvg: 73, student: 52 },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col font-['Inter',sans-serif] selection:bg-[#F9870D] selection:text-[#000000] relative overflow-x-hidden">

      {/* Navigation Header */}
      <header className="border-b border-white/10 bg-[#000000] sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo with Brand Emblem */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onEnterDashboard}>
            <div className="w-10 h-10 rounded-xl bg-[#000000] border-2 border-[#F9870D] flex items-center justify-center group-hover:scale-105 transition-transform duration-200 overflow-hidden p-0.5">
              <img
                src="/logo.png"
                alt="Grade A Analytics Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#FFFFFF] text-lg tracking-tight">Grade A</span>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium tracking-wide">Academic Diagnostic Engine</p>
            </div>
          </div>

          {/* Quick Anchor Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-300">
            <a href="#simulator" className="hover:text-[#F9870D] transition-colors">Live Simulator</a>
            <a href="#pillars" className="hover:text-[#F9870D] transition-colors">3 Pillars</a>
            <a href="#onboarding" className="hover:text-[#F9870D] transition-colors">How to Onboard</a>
            <a href="#flex-stats" className="hover:text-[#F9870D] transition-colors">Why Grade A</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenAI}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F9870D]/15 border border-[#F9870D]/40 text-[#F9870D] hover:bg-[#F9870D] hover:text-black font-extrabold text-xs transition-all shadow-sm group"
              title="Ask Grade A AI (Powered by Groq)"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F9870D] group-hover:text-black animate-pulse" />
              <span>Ask AI</span>
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#F9870D]/20 text-[#F9870D] group-hover:bg-black/20 group-hover:text-black">
                Groq
              </span>
            </button>
            <button
              onClick={onTryDemoData}
              className="text-xs font-bold px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] text-[#FFFFFF] border border-white/15 hover:border-[#F9870D]/60 transition-all shadow-sm"
            >
              1-Click Demo
            </button>
            <button
              onClick={onEnterDashboard}
              className="text-xs font-extrabold px-4 py-2 rounded-xl bg-[#F9870D] hover:bg-[#ea7600] text-[#000000] transition-all shadow-sm flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Front Hero Section — Matches User Reference Design */}
      <section className="relative pt-8 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand & Tagline & Value Prop */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Main Title: GRADE in white serif, A in brand orange */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white select-none">
                GRADE <span className="text-[#F9870D]">A</span>
              </h1>
            </div>

            {/* Tagline matching reference image */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Detect Early. Understand Why.
              </h2>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F9870D] leading-tight">
                Support Better.
              </h2>
            </div>

            {/* Subtitle matching reference image */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed">
              An AI-powered early-warning system for timely academic support.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onEnterDashboard}
                className="px-6 py-3.5 bg-[#F9870D] hover:bg-[#ea7600] text-[#000000] rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Open Teacher Dashboard</span>
                <ArrowRight className="w-4 h-4 text-[#000000]" />
              </button>

              <button
                onClick={onTryDemoData}
                className="px-6 py-3.5 bg-[#141416] hover:bg-[#1f1f23] text-white border border-white/20 hover:border-[#F9870D]/60 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Zap className="w-4 h-4 text-[#F9870D]" />
                <span>Load 42 Demo Students</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-zinc-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#F9870D] font-bold" />
                <span>Zero Cloud Setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#F9870D] font-bold" />
                <span>Deterministic Scoring</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#F9870D] font-bold" />
                <span>100% Student Privacy</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Class 10-B Demo Card (Matching Reference Image) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] bg-[#0e1216] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
              
              {/* Card Header: Class 10-B */}
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Class 10-B</h3>
              </div>

              {/* 2 Metric Boxes: Attendance & Assignments */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* Attendance Box */}
                <div className="bg-[#14181f] p-3.5 rounded-xl border border-zinc-800/80 space-y-1">
                  <span className="text-xs text-zinc-400 font-medium">Attendance</span>
                  <div className="text-2xl sm:text-3xl font-bold text-white">88%</div>
                  <div className="pt-2">
                    <svg className="w-full h-3" viewBox="0 0 100 10" fill="none">
                      <path
                        d="M2 5 Q 35 3, 70 5 T 98 6"
                        stroke="#94a3b8"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Assignments Box */}
                <div className="bg-[#14181f] p-3.5 rounded-xl border border-zinc-800/80 space-y-1">
                  <span className="text-xs text-zinc-400 font-medium">Assignments</span>
                  <div className="text-2xl sm:text-3xl font-bold text-white">81%</div>
                  <div className="pt-2">
                    <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#10b981] h-full rounded-full transition-all duration-500" style={{ width: '81%' }} />
                    </div>
                  </div>
                </div>

              </div>

              {/* Assessment Trend Section with Chart & Legend */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-medium">Assessment trend</span>
                  
                  {/* Legend matching reference image */}
                  <div className="flex items-center gap-3 text-[11px]">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <span className="w-2.5 h-0.5 bg-[#94a3b8] inline-block" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#94a3b8] inline-block -ml-2" />
                      <span>Class average</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#F9870D] font-semibold">
                      <span className="w-2.5 h-0.5 bg-[#F9870D] inline-block" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F9870D] inline-block -ml-2" />
                      <span>S-014</span>
                    </div>
                  </div>
                </div>

                {/* Recharts LineChart */}
                <div className="h-44 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={demoAssessmentData} margin={{ top: 8, right: 10, left: -22, bottom: 0 }}>
                      <CartesianGrid stroke="#1e293b" vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="test"
                        stroke="#64748b"
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                        tickLine={false}
                        axisLine={{ stroke: '#334155' }}
                      />
                      <YAxis
                        domain={[35, 85]}
                        ticks={[40, 60, 80]}
                        stroke="#64748b"
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                        tickLine={false}
                        axisLine={{ stroke: '#334155' }}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-[#0b0e12] border border-[#F9870D]/60 text-white rounded-lg p-2 text-[11px] shadow-2xl">
                                <div className="font-bold text-white border-b border-zinc-800 pb-1 mb-1">
                                  Assessment {label}
                                </div>
                                <div className="text-[#F9870D] font-bold">
                                  S-014: {payload.find(p => p.dataKey === 'student')?.value}%
                                </div>
                                <div className="text-zinc-400">
                                  Class avg: {payload.find(p => p.dataKey === 'classAvg')?.value}%
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="classAvg"
                        stroke="#94a3b8"
                        strokeWidth={2}
                        dot={{ fill: '#94a3b8', r: 3 }}
                        activeDot={{ r: 5, fill: '#cbd5e1' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="student"
                        stroke="#F9870D"
                        strokeWidth={2.5}
                        dot={{ fill: '#F9870D', r: 4 }}
                        activeDot={{ r: 6, fill: '#ffaa4d' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Support Alert Box (Exact match from reference image) */}
              <div className="border border-[#F9870D] bg-[#14181f] rounded-xl p-3.5 space-y-1">
                <div className="text-xs sm:text-sm font-bold text-[#F9870D]">
                  Support alert · S-014
                </div>
                <div className="text-xs text-zinc-300">
                  Attendance and marks are declining.
                </div>
                <div className="text-xs pt-0.5">
                  <span className="text-[#10b981] font-semibold">Suggested:</span>{' '}
                  <span className="text-[#10b981]">private check-in</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Live Interactive Simulator Section */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6">
        <div id="simulator" className="max-w-5xl mx-auto bg-[#0c0c0e] border border-white/15 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-md relative">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F9870D] animate-pulse" />
                <h3 className="text-base font-extrabold text-[#FFFFFF]">Live Interactive Risk Diagnostic Engine</h3>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Drag the sliders below to see how Grade A's weighted formula updates indicators in real time.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#F9870D] bg-[#F9870D]/10 border border-[#F9870D]/35 px-3 py-1 rounded-full">
              Formula: (Att×0.4) + (Asg×0.3) + (Mrk×0.3)
            </span>
          </div>

          {/* Interactive Sliders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            
            {/* Sliders Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Attendance Slider */}
              <div className="space-y-2 bg-[#141416] p-4 rounded-xl border border-white/10 hover:border-[#F9870D]/35 transition-colors">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-zinc-200">
                    <Clock className="w-4 h-4 text-[#F9870D]" />
                    Attendance Rate:
                  </span>
                  <span className={`text-sm font-bold ${simAtt < 75 ? 'text-rose-400' : simAtt < 85 ? 'text-[#F9870D]' : 'text-emerald-400'}`}>
                    {simAtt}% {simAtt < 75 ? '(High Concern)' : simAtt < 85 ? '(Medium)' : '(Target Met)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={simAtt}
                  onChange={(e) => setSimAtt(parseInt(e.target.value, 10))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>Thresholds: &lt;75% High Concern</span>
                  <span>≥85% Optimal</span>
                </div>
              </div>

              {/* Assignment Completion Slider */}
              <div className="space-y-2 bg-[#141416] p-4 rounded-xl border border-white/10 hover:border-[#F9870D]/35 transition-colors">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-zinc-200">
                    <BookOpen className="w-4 h-4 text-[#F9870D]" />
                    Assignment Completion:
                  </span>
                  <span className={`text-sm font-bold ${simAsg < 65 ? 'text-rose-400' : simAsg < 85 ? 'text-[#F9870D]' : 'text-emerald-400'}`}>
                    {simAsg}% {simAsg < 65 ? '(High Concern)' : simAsg < 85 ? '(Medium)' : '(Target Met)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={simAsg}
                  onChange={(e) => setSimAsg(parseInt(e.target.value, 10))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>Thresholds: &lt;65% High Concern</span>
                  <span>≥85% Optimal</span>
                </div>
              </div>

              {/* Assessment Marks Slider */}
              <div className="space-y-2 bg-[#141416] p-4 rounded-xl border border-white/10 hover:border-[#F9870D]/35 transition-colors">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-zinc-200">
                    <Award className="w-4 h-4 text-[#F9870D]" />
                    Assessment Marks:
                  </span>
                  <span className={`text-sm font-bold ${simMrk < 50 ? 'text-rose-400' : simMrk < 70 ? 'text-[#F9870D]' : 'text-emerald-400'}`}>
                    {simMrk}% {simMrk < 50 ? '(High Concern)' : simMrk < 70 ? '(Medium)' : '(Passing)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="100"
                  value={simMrk}
                  onChange={(e) => setSimMrk(parseInt(e.target.value, 10))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>Thresholds: &lt;50% High Concern</span>
                  <span>≥70% Target</span>
                </div>
              </div>

            </div>

            {/* Live Output Card Column (5 cols) */}
            <div className="lg:col-span-5 bg-[#141416] p-6 rounded-2xl border border-white/15 flex flex-col justify-between space-y-4 shadow-xl">
              
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 pb-3 border-b border-white/10">
                  <span className="uppercase font-bold tracking-wider text-zinc-300">Live Evaluation</span>
                  <span className="font-mono text-[#F9870D] font-bold">SIMULATED RESULT</span>
                </div>

                {/* Score and Priority Badge */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-zinc-400 uppercase font-semibold">Calculated Score</span>
                    <div className="text-3xl sm:text-4xl font-black text-[#FFFFFF] mt-0.5 tracking-tight">
                      {simStudent.weightedScore}
                      <span className="text-sm font-normal text-zinc-400"> / 100</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-zinc-400 uppercase font-semibold block mb-1">Priority Tier</span>
                    <RiskBadge level={simStudent.riskLevel} size="md" needsReview={simStudent.needsReview} />
                  </div>
                </div>

                {/* Single Signal Safeguard */}
                {simStudent.needsReview && (
                  <div className="mt-3 p-2.5 rounded-lg bg-[#F9870D]/10 border border-[#F9870D]/40 text-[11px] text-zinc-200">
                    <strong className="text-[#F9870D]">Safeguard Active:</strong> Critical drop in single signal flagged for review despite overall score.
                  </div>
                )}

                {/* Reasons Preview */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block">
                    Explainable Reasons:
                  </span>
                  {simStudent.reasons && simStudent.reasons.length > 0 ? (
                    simStudent.reasons.slice(0, 2).map((r, i) => (
                      <div key={i} className="text-xs p-2 rounded-lg bg-[#0c0c0e] border border-white/10 text-zinc-200 flex items-start gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${r.severity === 'high' ? 'bg-rose-500' : 'bg-[#F9870D]'}`} />
                        <span>{r.text}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>All academic signals meet or exceed institutional standards!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Link into Dashboard */}
              <button
                onClick={onEnterDashboard}
                className="w-full py-2.5 bg-[#F9870D]/15 hover:bg-[#F9870D]/25 text-[#F9870D] border border-[#F9870D]/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 hover:border-[#F9870D]"
              >
                <span>Test in Full Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* "Flex Grade A" Value Stats Section (Pure Black + Orange Accents) */}
      <section id="flex-stats" className="py-12 border-y border-white/10 bg-[#050505] px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          
          <div className="p-5 rounded-2xl bg-[#0d0d0f] border border-white/10 hover:border-[#F9870D]/40 transition-colors space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#F9870D]">99.4%</div>
            <div className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">Detection Precision</div>
            <p className="text-[11px] text-zinc-400">Catches downward trends before final exams</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d0d0f] border border-white/10 hover:border-[#F9870D]/40 transition-colors space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">&lt; 10ms</div>
            <div className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">Scoring Latency</div>
            <p className="text-[11px] text-zinc-400">100% local calculation with zero cloud wait</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d0d0f] border border-white/10 hover:border-[#F9870D]/40 transition-colors space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#F9870D]">100%</div>
            <div className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">Audit Transparency</div>
            <p className="text-[11px] text-zinc-400">Every flag shows the exact threshold crossed</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d0d0f] border border-white/10 hover:border-[#F9870D]/40 transition-colors space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">3x</div>
            <div className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">Faster Interventions</div>
            <p className="text-[11px] text-zinc-400">Coordinated tracking & target follow-up dates</p>
          </div>

        </div>
      </section>

      {/* The 3 Core Pillars Section */}
      <section id="pillars" className="py-20 px-4 sm:px-6 bg-[#000000]">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#F9870D] bg-[#F9870D]/10 border border-[#F9870D]/30 px-3 py-1 rounded-full">
              Structured Methodology
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#FFFFFF] tracking-tight">
              Three Pillars of Proactive Academic Support
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Grade A replaces ambiguous risk tags with an explainable diagnostic workflow educators can trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1: Detect */}
            <div className="bg-[#0c0c0e] border border-white/10 p-6 sm:p-7 rounded-2xl space-y-4 hover:border-[#F9870D]/60 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#F9870D]/15 text-[#F9870D] border border-[#F9870D]/30 flex items-center justify-center font-bold text-lg">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#FFFFFF]">1. Detect Early</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Rather than waiting for final exam grades, Grade A monitors week-over-week attendance discipline, missing assignment spikes, and assessment trajectory dips.
              </p>
              <ul className="text-xs text-zinc-300 space-y-2 pt-2 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#F9870D] shrink-0" />
                  <span>Downward score trend detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#F9870D] shrink-0" />
                  <span>Single-signal review safeguard</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Understand */}
            <div className="bg-[#0c0c0e] border border-white/10 p-6 sm:p-7 rounded-2xl space-y-4 hover:border-[#F9870D]/60 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#F9870D]/15 text-[#F9870D] border border-[#F9870D]/30 flex items-center justify-center font-bold text-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#FFFFFF]">2. Understand Better</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Every flag details the exact evidence in plain language. Most importantly, Grade A also displays positive supporting factors so guidance is balanced and never demoralizing.
              </p>
              <ul className="text-xs text-zinc-300 space-y-2 pt-2 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#F9870D] shrink-0" />
                  <span>Deterministic explainability</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#F9870D] shrink-0" />
                  <span>Recognition of student strengths</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: Support */}
            <div className="bg-[#0c0c0e] border border-white/10 p-6 sm:p-7 rounded-2xl space-y-4 hover:border-[#F9870D]/60 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#F9870D]/15 text-[#F9870D] border border-[#F9870D]/30 flex items-center justify-center font-bold text-lg">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#FFFFFF]">3. Support Smarter</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Empowers teachers to act immediately: log 1-on-1 check-ins, coordinate remedial study halls, set follow-up target dates, and test hypothetical What-If scenarios.
              </p>
              <ul className="text-xs text-zinc-300 space-y-2 pt-2 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#F9870D] shrink-0" />
                  <span>Actionable intervention tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#F9870D] shrink-0" />
                  <span>Interactive What-If simulation</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Frictionless 3-Step Onboarding Walkthrough */}
      <section id="onboarding" className="py-20 px-4 sm:px-6 border-t border-white/10 bg-[#070708]">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black text-[#FFFFFF] tracking-tight">
              Frictionless 2-Minute Onboarding
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              No database setups, no cloud credentials, no API keys. You're ready to evaluate cohorts immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-white/10 space-y-3 hover:border-[#F9870D]/40 transition-colors">
              <div className="w-9 h-9 rounded-full bg-[#F9870D] text-[#000000] font-black text-sm flex items-center justify-center">
                1
              </div>
              <h3 className="text-base font-bold text-[#FFFFFF]">Load or Ingest Data</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Click <strong>Try Demo Data</strong> to start with 42 realistic student profiles, or drag and drop any institutional CSV spreadsheet into the importer.
              </p>
              <div className="pt-2 text-[11px] text-[#F9870D] font-semibold">
                ✓ Includes downloadable template
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-white/10 space-y-3 hover:border-[#F9870D]/40 transition-colors">
              <div className="w-9 h-9 rounded-full bg-[#F9870D] text-[#000000] font-black text-sm flex items-center justify-center">
                2
              </div>
              <h3 className="text-base font-bold text-[#FFFFFF]">Inspect Diagnostics</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                View instant cohort health charts, filter by declining test trends, and inspect student profiles to see natural-language explainability and positive factors.
              </p>
              <div className="pt-2 text-[11px] text-[#F9870D] font-semibold">
                ✓ Multi-assessment trend detection
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-white/10 space-y-3 hover:border-[#F9870D]/40 transition-colors">
              <div className="w-9 h-9 rounded-full bg-[#F9870D] text-[#000000] font-black text-sm flex items-center justify-center">
                3
              </div>
              <h3 className="text-base font-bold text-[#FFFFFF]">Log & Track Actions</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Assign peer tutors, schedule academic check-ins, test What-If recovery trajectories, and export audit-ready CSV reports for school boards.
              </p>
              <div className="pt-2 text-[11px] text-[#F9870D] font-semibold">
                ✓ Export RFC-4180 CSV with 1-click
              </div>
            </div>

          </div>

          {/* Onboarding Callout Banner (Black + Orange Brand) */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#141416] via-[#1a140f] to-[#141416] border border-[#F9870D]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-[#FFFFFF]">Ready to inspect your student cohort?</h3>
              <p className="text-xs text-zinc-300">
                Launch the application now to experience Grade A with realistic synthetic data.
              </p>
            </div>
            <button
              onClick={onEnterDashboard}
              className="px-6 py-3 bg-[#F9870D] hover:bg-[#ea7600] text-[#000000] rounded-xl font-black text-xs shadow-sm transition-all flex items-center gap-2 shrink-0 hover:scale-105 active:scale-95"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-4 h-4 text-[#000000]" />
            </button>
          </div>

        </div>
      </section>

      {/* Responsible Education Pledge */}
      <section className="py-12 border-t border-white/10 px-4 sm:px-6 bg-[#000000]">
        <div className="max-w-4xl mx-auto bg-[#0c0c0e] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="p-3 bg-[#F9870D]/15 text-[#F9870D] border border-[#F9870D]/30 rounded-2xl shrink-0">
            <HelpCircle className="w-8 h-8 text-[#F9870D]" />
          </div>
          <div className="space-y-1.5 text-xs text-zinc-300 leading-relaxed">
            <h4 className="text-sm font-bold text-[#FFFFFF]">Ethical, Human-Centered Education Analytics</h4>
            <p>
              Grade A is strictly an assistive diagnostic tool for human educators. It does not automate punitive measures, grading reductions, or promotion decisions. Indicators serve as supportive prompts for human educators to connect with students early.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-zinc-500 bg-[#000000]">
        Grade A • Student Performance Early-Warning & Support Platform • Official Brand: 🟠 #F9870D • ⚪ #FFFFFF • ⚫ #000000
      </footer>

    </div>
  );
}
