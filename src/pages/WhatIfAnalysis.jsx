import React, { useState, useMemo } from 'react';
import {
  Sliders,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Clock,
  BookOpen,
  Award,
  Zap,
  Target
} from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';
import { calculateStudentRisk } from '../services/riskService';
import AdminInfoCard from '../components/common/AdminInfoCard';

export default function WhatIfAnalysis({
  students = [],
  thresholds,
  weights,
  onSelectStudentForDetails
}) {
  const [selectedStudentId, setSelectedStudentId] = useState(
    students[0]?.studentId || ''
  );

  const currentStudent = useMemo(() => {
    return students.find(s => s.studentId === selectedStudentId) || students[0];
  }, [students, selectedStudentId]);

  // Hypothetical Values
  const [hypoAttendance, setHypoAttendance] = useState(
    currentStudent ? currentStudent.attendancePct : 75
  );
  const [hypoAssignments, setHypoAssignments] = useState(
    currentStudent ? currentStudent.assignmentsPct : 70
  );
  const [hypoMarks, setHypoMarks] = useState(
    currentStudent ? currentStudent.averageMarks : 65
  );

  // Update hypothetical values when user switches students
  const handleStudentChange = (id) => {
    setSelectedStudentId(id);
    const s = students.find(item => item.studentId === id);
    if (s) {
      setHypoAttendance(s.attendancePct);
      setHypoAssignments(s.assignmentsPct);
      setHypoMarks(s.averageMarks);
    }
  };

  const handleReset = () => {
    if (currentStudent) {
      setHypoAttendance(currentStudent.attendancePct);
      setHypoAssignments(currentStudent.assignmentsPct);
      setHypoMarks(currentStudent.averageMarks);
    }
  };

  // 1-Click Simulation Presets for Admins
  const applyPreset = (type) => {
    if (!currentStudent) return;
    if (type === 'homework') {
      setHypoAssignments(100);
    } else if (type === 'attendance') {
      setHypoAttendance(Math.min(100, currentStudent.attendancePct + 15));
    } else if (type === 'marks') {
      setHypoMarks(Math.min(100, currentStudent.averageMarks + 15));
    } else if (type === 'optimal') {
      setHypoAttendance(92);
      setHypoAssignments(95);
      setHypoMarks(Math.max(75, currentStudent.averageMarks));
    }
  };

  // Compute hypothetical student record in real-time
  const hypotheticalCalculated = useMemo(() => {
    if (!currentStudent) return null;

    const totalCls = currentStudent.totalClasses || 60;
    const totalAsg = currentStudent.totalAssignments || 10;

    const mockStudent = {
      ...currentStudent,
      classesAttended: Math.round((hypoAttendance / 100) * totalCls),
      assignmentsSubmitted: Math.round((hypoAssignments / 100) * totalAsg),
      averageMarks: hypoMarks,
    };

    return calculateStudentRisk(mockStudent, thresholds, weights);
  }, [currentStudent, hypoAttendance, hypoAssignments, hypoMarks, thresholds, weights]);

  if (!currentStudent) {
    return (
      <div className="p-8 text-center text-xs text-slate-500">
        No student records loaded to simulate.
      </div>
    );
  }

  const scoreDiff = hypotheticalCalculated
    ? currentStudent.weightedScore - hypotheticalCalculated.weightedScore
    : 0;

  return (
    <div className="space-y-6 max-w-5xl animate-fade-in-up">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider font-extrabold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
              What-If Simulation Sandbox
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Scenario Trajectory Modeling</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-2">
            Academic Trajectory Simulation
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl leading-relaxed">
            Simulate how targeted academic interventions (e.g. turning in overdue assignments or boosting attendance) alter a student's risk category and early-warning alerts.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="shrink-0 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 border border-slate-300 shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Actual</span>
        </button>
      </div>

      {/* Admin Guidance Card */}
      <AdminInfoCard
        title="Admin Guide: How to Use What-If in Educator Check-Ins"
        badge="Conference Tool"
        variant="indigo"
      >
        <div className="space-y-1.5 text-xs text-indigo-950">
          <p>
            <strong>Parent-Teacher Conferences:</strong> Show guardians the tangible impact of turning in 3 missing assignments. Move the slider to 90% assignment completion to visually demonstrate how the student drops from "High Risk" to "Low Risk".
          </p>
          <p>
            <strong>Student Goal Setting:</strong> Use the 1-click presets below to establish 2-week goals with the student (e.g. +15% attendance recovery).
          </p>
        </div>
      </AdminInfoCard>

      {/* Mandatory Illustrative Disclaimer Banner */}
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 shadow-sm">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="block font-semibold">Illustrative Scenario — Not a Prediction or Guarantee</strong>
          <span className="text-amber-800 text-[11px] leading-relaxed">
            This simulator allows educators to explore "what-if" goal scenarios. It does not alter the student's actual institutional records and does not guarantee future academic performance.
          </span>
        </div>
      </div>

      {/* Student Selector & Quick Presets */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Student to Simulate:
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => handleStudentChange(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 min-w-[280px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {students.map((s) => (
                <option key={s.studentId} value={s.studentId}>
                  {s.name} ({s.studentId}) — {s.className} [{s.riskLevel} Priority • Score: {s.weightedScore}]
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500">Current Assessment:</span>
            <RiskBadge level={currentStudent.riskLevel} size="md" needsReview={currentStudent.needsReview} />
            <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
              Score: {currentStudent.weightedScore}
            </span>
          </div>
        </div>

        {/* 1-Click Quick Presets Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase text-slate-400 mr-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Quick Presets:
          </span>

          <button
            type="button"
            onClick={() => applyPreset('homework')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors"
          >
            + 100% Homework Catch-Up
          </button>

          <button
            type="button"
            onClick={() => applyPreset('attendance')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors"
          >
            + 15% Attendance Boost
          </button>

          <button
            type="button"
            onClick={() => applyPreset('marks')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
          >
            + Remedial Test Prep (+15 Marks)
          </button>

          <button
            type="button"
            onClick={() => applyPreset('optimal')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center gap-1"
          >
            <Target className="w-3.5 h-3.5" />
            <span>Optimal Recovery</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Sliders to Adjust Hypothetical Values */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#F9870D]" />
            <h3 className="text-sm font-bold text-slate-900">Adjust Hypothetical Indicators</h3>
          </div>

          {/* Attendance Slider */}
          <div className="space-y-2 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#F9870D]" />
                Projected Attendance Rate:
              </span>
              <span className="font-bold text-[#F9870D] text-sm">{hypoAttendance}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              value={hypoAttendance}
              onChange={(e) => setHypoAttendance(parseInt(e.target.value, 10))}
              className="w-full accent-[#F9870D] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Current: {currentStudent.attendancePct}%</span>
              <span>Target: ≥85%</span>
            </div>
          </div>

          {/* Assignments Slider */}
          <div className="space-y-2 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#F9870D]" />
                Projected Assignment Completion:
              </span>
              <span className="font-bold text-[#F9870D] text-sm">{hypoAssignments}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={hypoAssignments}
              onChange={(e) => setHypoAssignments(parseInt(e.target.value, 10))}
              className="w-full accent-[#F9870D] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Current: {currentStudent.assignmentsPct}%</span>
              <span>Target: ≥85%</span>
            </div>
          </div>

          {/* Marks Slider */}
          <div className="space-y-2 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#F9870D]" />
                Projected Assessment Marks:
              </span>
              <span className="font-bold text-[#F9870D] text-sm">{hypoMarks}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={hypoMarks}
              onChange={(e) => setHypoMarks(parseInt(e.target.value, 10))}
              className="w-full accent-[#F9870D] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Current: {currentStudent.averageMarks}%</span>
              <span>Passing: ≥70%</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-700 italic bg-[#F9870D]/10 p-3 rounded-xl border border-[#F9870D]/30">
            Tip: Move the sliders to test how much assignment remediation or attendance recovery is needed to move a student from High Priority to Low Priority.
          </div>
        </div>

        {/* Right Column: Projected Outcomes */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Projected Support Outcome
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Real-Time Simulation</span>
            </div>

            {/* Score Comparison Display */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Current State</span>
                <div className="text-3xl font-black text-slate-900 mt-1">{currentStudent.weightedScore}</div>
                <div className="mt-1 flex justify-center">
                  <RiskBadge level={currentStudent.riskLevel} size="sm" needsReview={currentStudent.needsReview} />
                </div>
              </div>

              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200">
                <span className="text-[10px] uppercase font-bold text-blue-700">Projected Outcome</span>
                <div className="text-3xl font-black text-blue-900 mt-1">
                  {hypotheticalCalculated?.weightedScore}
                </div>
                <div className="mt-1 flex justify-center">
                  <RiskBadge
                    level={hypotheticalCalculated?.riskLevel}
                    size="sm"
                    needsReview={hypotheticalCalculated?.needsReview}
                  />
                </div>
              </div>
            </div>

            {/* Trajectory Delta */}
            <div className="mt-4 p-3.5 rounded-xl border flex items-center justify-between text-xs font-semibold bg-slate-50 border-slate-100">
              <span className="text-slate-600">Risk Score Trajectory:</span>
              <span className={`flex items-center gap-1 ${
                scoreDiff > 0 ? 'text-emerald-700 font-bold' : scoreDiff < 0 ? 'text-rose-700 font-bold' : 'text-slate-600'
              }`}>
                {scoreDiff > 0 ? (
                  <>
                    <TrendingDown className="w-4 h-4 text-emerald-600" />
                    <span>Risk Decreased by {scoreDiff} pts (Improvement!)</span>
                  </>
                ) : scoreDiff < 0 ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-rose-600" />
                    <span>Risk Increased by {Math.abs(scoreDiff)} pts</span>
                  </>
                ) : (
                  <span>No Change</span>
                )}
              </span>
            </div>

            {/* Projected Reasons / Flags */}
            <div className="mt-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Projected Flag Status:
              </span>
              {hypotheticalCalculated?.reasons && hypotheticalCalculated.reasons.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {hypotheticalCalculated.reasons.map((r, idx) => (
                    <li key={idx} className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{r.text}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>All simulated indicators clear warning thresholds! Student projected at Low Priority.</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Simulating: <strong>{currentStudent.name}</strong>
            </span>
            <button
              onClick={() => onSelectStudentForDetails(currentStudent)}
              className="text-xs text-[#F9870D] hover:underline font-bold flex items-center gap-1"
            >
              <span>Inspect Actual Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
