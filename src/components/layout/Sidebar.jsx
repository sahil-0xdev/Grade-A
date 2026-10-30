import React from 'react';
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  ClipboardList,
  FileSpreadsheet,
  Database,
  Settings,
  HelpCircle,
  GraduationCap,
  Sliders,
  Home,
  Sparkles
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  highRiskCount = 0,
  needsReviewCount = 0,
  isDemo = true,
  mobileOpen = false,
  setMobileOpen,
  onGoToLanding,
  onOpenAI
}) {
  const navItems = [
    { id: 'overview', label: 'Teacher Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students Roster', icon: Users },
    {
      id: 'risk-analysis',
      label: 'Risk Analysis',
      icon: ShieldAlert,
      badge: highRiskCount > 0 ? highRiskCount : null,
      badgeColor: 'bg-rose-500'
    },
    {
      id: 'what-if',
      label: 'What-If Analysis',
      icon: Sliders
    },
    {
      id: 'interventions',
      label: 'Intervention Tracker',
      icon: ClipboardList
    },
    { id: 'reports', label: 'Reports & Export', icon: FileSpreadsheet },
    {
      id: 'data-management',
      label: 'Data Import & Demo',
      icon: Database,
      tag: isDemo ? 'Demo Data' : 'Imported'
    },
    { id: 'settings', label: 'Settings & About', icon: Settings },
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#000000]/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container: Brand Jet Black (#000000) with crisp border */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0a0a0a] text-zinc-200 flex flex-col border-r border-white/10 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10 bg-[#000000]">
          <div
            onClick={onGoToLanding}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
            title="Return to Landing Page"
          >
            <div className="w-8 h-8 rounded-lg bg-[#000000] border-2 border-[#F9870D] flex items-center justify-center overflow-hidden p-0.5">
              <img src="/logo.png" alt="Grade A Logo" className="w-full h-full object-contain rounded-md" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[#FFFFFF] text-base tracking-tight">Grade A</span>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium">Early-Warning Platform</p>
            </div>
          </div>

          <button
            onClick={onGoToLanding}
            className="p-1.5 text-zinc-400 hover:text-[#F9870D] rounded-lg hover:bg-white/5 transition-colors"
            title="Landing Page"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#F9870D] text-[#000000] shadow-sm'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#000000]' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-[#000000] text-[#FFFFFF]' : item.badgeColor + ' text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.tag && (
                    <span
                      className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-[#000000]/20 text-[#000000]'
                          : isDemo
                          ? 'bg-[#F9870D]/15 text-[#F9870D] border border-[#F9870D]/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Quick Groq AI Assistant CTA in Sidebar */}
        <div className="px-3 pb-3">
          <button
            onClick={() => {
              if (onOpenAI) onOpenAI();
              if (setMobileOpen) setMobileOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#14181f] to-[#1a140f] border border-[#F9870D]/40 text-[#F9870D] hover:border-[#F9870D] transition-all group shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F9870D] animate-pulse" />
              <span className="text-xs font-bold text-white">Ask Grade A AI</span>
            </div>
            <span className="text-[9px] font-mono font-bold bg-[#F9870D]/20 text-[#F9870D] px-1.5 py-0.5 rounded border border-[#F9870D]/30">
              Groq
            </span>
          </button>
        </div>

        {/* Responsible AI / System Notice */}
        <div className="p-3.5 border-t border-white/10 bg-[#000000]">
          <div className="bg-[#121214] rounded-xl p-2.5 text-xs border border-white/10">
            <div className="flex items-center gap-1.5 text-white font-semibold mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#F9870D]" />
              <span>Detect • Explain • Support</span>
            </div>
            <p className="text-[10px] text-zinc-400 leading-relaxed">
              Transparent indicators to assist teachers. No automated disciplinary decisions.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
