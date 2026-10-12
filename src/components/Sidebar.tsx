import React from 'react';
import { 
  LayoutDashboard, Database, History, Lightbulb, 
  Scale, FileCode2, Settings, Sparkles, Anchor
} from 'lucide-react';

export type NavTab = 'dashboard' | 'clubmind' | 'retrospective' | 'ideaforge' | 'ideascore' | 'blueprint' | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isDemoMode: boolean;
}

export default function Sidebar({ activeTab, setActiveTab, isDemoMode }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as NavTab, label: 'Genel Bakış (Overview)', icon: LayoutDashboard },
    { id: 'clubmind' as NavTab, label: 'ClubMind (Hafıza & Soru-Cevap)', icon: Database },
    { id: 'retrospective' as NavTab, label: 'Retrospektif & Dersler', icon: History, badge: 'Önemli' },
    { id: 'ideaforge' as NavTab, label: 'IdeaForge (Fikir Üretici)', icon: Lightbulb },
    { id: 'ideascore' as NavTab, label: 'IdeaScore (Fikir Değerlendirme)', icon: Scale },
    { id: 'blueprint' as NavTab, label: 'Project Blueprint (MVP Planı)', icon: FileCode2 },
    { id: 'settings' as NavTab, label: 'Ayarlar (Settings)', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950/95 border-r border-slate-800/80 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 font-black text-xl">
            ⚓
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base tracking-tight">ClubMind</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[130px]">
              PRU Blockchain Kulübü
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1.5 tracking-wider">
          Kulüp Karar Destek Portalı
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer text-left ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && !isActive && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info: Demo Mode Badge */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5 font-medium">
              <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-amber-400' : 'bg-emerald-400'} animate-pulse`}></span>
              AI Durumu:
            </span>
            <span className={`font-mono text-[10px] font-bold ${isDemoMode ? 'text-amber-400' : 'text-emerald-400'}`}>
              {isDemoMode ? 'Demo Modu' : 'Canlı API'}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            {isDemoMode 
              ? 'Yapay zeka yanıtları yerel örnek veriyle simüle edilmektedir.' 
              : 'Canlı LLM bağlantısı devrede.'}
          </p>
        </div>
      </div>
    </aside>
  );
}
