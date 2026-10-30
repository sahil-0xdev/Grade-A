import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Download,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { downloadStudentTemplateCSV, parseAndValidateStudentCSV } from '../../services/csvService';

export default function ImportCsvModal({
  isOpen,
  onClose,
  onImportSuccess
}) {
  const [file, setFile] = useState(null);
  const [parsingResult, setParsingResult] = useState(null);
  const [importMode, setImportMode] = useState('replace'); // 'replace' | 'merge'
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      const result = parseAndValidateStudentCSV(text);
      setParsingResult(result);
    };
    reader.readAsText(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleConfirmImport = () => {
    if (parsingResult && parsingResult.valid && parsingResult.validStudents.length > 0) {
      onImportSuccess(parsingResult.validStudents, importMode);
      onClose();
    }
  };

  const resetState = () => {
    setFile(null);
    setParsingResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Import Student Dataset (CSV)
              </h3>
              <p className="text-xs text-slate-500">
                Upload real or custom cohort spreadsheet data with automatic risk calculation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Template helper banner */}
          <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center justify-between gap-3 text-xs">
            <div className="text-blue-900">
              <span className="font-semibold block">Need the exact CSV format?</span>
              <span className="text-blue-700 text-[11px]">
                Requires: student_id, student_name, class, section, total_classes, classes_attended, total_assignments, assignments_submitted, average_marks
              </span>
            </div>
            <button
              type="button"
              onClick={downloadStudentTemplateCSV}
              className="shrink-0 px-3 py-1.5 bg-white border border-blue-300 text-blue-700 hover:bg-blue-100/50 rounded-lg font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Template (.csv)
            </button>
          </div>

          {!parsingResult && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/50'
                  : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-[#F9870D]/10 border border-[#F9870D]/30 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6 text-[#F9870D]" />
              </div>
              <h4 className="text-sm font-semibold text-slate-800">
                Click to browse or drop your CSV file here
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Standard RFC-4180 CSV files up to 5 MB
              </p>
            </div>
          )}

          {/* Validation & Preview Screen */}
          {parsingResult && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-[#F9870D]" />
                  <span className="text-xs font-semibold text-slate-800">{file?.name}</span>
                </div>
                <button
                  onClick={resetState}
                  className="text-xs text-rose-600 hover:text-rose-800 font-medium"
                >
                  Change File
                </button>
              </div>

              {/* Status Banner */}
              {parsingResult.valid ? (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Validation Passed!</span>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      Found {parsingResult.validCount} valid student records ready to import.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-xs text-rose-900">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>CSV Validation Issues Detected ({parsingResult.errors.length})</span>
                  </div>
                  <ul className="max-h-32 overflow-y-auto space-y-1 pl-4 list-disc text-[11px] text-rose-800">
                    {parsingResult.errors.slice(0, 10).map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                    {parsingResult.errors.length > 10 && (
                      <li className="font-semibold">...and {parsingResult.errors.length - 10} more issues.</li>
                    )}
                  </ul>
                  <p className="text-[11px] text-rose-700 italic">
                    Please correct the records in your spreadsheet according to the template rules and re-upload.
                  </p>
                </div>
              )}

              {/* Preview of valid records */}
              {parsingResult.preview && parsingResult.preview.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Data Preview (First {parsingResult.preview.length} of {parsingResult.validCount} records)
                  </h4>
                  <div className="border border-slate-200 rounded-lg overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                        <tr>
                          <th className="p-2 font-semibold">ID</th>
                          <th className="p-2 font-semibold">Name</th>
                          <th className="p-2 font-semibold">Class</th>
                          <th className="p-2 font-semibold">Attendance</th>
                          <th className="p-2 font-semibold">Assignments</th>
                          <th className="p-2 font-semibold">Avg Marks</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {parsingResult.preview.map((p) => (
                          <tr key={p.studentId} className="hover:bg-slate-50">
                            <td className="p-2 font-mono">{p.studentId}</td>
                            <td className="p-2 font-medium">{p.name}</td>
                            <td className="p-2">{p.className} - {p.section}</td>
                            <td className="p-2">{p.classesAttended}/{p.totalClasses}</td>
                            <td className="p-2">{p.assignmentsSubmitted}/{p.totalAssignments}</td>
                            <td className="p-2 font-semibold">{p.averageMarks}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Import Options (Replace vs Merge) */}
              {parsingResult.valid && (
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Import Action Mode:
                  </label>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setImportMode('replace')}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        importMode === 'replace'
                          ? 'border-[#F9870D] bg-[#F9870D]/10 text-slate-900 font-bold ring-1 ring-[#F9870D]'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="font-semibold">Replace Current Cohort</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                        Overwrites current records with the uploaded spreadsheet
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setImportMode('merge')}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        importMode === 'merge'
                          ? 'border-[#F9870D] bg-[#F9870D]/10 text-slate-900 font-bold ring-1 ring-[#F9870D]'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="font-semibold">Merge with Existing</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                        Updates existing student IDs and appends new ones
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!parsingResult?.valid}
            onClick={handleConfirmImport}
            className="px-4 py-2 text-xs font-black text-[#000000] bg-[#F9870D] hover:bg-[#ea7600] rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <span>Apply Import</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#000000]" />
          </button>
        </div>

      </div>
    </div>
  );
}
