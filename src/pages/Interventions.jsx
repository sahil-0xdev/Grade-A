import React, { useState, useMemo } from 'react';
import {
  ClipboardList,
  PlusCircle,
  Filter,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Edit,
  Trash2,
  Download
} from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';
import { exportInterventionsCSV } from '../services/csvService';

export default function Interventions({
  interventions = [],
  students = [],
  onOpenCreateModal,
  onOpenEditModal,
  onUpdateStatus,
  onDeleteIntervention,
  onSelectStudent
}) {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInterventions = useMemo(() => {
    return interventions.filter(item => {
      if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
      if (riskFilter !== 'ALL' && item.riskLevel !== riskFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.studentName?.toLowerCase().includes(q);
        const matchesId = item.studentId?.toLowerCase().includes(q);
        const matchesAction = item.action?.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesAction) return false;
      }
      return true;
    });
  }, [interventions, statusFilter, riskFilter, searchQuery]);

  const countByStatus = {
    all: interventions.length,
    planned: interventions.filter(i => i.status === 'Planned').length,
    inProgress: interventions.filter(i => i.status === 'In Progress').length,
    completed: interventions.filter(i => i.status === 'Completed').length
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* Header and Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-extrabold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                Action Plan Center
              </span>
              <span className="text-xs text-slate-400 font-medium">Local Browser Storage Persistence</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-2">
              Educator Interventions & Follow-Up Tracking
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Coordinate proactive student support meetings, remedial tutoring, and progress checkpoints
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              onClick={() => exportInterventionsCSV(filteredInterventions)}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
              title="Download Interventions CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onOpenCreateModal}
              className="px-4 py-2 bg-[#F9870D] hover:bg-[#ea7600] text-[#000000] text-xs font-black rounded-xl transition-all shadow-sm flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-[#000000]" />
              <span>Log New Intervention</span>
            </button>
          </div>
        </div>

        {/* Status Count Metric Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              statusFilter === 'ALL'
                ? 'border-[#F9870D] bg-[#F9870D]/10 text-slate-900 ring-1 ring-[#F9870D] shadow-sm'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="font-semibold text-slate-500">All Tracked</div>
            <div className="text-xl font-bold text-slate-900 mt-1">{countByStatus.all}</div>
          </button>

          <button
            onClick={() => setStatusFilter('Planned')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              statusFilter === 'Planned'
                ? 'border-slate-600 bg-slate-100 text-slate-900 ring-1 ring-slate-500 shadow-sm'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="font-semibold text-slate-500">Planned</div>
            <div className="text-xl font-bold text-slate-900 mt-1">{countByStatus.planned}</div>
          </button>

          <button
            onClick={() => setStatusFilter('In Progress')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              statusFilter === 'In Progress'
                ? 'border-[#F9870D] bg-[#F9870D]/10 text-slate-900 ring-1 ring-[#F9870D] shadow-sm'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="font-semibold text-[#F9870D]">In Progress</div>
            <div className="text-xl font-bold text-slate-900 mt-1">{countByStatus.inProgress}</div>
          </button>

          <button
            onClick={() => setStatusFilter('Completed')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              statusFilter === 'Completed'
                ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 ring-1 ring-emerald-500 shadow-sm'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="font-semibold text-emerald-600">Completed</div>
            <div className="text-xl font-bold text-slate-900 mt-1">{countByStatus.completed}</div>
          </button>
        </div>

        {/* Search & Risk Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <input
            type="text"
            placeholder="Search interventions by student name, ID, or action..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="w-full sm:w-48 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Support Priorities</option>
            <option value="High">🔴 High Priority</option>
            <option value="Medium">🟡 Medium Priority</option>
            <option value="Low">🟢 Low Priority</option>
          </select>
        </div>
      </div>

      {/* Interventions Cards List */}
      <div className="space-y-3">
        {filteredInterventions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm space-y-3">
            <ClipboardList className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-800">No interventions found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are no recorded intervention plans matching your current filter criteria.
            </p>
            <button
              onClick={onOpenCreateModal}
              className="px-4 py-2 bg-[#F9870D] text-[#000000] font-black rounded-xl text-xs hover:bg-[#ea7600] transition-colors shadow-sm"
            >
              Create New Intervention
            </button>
          </div>
        ) : (
          filteredInterventions.map((item) => {
            const student = students.find(s => s.studentId === item.studentId);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-[#F9870D]/40 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200 space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F9870D]/10 text-[#F9870D] font-black text-xs flex items-center justify-center shrink-0 border border-[#F9870D]/20">
                      {item.studentName?.charAt(0) || 'S'}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          onClick={() => student && onSelectStudent(student)}
                          className="font-bold text-sm text-slate-900 hover:text-[#F9870D] cursor-pointer transition-colors"
                        >
                          {item.studentName}
                        </span>
                        <span className="font-mono text-xs text-slate-400">({item.studentId})</span>
                        {item.className && (
                          <>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-600">{item.className}</span>
                          </>
                        )}
                        <RiskBadge level={item.riskLevel || student?.riskLevel} size="sm" />
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Intervention ID: <strong className="text-slate-600 font-mono">{item.id}</strong> • Created: {item.createdAt}
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown & Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <select
                      value={item.status}
                      onChange={(e) => onUpdateStatus(item.id, e.target.value)}
                      className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none transition-colors ${getStatusBadge(item.status)}`}
                    >
                      <option value="Planned">Planned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <button
                      onClick={() => onOpenEditModal(item)}
                      className="p-2 text-slate-400 hover:text-[#F9870D] rounded-lg hover:bg-slate-100 transition-colors"
                      title="Edit Intervention"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDeleteIntervention(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Delete Intervention"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main Action Block */}
                <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="text-xs font-bold text-slate-900">
                    Action: {item.action}
                  </div>
                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-700">Flag Reason:</strong> {item.reason}
                  </div>
                  {item.notes && (
                    <div className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200/60">
                      Notes: "{item.notes}"
                    </div>
                  )}
                </div>

                {/* Meta details (Assignee & Target Date) */}
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Assigned: <strong className="text-slate-700">{item.assignedTo}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Follow-up Target: <strong className="text-slate-700">{item.targetDate || 'TBD'}</strong>
                    </span>
                  </div>

                  {student && (
                    <button
                      onClick={() => onSelectStudent(student)}
                      className="text-xs text-[#F9870D] hover:underline font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>View Student History</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
