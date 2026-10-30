import React, { useState, useEffect, useMemo } from 'react';
import LandingPage from './pages/LandingPage';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';

// Modals
import StudentDetailModal from './components/modals/StudentDetailModal';
import InterventionModal from './components/modals/InterventionModal';
import ImportCsvModal from './components/modals/ImportCsvModal';
import GradeAIAssistant from './components/ai/GradeAIAssistant';
import { Sparkles } from 'lucide-react';

// Pages
import Overview from './pages/Overview';
import Students from './pages/Students';
import RiskAnalysis from './pages/RiskAnalysis';
import WhatIfAnalysis from './pages/WhatIfAnalysis';
import Interventions from './pages/Interventions';
import Reports from './pages/Reports';
import DataManagement from './pages/DataManagement';
import Settings from './pages/Settings';

// Services
import {
  getStoredStudents,
  setStoredStudents,
  isDemoDataActive,
  getStoredInterventions,
  setStoredInterventions,
  saveIntervention,
  deleteIntervention,
  getStoredSettings,
  setStoredSettings,
  getStoredMeta,
  setStoredMeta,
  resetToDemoData
} from './services/storageService';
import { calculateAllStudentsRisk } from './services/riskService';

export default function App() {
  // Mode: Landing Page vs Dashboard
  const [showLanding, setShowLanding] = useState(true);

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [initialRiskFilter, setInitialRiskFilter] = useState('ALL');

  // Backend Health State
  const [backendOnline, setBackendOnline] = useState(false);

  // Core Data States
  const [rawStudents, setRawStudents] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [settings, setSettings] = useState(getStoredSettings());
  const [meta, setMeta] = useState(getStoredMeta());
  const [isDemo, setIsDemo] = useState(true);

  // Modals
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [interventionStudent, setInterventionStudent] = useState(null);
  const [editingIntervention, setEditingIntervention] = useState(null);
  const [isInterventionModalOpen, setIsInterventionModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // Initial Load & Backend Health Check
  useEffect(() => {
    const loadedStudents = getStoredStudents();
    const loadedInterventions = getStoredInterventions();
    const loadedSettings = getStoredSettings();
    const loadedMeta = getStoredMeta();
    const loadedIsDemo = isDemoDataActive();

    setRawStudents(loadedStudents);
    setInterventions(loadedInterventions);
    setSettings(loadedSettings);
    setMeta(loadedMeta);
    setIsDemo(loadedIsDemo);

    // Non-blocking ping to local FastAPI backend
    fetch('http://localhost:8000/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'healthy') {
          setBackendOnline(true);
        }
      })
      .catch(() => {
        setBackendOnline(false);
      });
  }, []);

  // Compute Students with full risk calculations based on current thresholds and weights
  const studentsWithRisk = useMemo(() => {
    return calculateAllStudentsRisk(rawStudents, settings.thresholds, settings.weights);
  }, [rawStudents, settings]);

  // Available classes for Topbar / Filter
  const availableClasses = useMemo(() => {
    return Array.from(new Set(studentsWithRisk.map(s => s.className).filter(Boolean)));
  }, [studentsWithRisk]);

  // Cohort filtered by Global Topbar Class selector
  const activeCohort = useMemo(() => {
    if (selectedClass === 'ALL') return studentsWithRisk;
    return studentsWithRisk.filter(s => s.className === selectedClass);
  }, [studentsWithRisk, selectedClass]);

  // High-Risk & Needs Review counts for attention indicators
  const highRiskStudents = useMemo(() => {
    return activeCohort.filter(s => s.riskLevel === 'High' || s.needsReview);
  }, [activeCohort]);

  // Handle student notes update from modal
  const handleUpdateStudentNotes = (studentId, notes) => {
    const updated = rawStudents.map(s => {
      if (s.studentId === studentId) {
        return { ...s, notes };
      }
      return s;
    });
    setRawStudents(updated);
    setStoredStudents(updated, isDemo);

    if (selectedStudent && selectedStudent.studentId === studentId) {
      setSelectedStudent(prev => ({ ...prev, notes }));
    }
  };

  // Handle CSV Import
  const handleImportSuccess = (importedStudents, mode) => {
    let finalStudents = [];
    if (mode === 'replace') {
      finalStudents = importedStudents;
    } else {
      const existingMap = new Map(rawStudents.map(s => [s.studentId, s]));
      importedStudents.forEach(imp => existingMap.set(imp.studentId, imp));
      finalStudents = Array.from(existingMap.values());
    }

    setRawStudents(finalStudents);
    setIsDemo(false);
    setStoredStudents(finalStudents, false);
    setActiveTab('students');
  };

  // Handle Settings Save
  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setStoredSettings(newSettings);
  };

  // Handle Meta Save
  const handleSaveMeta = (newMeta) => {
    setMeta(newMeta);
    setStoredMeta(newMeta);
  };

  // Handle Reset to Demo Data
  const handleResetDemoData = () => {
    const res = resetToDemoData();
    setRawStudents(res.students);
    setInterventions(res.interventions);
    setSettings(res.settings);
    setMeta(res.meta);
    setIsDemo(true);
    setSelectedClass('ALL');
  };

  // Handle Intervention Save (Create or Update)
  const handleSaveIntervention = (intervention) => {
    const updated = saveIntervention(intervention);
    setInterventions(updated);
  };

  // Handle Quick Status Update
  const handleUpdateInterventionStatus = (id, newStatus) => {
    const target = interventions.find(i => i.id === id);
    if (target) {
      handleSaveIntervention({ ...target, status: newStatus });
    }
  };

  // Handle Intervention Delete
  const handleDeleteIntervention = (id) => {
    const updated = deleteIntervention(id);
    setInterventions(updated);
  };

  // Navigation shortcut from metric cards
  const handleNavigateToRiskFilter = (riskLevel) => {
    setInitialRiskFilter(riskLevel);
    setActiveTab('students');
  };

  // What-If launcher
  const handleLaunchWhatIf = (student) => {
    setSelectedStudent(null);
    setActiveTab('what-if');
  };

  // Render Landing Page if active
  if (showLanding) {
    return (
      <LandingPage
        onEnterDashboard={() => setShowLanding(false)}
        onTryDemoData={() => {
          handleResetDemoData();
          setShowLanding(false);
          setActiveTab('overview');
        }}
        onOpenAI={() => {
          setShowLanding(false);
          setIsAIAssistantOpen(true);
        }}
        onNavigateToAbout={() => {
          setShowLanding(false);
          setActiveTab('settings');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        highRiskCount={highRiskStudents.length}
        needsReviewCount={activeCohort.filter(s => s.needsReview).length}
        isDemo={isDemo}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onGoToLanding={() => setShowLanding(true)}
        onOpenAI={() => setIsAIAssistantOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Sticky Topbar */}
        <Topbar
          onOpenMobileMenu={() => setMobileOpen(true)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          availableClasses={availableClasses}
          meta={meta}
          setMeta={handleSaveMeta}
          highRiskStudents={highRiskStudents}
          onSelectStudent={setSelectedStudent}
          setActiveTab={setActiveTab}
          onGoToLanding={() => setShowLanding(true)}
          backendOnline={backendOnline}
          onOpenAI={() => setIsAIAssistantOpen(true)}
        />

        {/* Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
            <Overview
              students={activeCohort}
              onNavigateToRiskFilter={handleNavigateToRiskFilter}
              onSelectStudent={setSelectedStudent}
              onOpenImportModal={() => setIsImportModalOpen(true)}
              isDemo={isDemo}
            />
          )}

          {activeTab === 'students' && (
            <Students
              students={activeCohort}
              onSelectStudent={setSelectedStudent}
              onCreateIntervention={(student) => {
                setInterventionStudent(student);
                setEditingIntervention(null);
                setIsInterventionModalOpen(true);
              }}
              onOpenWhatIf={handleLaunchWhatIf}
              initialRiskFilter={initialRiskFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}

          {activeTab === 'risk-analysis' && (
            <RiskAnalysis
              students={activeCohort}
              thresholds={settings.thresholds}
              weights={settings.weights}
              onSelectStudent={setSelectedStudent}
              onNavigateToSettings={() => setActiveTab('settings')}
            />
          )}

          {activeTab === 'what-if' && (
            <WhatIfAnalysis
              students={activeCohort}
              thresholds={settings.thresholds}
              weights={settings.weights}
              onSelectStudentForDetails={setSelectedStudent}
            />
          )}

          {activeTab === 'interventions' && (
            <Interventions
              interventions={interventions}
              students={studentsWithRisk}
              onOpenCreateModal={() => {
                setInterventionStudent(null);
                setEditingIntervention(null);
                setIsInterventionModalOpen(true);
              }}
              onOpenEditModal={(item) => {
                setEditingIntervention(item);
                setInterventionStudent(null);
                setIsInterventionModalOpen(true);
              }}
              onUpdateStatus={handleUpdateInterventionStatus}
              onDeleteIntervention={handleDeleteIntervention}
              onSelectStudent={(student) => {
                const fullStudent = studentsWithRisk.find(s => s.studentId === student.studentId) || student;
                setSelectedStudent(fullStudent);
              }}
            />
          )}

          {activeTab === 'reports' && (
            <Reports
              students={activeCohort}
              interventions={interventions}
              meta={meta}
            />
          )}

          {activeTab === 'data-management' && (
            <DataManagement
              students={rawStudents}
              isDemo={isDemo}
              onOpenImportModal={() => setIsImportModalOpen(true)}
              onResetDemoData={handleResetDemoData}
            />
          )}

          {activeTab === 'settings' && (
            <Settings
              thresholds={settings.thresholds}
              weights={settings.weights}
              meta={meta}
              students={activeCohort}
              onSaveSettings={handleSaveSettings}
              onSaveMeta={handleSaveMeta}
              onResetSettings={() => {
                const res = resetToDemoData();
                setSettings(res.settings);
              }}
            />
          )}
        </main>
      </div>

      {/* Student Diagnostic Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          isOpen={Boolean(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
          onCreateIntervention={(s) => {
            setInterventionStudent(s);
            setEditingIntervention(null);
            setIsInterventionModalOpen(true);
          }}
          onUpdateNotes={handleUpdateStudentNotes}
          onLaunchWhatIf={handleLaunchWhatIf}
        />
      )}

      {/* Intervention Create / Edit Modal */}
      {isInterventionModalOpen && (
        <InterventionModal
          isOpen={isInterventionModalOpen}
          onClose={() => {
            setIsInterventionModalOpen(false);
            setEditingIntervention(null);
            setInterventionStudent(null);
          }}
          onSave={handleSaveIntervention}
          students={studentsWithRisk}
          initialData={
            editingIntervention || (interventionStudent ? {
              studentId: interventionStudent.studentId,
              studentName: interventionStudent.name,
              action: interventionStudent.recommendedAction,
              reason: interventionStudent.reasons?.[0]?.text || '',
              riskLevel: interventionStudent.riskLevel
            } : null)
          }
        />
      )}

      {/* CSV Ingestion Modal */}
      {isImportModalOpen && (
        <ImportCsvModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onImportSuccess={handleImportSuccess}
        />
      )}

      {/* Floating AI Assistant Summoner Pill */}
      <button
        onClick={() => setIsAIAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-2.5 bg-[#0d1015] hover:bg-[#14181f] text-white border-2 border-[#F9870D] rounded-full shadow-2xl shadow-black/80 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group"
        title="Ask Grade A AI (Powered by Groq)"
      >
        <div className="w-5 h-5 rounded-full bg-[#F9870D] text-black flex items-center justify-center font-bold">
          <Sparkles className="w-3 h-3 text-black animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <span className="text-xs font-black tracking-tight">Ask AI</span>
        <span className="text-[9px] font-mono font-bold bg-[#F9870D]/20 text-[#F9870D] px-1.5 py-0.2 rounded border border-[#F9870D]/40">
          Groq
        </span>
      </button>

      {/* Groq AI Academic Diagnostic Assistant Drawer */}
      <GradeAIAssistant
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        students={activeCohort}
        onSelectStudent={setSelectedStudent}
      />
    </div>
  );
}
