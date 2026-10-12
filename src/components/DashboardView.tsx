import React from 'react';
import { 
  Database, Lightbulb, Scale, History, Plus, 
  ArrowRight, Sparkles, CheckCircle2, TrendingUp, AlertTriangle, BookOpen 
} from 'lucide-react';
import { ClubDocument, ProjectIdea, IdeaEvaluation, HistoricalProject, LessonLearned } from '../types';
import { NavTab } from './Sidebar';

interface DashboardViewProps {
  documents: ClubDocument[];
  ideas: ProjectIdea[];
  evaluations: IdeaEvaluation[];
  projects: HistoricalProject[];
  lessons: LessonLearned[];
  onNavigate: (tab: NavTab) => void;
  onSelectIdeaForEvaluation: (idea: ProjectIdea) => void;
  onSelectIdeaForBlueprint: (idea: ProjectIdea) => void;
}

export default function DashboardView({
  documents,
  ideas,
  evaluations,
  projects,
  lessons,
  onNavigate,
  onSelectIdeaForEvaluation,
  onSelectIdeaForBlueprint,
}: DashboardViewProps) {
  // Sort highest scoring evaluated ideas
  const highestScoring = [...evaluations].sort((a, b) => b.overallScore - a.overallScore).slice(0, 3);
  const recentDocs = [...documents].slice(0, 3);
  const recentIdeas = [...ideas].slice(0, 3);

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Piri Reis Üniversitesi Blockchain Kulübü
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            ClubMind: Yapay Zeka Destekli Kulüp Hafızası & Karar Portalı
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Geçmiş projelerin derslerini koruyun, yeni proje fikirleri keşfedin, şeffaf kriterlerle puanlayın ve kazanan fikirleri 1 tıkla MVP geliştirme planına dönüştürün.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => onNavigate('ideaforge')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              <Lightbulb className="w-4 h-4" />
              Yeni Fikir Üret
            </button>
            <button
              onClick={() => onNavigate('clubmind')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition cursor-pointer"
            >
              <Plus className="w-4 h-4 text-cyan-400" />
              Doküman / Not Ekle
            </button>
            <button
              onClick={() => onNavigate('retrospective')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 transition cursor-pointer"
            >
              <History className="w-4 h-4 text-amber-400" />
              Dersler Kütüphanesi
            </button>
          </div>
        </div>
      </div>

      {/* Real Application Metrics Derived from Data */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Kulüp Hafızası</span>
            <Database className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{documents.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Kayıtlı Doküman & Karar</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Üretilen Fikirler</span>
            <Lightbulb className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 font-mono">{ideas.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">IdeaForge Havuzu</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Değerlendirilen</span>
            <Scale className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-300 font-mono">{evaluations.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">IdeaScore Analizi</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Geçmiş Projeler</span>
            <History className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-indigo-300 font-mono">{projects.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Retrospektif Kaydı</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Kurumsal Dersler</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">{lessons.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Tekrar Edilebilir İlke</div>
        </div>
      </div>

      {/* Main Grid: Pipelines, High Scoring, and Recents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Highest Scoring Ideas & Active Pipeline */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Scoring Ideas */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  En Yüksek Skorlu Proje Fikirleri
                </h3>
                <p className="text-xs text-slate-400">
                  IdeaScore 5 kriterli şeffaf değerlendirmesinde öne çıkanlar.
                </p>
              </div>
              <button
                onClick={() => onNavigate('ideascore')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1 cursor-pointer"
              >
                Tümü <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {highestScoring.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 bg-slate-950/60 rounded-2xl">
                  Henüz değerlendirilmiş fikir bulunmuyor.
                </div>
              ) : (
                highestScoring.map((item) => {
                  const idea = ideas.find(i => i.id === item.ideaId);
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-white truncate">
                            {item.ideaName}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            item.recommendation === 'Strong Candidate'
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          }`}>
                            {item.recommendation}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 truncate">
                          {idea?.pitch || 'Değerlendirilmiş kulüp projesi'}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-lg font-black font-mono text-indigo-400">
                            {item.overallScore}
                          </div>
                          <div className="text-[10px] text-slate-400">/ 100 Puan</div>
                        </div>

                        {idea && (
                          <button
                            onClick={() => onSelectIdeaForBlueprint(idea)}
                            className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition cursor-pointer"
                          >
                            Planı Aç
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Project Pipeline Visualizer */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-base font-bold text-white mb-2">
              Proje ve Karar Akışı Hattı (Pipeline)
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Kulüp hafızasından çalışan MVP'ye uzanan 4 adımlı kurumsal süreç:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-cyan-400 font-bold uppercase">1. Adım</span>
                <div className="font-bold text-white">Hafıza & Not</div>
                <div className="text-[11px] text-slate-400">{documents.length} Doküman</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase">2. Adım</span>
                <div className="font-bold text-white">IdeaForge</div>
                <div className="text-[11px] text-slate-400">{ideas.length} Fikir</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-purple-400 font-bold uppercase">3. Adım</span>
                <div className="font-bold text-white">IdeaScore</div>
                <div className="text-[11px] text-slate-400">{evaluations.length} Puanlama</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase">4. Adım</span>
                <div className="font-bold text-white">Blueprint</div>
                <div className="text-[11px] text-slate-400">Çalışan MVP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Historical Lessons Highlight & Recent Documents */}
        <div className="lg:col-span-5 space-y-6">
          {/* Institutional Learning Highlights */}
          <div className="bg-gradient-to-b from-amber-950/30 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Öne Çıkan Kurumsal Dersler
                </h3>
              </div>
              <button
                onClick={() => onNavigate('retrospective')}
                className="text-xs text-amber-400 hover:underline font-semibold cursor-pointer"
              >
                Tümünü Gör
              </button>
            </div>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Geçmiş kulüp projelerindeki hatalardan ve başarılardan derlenen çıkarımlar:
            </p>

            <div className="space-y-3">
              {lessons.slice(0, 3).map((l) => (
                <div key={l.id} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    {l.title}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {l.lesson}
                  </p>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Kaynak: {l.projectName}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Documents */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                Son Eklenen Dokümanlar
              </h3>
              <button
                onClick={() => onNavigate('clubmind')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
              >
                Hepsini Aç
              </button>
            </div>

            <div className="space-y-2.5">
              {recentDocs.map((doc) => (
                <div key={doc.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white truncate max-w-[200px]">
                      {doc.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono">
                      {doc.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {doc.content.substring(0, 70)}...
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
