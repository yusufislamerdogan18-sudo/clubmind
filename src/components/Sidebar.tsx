import React from 'react';
import { 
  LayoutDashboard, Database, History, Lightbulb, 
  Scale, FileCode2, Settings, Sparkles, ChevronRight
} from 'lucide-react';

export type NavTab = 'dashboard' | 'clubmind' | 'retrospective' | 'ideaforge' | 'ideascore' | 'blueprint' | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isDemoMode: boolean;
}

export default function Sidebar({ activeTab, setActiveTab, isDemoMode }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as NavTab, label: 'Genel Bakış', desc: 'Özet & Hızlı Akış', icon: LayoutDashboard },
    { id: 'clubmind' as NavTab, label: 'Kulüp Hafızası', desc: 'Notlar & AI Soru-Cevap', icon: Database },
    { id: 'retrospective' as NavTab, label: 'Retrospektif & Dersler', desc: 'Geçmiş Proje Analizi', icon: History, badge: 'Önemli' },
    { id: 'ideaforge' as NavTab, label: 'IdeaForge', desc: 'AI Fikir Üretici', icon: Lightbulb },
    { id: 'ideascore' as NavTab, label: 'IdeaScore', desc: '5 Kriterli Puanlama', icon: Scale },
    { id: 'blueprint' as NavTab, label: 'Project Blueprint', desc: 'MVP Planı & Sunum', icon: FileCode2 },
    { id: 'settings' as NavTab, label: 'Ayarlar', desc: 'Kriterler & Sistem', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950/80 backdrop-blur-xl border-r border-slate-800/60 flex flex-col shrink-0 min-h-screen select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 text-lg font-black transition-transform hover:scale-105 duration-200">
            ⚓
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base tracking-tight">ClubMind</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              PRU Blockchain Kulübü
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1 tracking-wider">
          Navigasyon
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all duration-200 cursor-pointer text-left ${
                isActive
                  ? 'bg-indigo-600/15 text-white font-bold border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {/* Active Indicator Bar on left */}
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-500 rounded-r-full shadow-sm shadow-indigo-500"></div>
              )}

              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 duration-200 ${
                  isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300'
                }`} />
                <div>
                  <div className={`leading-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                    {item.desc}
                  </div>
                </div>
              </div>

              {item.badge && !isActive && (
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info: Clean AI Mode */}
      <div className="p-3 border-t border-slate-800/60 bg-slate-950/40">
        <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-amber-400' : 'bg-emerald-400'} animate-pulse`}></span>
            <div className="text-[11px] font-medium text-slate-300">
              {isDemoMode ? 'Simüle AI Modu' : 'Canlı LLM Modu'}
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
            Aktif
          </span>
        </div>
      </div>
    </aside>
  );
}
