import React from 'react';
import { 
  LayoutDashboard, Lightbulb, Scale, FileCode2, Database, 
  History, Settings, Wallet, Sparkles, ChevronRight, Menu, X 
} from 'lucide-react';

export type NavTab = 'terminal' | 'ideaforge' | 'ideascore' | 'blueprint' | 'vault' | 'retro' | 'settings';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isDemoMode: boolean;
}

export default function Navbar({ activeTab, setActiveTab, isDemoMode }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const tabs = [
    { id: 'terminal' as NavTab, label: 'Terminal', icon: LayoutDashboard },
    { id: 'ideaforge' as NavTab, label: 'Fikirler', icon: Lightbulb },
    { id: 'ideascore' as NavTab, label: 'Puanlama', icon: Scale },
    { id: 'blueprint' as NavTab, label: 'Blueprint', icon: FileCode2 },
    { id: 'vault' as NavTab, label: 'Hafıza', icon: Database },
    { id: 'retro' as NavTab, label: 'Retrospektif', icon: History },
    { id: 'settings' as NavTab, label: 'Ayarlar', icon: Settings },
  ];

  return (
    <header className="sticky top-3 z-50 max-w-7xl mx-auto px-4 sm:px-6 mb-6">
      <div className="glass-card rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-2xl">
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('terminal')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
            ⚓
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-white text-base tracking-tight">ClubMind</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                OS
              </span>
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold hidden sm:block">
              PRU Blockchain
            </div>
          </div>
        </div>

        {/* Center Pill Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Status & Wallet Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Polygon Amoy
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-slate-300">
            <Wallet className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">0x742d...f44e</span>
            <span className="sm:hidden">0x742d</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl bg-white/[0.05] text-slate-300"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 glass-card rounded-2xl p-3 space-y-1 animate-scale-in">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${
                  isActive ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
