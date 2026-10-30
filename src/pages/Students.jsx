import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  RotateCcw,
  Eye,
  PlusCircle,
  Sliders,
  Download,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';
import { exportStudentsCSV } from '../services/csvService';

export default function Students({
  students = [],
  onSelectStudent,
  onCreateIntervention,
  onOpenWhatIf,
  initialRiskFilter = 'ALL',
  searchTerm = '',
  setSearchTerm
}) {
  const [riskFilter, setRiskFilter] = useState(initialRiskFilter);
  const [classFilter, setClassFilter] = useState('ALL');
  const [trendFilter, setTrendFilter] = useState('ALL'); // 'ALL' | 'declining' | 'improving' | 'stable'
  const [attRange, setAttRange] = useState('ALL');
  const [asgRange, setAsgRange] = useState('ALL');
  const [mrkRange, setMrkRange] = useState('ALL');
  const [sortField, setSortField] = useState('weightedScore');
  const [sortOrder, setSortOrder] = useState('desc');

  // Extract unique classes
  const classes = useMemo(() => {
    return Array.from(new Set(students.map(s => s.className).filter(Boolean)));
  }, [students]);

  // Filtering & Sorting pipeline
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = student.name.toLowerCase().includes(term);
        const matchesId = student.studentId.toLowerCase().includes(term);
        if (!matchesName && !matchesId) return false;
      }

      // Risk / Priority filter
      if (riskFilter !== 'ALL') {
        if (riskFilter === 'NEEDS_REVIEW') {
          if (!student.needsReview && student.riskLevel !== 'Insufficient Data') return false;
        } else if (riskFilter === 'INSUFFICIENT') {
          if (student.riskLevel !== 'Insufficient Data') return false;
        } else if (riskFilter === 'DECLINING_PERF') {
          if (student.marksTrend !== 'declining' && student.attTrend !== 'declining') return false;
        } else if (riskFilter === 'IMPROVING_PERF') {
          if (student.marksTrend !== 'improving' && student.attTrend !== 'improving') return false;
        } else if (riskFilter === 'ATT_CONCERN') {
          if (student.attendancePct >= 75) return false;
        } else if (riskFilter === 'ASG_CONCERN') {
          if (student.assignmentsPct >= 65) return false;
        } else if (student.riskLevel !== riskFilter) {
          return false;
        }
      }

      // Trend filter
      if (trendFilter !== 'ALL') {
        if (trendFilter === 'declining' && student.marksTrend !== 'declining' && student.attTrend !== 'declining') return false;
        if (trendFilter === 'improving' && student.marksTrend !== 'improving' && student.attTrend !== 'improving') return false;
      }

      // Class filter
      if (classFilter !== 'ALL' && student.className !== classFilter) {
        return false;
      }

      // Attendance Range filter
      if (attRange === 'BELOW_75' && student.attendancePct >= 75) return false;
      if (attRange === '75_84' && (student.attendancePct < 75 || student.attendancePct >= 85)) return false;
      if (attRange === '85_PLUS' && student.attendancePct < 85) return false;

      // Assignment Completion Range filter
      if (asgRange === 'BELOW_65' && student.assignmentsPct >= 65) return false;
      if (asgRange === '65_84' && (student.assignmentsPct < 65 || student.assignmentsPct >= 85)) return false;
      if (asgRange === '85_PLUS' && student.assignmentsPct < 85) return false;

      // Marks Range filter
      if (mrkRange === 'BELOW_50' && student.averageMarks >= 50) return false;
      if (mrkRange === '50_69' && (student.averageMarks < 50 || student.averageMarks >= 70)) return false;
      if (mrkRange === '70_PLUS' && student.averageMarks < 70) return false;

      return true;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [students, searchTerm, riskFilter, trendFilter, classFilter, attRange, asgRange, mrkRange, sortField, sortOrder]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setRiskFilter('ALL');
    setTrendFilter('ALL');
    setClassFilter('ALL');
    setAttRange('ALL');
    setAsgRange('ALL');
    setMrkRange('ALL');
    setSortField('weightedScore');
    setSortOrder('desc');
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder(field === 'name' ? 'asc' : 'desc');
    }
  };

  const isFiltered = searchTerm || riskFilter !== 'ALL' || trendFilter !== 'ALL' || classFilter !== 'ALL' || attRange !== 'ALL' || asgRange !== 'ALL' || mrkRange !== 'ALL';

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      
      {/* Header and Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Students Roster & Early-Warning Diagnostic</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredStudents.length} of {students.length} students across all cohorts
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => exportStudentsCSV(filteredStudents)}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              title="Export current filtered list to RFC-4180 CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 pt-2 border-t border-slate-100">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or student ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Risk Level & Section 9 Presets */}
          <div>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Support Priorities</option>
              <option value="High">🔴 High Priority Only</option>
              <option value="Medium">🟡 Medium Priority Only</option>
              <option value="Low">🟢 Low Priority Only</option>
              <option value="DECLINING_PERF">📉 Declining Performance</option>
              <option value="IMPROVING_PERF">📈 Improving Performance</option>
              <option value="ATT_CONCERN">⏰ Attendance &lt; 75%</option>
              <option value="ASG_CONCERN">📝 Assignments &lt; 65%</option>
              <option value="NEEDS_REVIEW">⚠️ Single-Signal Safeguard</option>
              <option value="INSUFFICIENT">❓ Insufficient Data</option>
            </select>
          </div>

          {/* Class Filter */}
          <div>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Cohorts / Classes</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          {/* Attendance Range */}
          <div>
            <select
              value={attRange}
              onChange={(e) => setAttRange(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Attendance: Any</option>
              <option value="BELOW_75">Below 75% (Critical)</option>
              <option value="75_84">75% - 84% (Moderate)</option>
              <option value="85_PLUS">85%+ (Target)</option>
            </select>
          </div>

          {/* Marks Range */}
          <div>
            <select
              value={mrkRange}
              onChange={(e) => setMrkRange(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Marks: Any</option>
              <option value="BELOW_50">Below 50% (Critical)</option>
              <option value="50_69">50% - 69% (Moderate)</option>
              <option value="70_PLUS">70%+ (Passing)</option>
            </select>
          </div>
        </div>

        {/* Clear Filters bar */}
        {isFiltered && (
          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="text-slate-500">
              Active filters match <strong className="text-slate-900">{filteredStudents.length}</strong> students
            </span>
            <button
              onClick={handleClearFilters}
              className="text-[#F9870D] hover:underline font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Responsive Student Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-800">No student records match the selected filters</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query, clearing specific risk thresholds, or resetting the filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold select-none">
                <tr>
                  <th
                    onClick={() => handleSort('studentId')}
                    className="p-3.5 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Student ID</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('name')}
                    className="p-3.5 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Student Name</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="p-3.5">Class & Sec</th>
                  <th
                    onClick={() => handleSort('attendancePct')}
                    className="p-3.5 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Attendance</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('assignmentsPct')}
                    className="p-3.5 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Assignments</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('averageMarks')}
                    className="p-3.5 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Marks Trend</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('weightedScore')}
                    className="p-3.5 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Support Priority</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.studentId}
                    className="hover:bg-orange-50/20 transition-colors cursor-pointer group"
                    onClick={() => onSelectStudent(student)}
                  >
                    <td className="p-3.5 font-mono font-medium text-slate-600">
                      {student.studentId}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900 group-hover:text-[#F9870D] transition-colors">
                        {student.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {student.contactEmail || 'No email on file'}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-medium text-slate-800">{student.className}</span>
                      <span className="text-slate-400 ml-1">({student.section})</span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              student.attendancePct >= 85 ? 'bg-emerald-500' : student.attendancePct >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${Math.min(100, student.attendancePct)}%` }}
                          />
                        </div>
                        <span className="font-semibold text-slate-900">{student.attendancePct}%</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {student.classesAttended}/{student.totalClasses} classes
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              student.assignmentsPct >= 85 ? 'bg-emerald-500' : student.assignmentsPct >= 65 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${Math.min(100, student.assignmentsPct)}%` }}
                          />
                        </div>
                        <span className="font-semibold text-slate-900">{student.assignmentsPct}%</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {student.assignmentsSubmitted}/{student.totalAssignments} tasks
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold ${
                          student.averageMarks >= 70 ? 'text-emerald-700' : student.averageMarks >= 50 ? 'text-amber-700' : 'text-rose-700'
                        }`}>
                          {student.averageMarks}%
                        </span>
                        {student.marksTrend === 'declining' && (
                          <span className="p-0.5 rounded bg-rose-50 text-rose-600" title="Declining assessment marks trend">
                            <TrendingDown className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {student.marksTrend === 'improving' && (
                          <span className="p-0.5 rounded bg-emerald-50 text-emerald-600" title="Improving assessment marks trend">
                            <TrendingUp className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <RiskBadge
                          level={student.riskLevel}
                          size="sm"
                          needsReview={student.needsReview}
                        />
                        {student.riskLevel !== 'Insufficient Data' && (
                          <span className="text-[11px] font-mono text-slate-400">
                            ({student.weightedScore})
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onSelectStudent(student)}
                          className="p-1.5 text-slate-500 hover:text-[#F9870D] hover:bg-[#F9870D]/10 rounded-lg transition-colors"
                          title="View Student Diagnostic Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onCreateIntervention(student)}
                          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Log New Intervention"
                        >
                          <PlusCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
