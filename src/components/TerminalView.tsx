import React from 'react';
import { 
  Sparkles, Lightbulb, Scale, FileCode2, Database, 
  ArrowUpRight, ShieldCheck, Zap, Award, CheckCircle, 
  ChevronRight, TrendingUp, Cpu
} from 'lucide-react';
import { ClubDocument, ProjectIdea, IdeaEvaluation, HistoricalProject, LessonLearned } from '../types';
import { NavTab } from './Navbar';

interface TerminalViewProps {
  documents: ClubDocument[];
  ideas: ProjectIdea[];
  evaluations: IdeaEvaluation[];
  projects: HistoricalProject[];
  lessons: LessonLearned[];
  onNavigate: (tab: NavTab) => void;
  onSelectIdeaForEvaluation: (idea: ProjectIdea) => void;
  onSelectIdeaForBlueprint: (idea: ProjectIdea) => void;
}

export default function TerminalView({
  documents,
  ideas,
  evaluations,
  projects,
  lessons,
  onNavigate,
  onSelectIdeaForEvaluation,
  onSelectIdeaForBlueprint,
}: TerminalViewProps) {
  // Sort top evaluations
  const topEvaluations = [...evaluations].sort((a, b) => b.overallScore - a.overallScore).slice(0, 4);

  // Quick action configs
  const actionCards = [
    {
      title: 'Fikir Türet',
      tag: 'IdeaForge',
      metric: `${ideas.length} Fikir Hazır`,
      tab: 'ideaforge' as NavTab,
      icon: Lightbulb,
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
      btnText: 'Keşfet',
    },
    {
      title: 'Puanlama',
      tag: 'IdeaScore 5.0',
      metric: `${evaluations.length} Puanlandı`,
      tab: 'ideascore' as NavTab,
      icon: Scale,
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
      btnText: 'Puanla',
    },
    {
      title: 'Blueprint & MVP',
      tag: '2.5 Dk Sunum',
      metric: 'Sprint 1-3 Yol Haritası',
      tab: 'blueprint' as NavTab,
      icon: FileCode2,
      color: 'from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30',
      btnText: 'Planı Aç',
    },
    {
      title: 'Kulüp Hafızası',
      tag: 'Geçmiş & Dersler',
      metric: `${documents.length} Doküman • ${lessons.length} Ders`,
      tab: 'vault' as NavTab,
      icon: Database,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
      btnText: 'Arşivi İncele',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Sleek Web3 Hero HUD */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950 border border-white/[0.08] backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.05] border border-white/[0.1] text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Piri Reis Üniversitesi Blockchain Club • Hackathon Engine
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Hafızadan <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Kazanan MVP</span>'ye.
            </h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Kulüp arşivinden beslenen yapay zeka ile fikirleri 5 kriterde puanlayın, 2.5 dakikalık jüri sunumu ve sprint görevlerine dönüştürün.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="text-2xl font-black text-cyan-400 font-mono">91.5</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">En Yüksek Skor</div>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="text-2xl font-black text-emerald-400 font-mono">{ideas.length}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Aktif Fikir</div>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="text-2xl font-black text-purple-400 font-mono">{lessons.length}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Kritik Ders</div>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="text-2xl font-black text-amber-400 font-mono">2.5m</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Pitch Süresi</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Interactive Feature Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actionCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(card.tab)}
              className="glass-card rounded-2xl p-5 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} border flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded-full bg-white/[0.04]">
                    {card.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{card.metric}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white">
                <span>{card.btnText}</span>
                <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Terminal Grid: Leaderboard + Quick Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Leaderboard */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-black text-white">Lider Proje Sıralaması</h2>
            </div>
            <button
              onClick={() => onNavigate('ideascore')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              Tümünü Gör <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {topEvaluations.map((ev, i) => {
              const matchedIdea = ideas.find(id => id.id === ev.ideaId);
              const rankColor = i === 0 ? 'text-amber-400' : i === 1 ? 'text-slate-300' : 'text-amber-600';
              const isTop = ev.overallScore >= 85;

              return (
                <div
                  key={ev.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-sm font-black w-6 text-center ${rankColor}`}>
                      #{i + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                          {ev.ideaName}
                        </span>
                        {isTop && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold">
                            Top Pick
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>İnovasyon: {ev.criteriaScores.novelty}</span>
                        <span>•</span>
                        <span>Yapılabilirlik: {ev.criteriaScores.feasibility}</span>
                        <span>•</span>
                        <span>PRU Uyumu: {ev.criteriaScores.clubValue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-lg font-black text-cyan-400 font-mono">
                        {ev.overallScore.toFixed(1)}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                        / 100
                      </div>
                    </div>

                    {matchedIdea && (
                      <button
                        onClick={() => onSelectIdeaForBlueprint(matchedIdea)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-all cursor-pointer"
                      >
                        Planı Aç
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Execution Pipeline */}
        <div className="glass-card rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-black text-white">Hackathon Akışı</h2>
            </div>

            <div className="space-y-4">
              <div 
                onClick={() => onNavigate('vault')}
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.15] cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    1. Arşiv & Hafıza
                  </span>
                  <span className="font-mono text-cyan-400">{documents.length} Doküman</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Geçmiş proje tecrübeleri ve tüzük analiz edildi.</p>
              </div>

              <div 
                onClick={() => onNavigate('ideascore')}
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.15] cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                    2. IdeaScore 5.0
                  </span>
                  <span className="font-mono text-indigo-400">{evaluations.length} Rapor</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">İnovasyon ve yapılabilirlik skorları üretildi.</p>
              </div>

              <div 
                onClick={() => onNavigate('blueprint')}
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.15] cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    3. Sprint & Pitch
                  </span>
                  <span className="font-mono text-purple-400">2.5 Dk</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">3 fazlı görev listesi ve jüri provası hazır.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('ideaforge')}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-indigo-600 text-white font-bold text-xs tracking-wide shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-transform cursor-pointer"
          >
            ⚡ Yeni Proje Başlat
          </button>
        </div>
      </div>
    </div>
  );
}
