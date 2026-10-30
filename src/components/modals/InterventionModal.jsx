import React, { useState, useEffect } from 'react';
import { X, Calendar, User, ClipboardList, CheckCircle2 } from 'lucide-react';

export default function InterventionModal({
  isOpen,
  onClose,
  onSave,
  students = [],
  initialData = null
}) {
  const [studentId, setStudentId] = useState('');
  const [action, setAction] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('Planned');
  const [assignedTo, setAssignedTo] = useState('Ms. Vance (Coordinator)');
  const [targetDate, setTargetDate] = useState('');
  const [notes, setNotes] = useState('');

  const quickActions = [
    'Schedule a supportive 1-on-1 check-in',
    'Assign peer tutor for subject fundamentals',
    'Offer assignment catch-up session in study hall',
    'Initiate guardian outreach conference',
    'Establish 2-week daily attendance check-in'
  ];

  useEffect(() => {
    if (initialData) {
      setStudentId(initialData.studentId || '');
      setAction(initialData.action || '');
      setReason(initialData.reason || '');
      setStatus(initialData.status || 'Planned');
      setAssignedTo(initialData.assignedTo || 'Ms. Vance (Coordinator)');
      setTargetDate(initialData.targetDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]);
      setNotes(initialData.notes || '');
    } else {
      setStudentId(students[0]?.studentId || '');
      setAction(quickActions[0]);
      setReason('');
      setStatus('Planned');
      setAssignedTo('Ms. Vance (Coordinator)');
      setTargetDate(new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]);
      setNotes('');
    }
  }, [initialData, isOpen, students]);

  if (!isOpen) return null;

  const selectedStudent = students.find(s => s.studentId === studentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentId || !action) return;

    const interventionObj = {
      id: initialData?.id || `INT-${Date.now().toString().slice(-4)}`,
      studentId,
      studentName: selectedStudent ? selectedStudent.name : 'Unknown Student',
      className: selectedStudent ? `${selectedStudent.className} - ${selectedStudent.section}` : '',
      riskLevel: selectedStudent ? selectedStudent.riskLevel : 'Medium',
      action,
      reason: reason || selectedStudent?.reasons?.[0]?.text || 'Academic early warning flag',
      status,
      assignedTo,
      targetDate,
      notes,
      createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0]
    };

    onSave(interventionObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#F9870D]/10 text-[#F9870D] border border-[#F9870D]/30 rounded-lg">
              <ClipboardList className="w-5 h-5 text-[#F9870D]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {initialData ? 'Update Academic Intervention' : 'Log New Student Intervention'}
              </h3>
              <p className="text-xs text-slate-500">Track actionable academic support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
          {/* Student Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student Target *
            </label>
            <select
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                const s = students.find(st => st.studentId === e.target.value);
                if (s && s.recommendedAction && !initialData) {
                  setAction(s.recommendedAction);
                }
              }}
              disabled={Boolean(initialData?.id)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 disabled:opacity-75"
            >
              {students.map((s) => (
                <option key={s.studentId} value={s.studentId}>
                  {s.name} ({s.studentId}) — {s.className} [{s.riskLevel} Risk]
                </option>
              ))}
            </select>
          </div>

          {/* Quick Action suggestions */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Intervention Action *
            </label>
            <input
              type="text"
              required
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="e.g., Schedule 1-on-1 review session..."
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {quickActions.map((qa, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setAction(qa)}
                  className="text-[10px] bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 px-2 py-1 rounded transition-colors"
                >
                  + {qa}
                </button>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Trigger / Reason
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Attendance fallen below 75% threshold"
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Status & Assigned Staff */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              >
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Follow-up Date
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Assigned Staff */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Assigned Staff / Mentor
            </label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Staff or educator name"
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Progress Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add ongoing meeting logs or follow-up outcomes..."
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-black text-[#000000] bg-[#F9870D] hover:bg-[#ea7600] rounded-lg transition-colors shadow-sm"
            >
              {initialData ? 'Save Changes' : 'Create Intervention'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
