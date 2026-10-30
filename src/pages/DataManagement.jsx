import React, { useState } from 'react';
import {
  Database,
  Upload,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  HardDrive,
  Info,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { downloadStudentTemplateCSV } from '../services/csvService';
import ConfirmModal from '../components/common/ConfirmModal';
import AdminInfoCard from '../components/common/AdminInfoCard';

export default function DataManagement({
  students = [],
  isDemo = true,
  onOpenImportModal,
  onResetDemoData
}) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState(false);

  const handleResetConfirm = () => {
    setShowResetConfirm(false);
    onResetDemoData();
    setResetSuccessMessage(true);
    setTimeout(() => setResetSuccessMessage(false), 3000);
  };

  const rawStorageBytes = (JSON.stringify(students).length * 2);
  const storageKb = (rawStorageBytes / 1024).toFixed(1);
  const quotaPct = Math.min(100, Math.max(1, ((rawStorageBytes / (5 * 1024 * 1024)) * 100).toFixed(2)));

  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full ${
              isDemo
                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              {isDemo ? 'Synthetic Demo Mode Active' : 'Imported Cohort Data Active'}
            </span>
            <span className="text-xs text-slate-400 font-medium">Local Browser Persistence</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-2">
            Data Management & Ingestion Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage student records, import institutional CSV files, inspect storage quotas, or restore synthetic demo benchmarks
          </p>
        </div>

        <button
          onClick={() => setShowResetConfirm(true)}
          className="shrink-0 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
          <span>Reset to Demo Data</span>
        </button>
      </div>

      {resetSuccessMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-800 animate-fade-in shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Demo dataset and default thresholds successfully restored!</span>
        </div>
      )}

      {/* Dataset Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Active Student Records</span>
            <Database className="w-4 h-4 text-[#F9870D]" />
          </div>
          <div className="text-3xl font-black text-slate-900">{students.length}</div>
          <p className="text-xs text-slate-500">
            {isDemo ? '42 synthetically generated student profiles' : 'Live imported institutional records'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Storage Footprint & Quota</span>
            <HardDrive className="w-4 h-4 text-[#F9870D]" />
          </div>
          <div className="text-3xl font-black text-slate-900">{storageKb} KB</div>
          
          {/* Quota Progress Bar */}
          <div className="pt-1 space-y-1">
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#F9870D] h-full rounded-full" style={{ width: `${Math.max(2, quotaPct)}%` }} />
            </div>
            <p className="text-[10px] text-slate-400">
              Utilizing ~{quotaPct}% of 5 MB client browser quota
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Data Privacy Guarantee</span>
            <Lock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600">Zero Cloud Deps</div>
          <p className="text-xs text-slate-500">
            Data remains entirely on the educator's device
          </p>
        </div>
      </div>

      {/* Admin Guidance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminInfoCard
          title="Admin Guide: Replace vs. Merge Ingestion Modes"
          badge="Data Strategy"
          variant="blue"
        >
          <div className="space-y-1.5 text-xs">
            <p>
              <strong>Replace Mode:</strong> Use when beginning a fresh academic term or analyzing a distinct cohort. Clears existing roster and establishes the new file as the baseline.
            </p>
            <p>
              <strong>Merge Mode:</strong> Use for periodic updates (e.g. updating Test 2 scores). Updates matching Student IDs while preserving existing educator notes and intervention history.
            </p>
          </div>
        </AdminInfoCard>

        <AdminInfoCard
          title="Admin Guide: How Spreadsheet Validation Works"
          badge="Validation Rules"
          variant="indigo"
        >
          <div className="space-y-1.5 text-xs">
            <p>
              <strong>Integrity Checks:</strong> Grade A automatically checks non-negative integers, ensures classes attended do not exceed total classes, flags duplicate IDs, and prevents missing values from being mistakenly classified as low risk.
            </p>
          </div>
        </AdminInfoCard>
      </div>

      {/* CSV Ingestion Center */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">Import Institutional Student Data</h3>
          <p className="text-xs text-slate-500 mt-1">
            Grade A accepts standard CSV or Excel files exported from Student Information Systems (SIS), PowerSchool, Google Sheets, or Excel.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onOpenImportModal}
            className="px-6 py-3 bg-[#F9870D] hover:bg-[#ea7600] text-[#000000] rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Upload className="w-4 h-4 text-[#000000]" />
            <span>Upload Student CSV / Excel File</span>
          </button>

          <button
            onClick={downloadStudentTemplateCSV}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-300 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Sample CSV Template</span>
          </button>
        </div>

        {/* Format Spec Table */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#F9870D]" />
            <span>Required CSV Schema Specification</span>
          </h4>

          <div className="border border-slate-200 rounded-xl overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="p-3">Column Header</th>
                  <th className="p-3">Data Type</th>
                  <th className="p-3">Validation Rule</th>
                  <th className="p-3">Sample Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3 font-mono font-semibold text-blue-700">student_id</td>
                  <td className="p-3">String</td>
                  <td className="p-3">Required, unique identifier</td>
                  <td className="p-3 font-mono">STU-1001</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-blue-700">student_name</td>
                  <td className="p-3">String</td>
                  <td className="p-3">Required, student full name</td>
                  <td className="p-3">Aarav Sharma</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-blue-700">class</td>
                  <td className="p-3">String</td>
                  <td className="p-3">Cohort / Year group</td>
                  <td className="p-3">Senior</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-blue-700">section</td>
                  <td className="p-3">String</td>
                  <td className="p-3">Class section code</td>
                  <td className="p-3">S2</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-blue-700">total_classes</td>
                  <td className="p-3">Integer</td>
                  <td className="p-3">&gt; 0</td>
                  <td className="p-3">60</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-blue-700">classes_attended</td>
                  <td className="p-3">Integer</td>
                  <td className="p-3">≥ 0 and ≤ total_classes</td>
                  <td className="p-3">48</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-blue-700">total_assignments</td>
                  <td className="p-3">Integer</td>
                  <td className="p-3">≥ 0</td>
                  <td className="p-3">10</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-blue-700">assignments_submitted</td>
                  <td className="p-3">Integer</td>
                  <td className="p-3">≥ 0 and ≤ total_assignments</td>
                  <td className="p-3">7</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-blue-700">average_marks</td>
                  <td className="p-3">Number</td>
                  <td className="p-3">0.0 to 100.0</td>
                  <td className="p-3">64</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetConfirm}
        title="Restore Default Synthetic Demo Dataset?"
        message="This will reset the students directory back to the 42 synthetic demo records, restore default risk thresholds (40% attendance, 30% assignments, 30% marks), and reload default interventions. Any imported spreadsheet records or custom interventions will be overwritten."
        confirmText="Yes, Reset Everything"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={handleResetConfirm}
        onCancel={() => setShowResetConfirm(false)}
      />

    </div>
  );
}
