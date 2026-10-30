import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  User,
  School,
  AlertTriangle,
  ChevronDown,
  X,
  Server,
  Home,
  Sparkles
} from 'lucide-react';

export default function Topbar({
  onOpenMobileMenu,
  searchTerm,
  setSearchTerm,
  selectedClass,
  setSelectedClass,
  availableClasses = [],
  meta,
  setMeta,
  highRiskStudents = [],
  onSelectStudent,
  setActiveTab,
  onGoToLanding,
  backendOnline = false,
  onOpenAI
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roles = [
    { title: 'Academic Coordinator', name: 'Ms. Elena Vance' },
    { title: 'Senior Homeroom Teacher', name: 'Mr. David Henderson' },
    { title: 'Academic Dean / Admin', name: 'Dr. Arthur Campbell' }
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#000000] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Class Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={onGoToLanding}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 border border-white/10 text-xs font-semibold transition-colors"
          title="Return to Home / Landing Page"
        >
          <Home className="w-4 h-4 text-[#F9870D]" />
          <span className="hidden sm:inline">Home</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300 bg-[#121214] px-3 py-1.5 rounded-lg border border-white/10">
          <School className="w-3.5 h-3.5 text-[#F9870D]" />
          <span className="font-semibold text-white">{meta?.institutionName || 'Oakridge Academy'}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">{meta?.academicTerm || 'Fall 2026'}</span>
        </div>

        {/* Global Class Filter */}
        <div className="flex items-center gap-1.5">
          <label htmlFor="topbar-class" className="text-xs font-medium text-zinc-400 hidden md:inline">
            Class:
          </label>
          <select
            id="topbar-class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="text-xs font-semibold bg-[#121214] border border-white/15 rounded-lg px-2.5 py-1.5 text-zinc-200 hover:border-[#F9870D]/50 focus:outline-none focus:ring-2 focus:ring-[#F9870D]"
          >
            <option value="ALL">All Cohorts ({availableClasses.length})</option>
            {availableClasses.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Backend Status Indicator */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border bg-[#121214] border-white/10 text-zinc-300">
          <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-[#F9870D]'}`} />
          <span>{backendOnline ? 'FastAPI Connected' : 'Local Mode (Zero Cloud)'}</span>
        </div>
      </div>

      {/* Center: Global Search */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name or ID (e.g. STU-1001)..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (setActiveTab && e.target.value.trim().length > 0) {
                setActiveTab('students');
              }
            }}
            className="w-full text-xs pl-9 pr-8 py-2 bg-[#121214] border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9870D] focus:border-[#F9870D] text-white placeholder-zinc-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right: Notifications, AI & Demo Role Indicator */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Ask Grade A AI Assistant Button */}
        <button
          onClick={onOpenAI}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F9870D]/15 border border-[#F9870D]/40 text-[#F9870D] hover:bg-[#F9870D] hover:text-black font-black text-xs transition-all group active:scale-95"
          title="Ask Grade A AI (Powered by Groq)"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F9870D] group-hover:text-black animate-pulse" />
          <span className="hidden sm:inline">Ask AI</span>
          <span className="text-[9px] font-mono uppercase px-1 py-0.2 rounded bg-[#F9870D]/20 text-[#F9870D] group-hover:bg-black/20 group-hover:text-black font-bold">
            Groq
          </span>
        </button>

        {/* Attention Indicator Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            title="Early warning alerts"
          >
            <Bell className="w-5 h-5" />
            {highRiskStudents.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#000000]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0f0f11] rounded-xl shadow-2xl border border-white/15 z-50 animate-in fade-in">
              <div className="p-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-bold text-white uppercase tracking-wide">
                    Attention Required ({highRiskStudents.length})
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
                {highRiskStudents.length === 0 ? (
                  <div className="p-6 text-center text-xs text-zinc-400">
                    No urgent high-priority flags at this moment.
                  </div>
                ) : (
                  highRiskStudents.slice(0, 6).map((student) => (
                    <div
                      key={student.studentId}
                      onClick={() => {
                        onSelectStudent(student);
                        setShowNotifications(false);
                      }}
                      className="p-3 hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">{student.name}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          Score: {student.weightedScore}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                        {student.reasons?.[0]?.text || 'Multiple signals below support threshold'}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {highRiskStudents.length > 0 && (
                <div className="p-2.5 border-t border-white/10 bg-[#08080a] text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      setActiveTab('students');
                    }}
                    className="text-xs font-bold text-[#F9870D] hover:underline"
                  >
                    View all flagged students &rarr;
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Demo Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-white/15 bg-[#121214] hover:bg-white/5 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-[#F9870D]/20 text-[#F9870D] border border-[#F9870D]/30 flex items-center justify-center font-bold text-xs">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-bold text-white line-clamp-1">{meta?.activeUser}</div>
              <div className="text-[10px] text-zinc-400 line-clamp-1">{meta?.activeRole}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#0f0f11] rounded-xl shadow-2xl border border-white/15 z-50 p-2 animate-in fade-in">
              <div className="px-3 py-2 text-[11px] font-bold uppercase text-zinc-400 tracking-wider">
                Switch Active Role
              </div>
              {roles.map((r) => (
                <button
                  key={r.title}
                  onClick={() => {
                    setMeta({
                      ...meta,
                      activeRole: r.title,
                      activeUser: r.name
                    });
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex flex-col ${
                    meta?.activeRole === r.title
                      ? 'bg-[#F9870D]/20 text-[#F9870D] font-bold border border-[#F9870D]/30'
                      : 'hover:bg-white/5 text-zinc-300'
                  }`}
                >
                  <span className="font-semibold text-white">{r.name}</span>
                  <span className="text-[10px] text-zinc-400">{r.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
