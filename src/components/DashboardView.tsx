import React from 'react';
import { 
  Database, Lightbulb, Scale, History, Plus, 
  ArrowRight, Sparkles, CheckCircle2, TrendingUp, AlertTriangle, BookOpen, Layers, Play 
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
  const highestScoring = [...evaluations].sort((a, b) => b.overallScore - a.overallScore).slice(0, 3);
  const recentDocs = [...documents].slice(0, 3);

  const steps = [
    { num: '01', title: 'Hafıza & Notlar', desc: 'Kararları ve toplantı tutanaklarını kaydet', tab: 'clubmind' as NavTab, icon: Database },
    { num: '02', title: 'Geçmiş Dersler', desc: 'Eski hataları ve başarıları analiz et', tab: 'retrospective' as NavTab, icon: History },
    { num: '03', title: 'Fikir & Puanlama', desc: 'Derslere dayalı fikir üret ve 5 kriterle puanla', tab: 'ideascore' as NavTab, icon: Scale },
    { num: '04', title: 'MVP Planı & Sunum', desc: 'Görev listesi ve 2.5 dk jüri senaryosunu al', tab: 'blueprint' as NavTab, icon: Play },
  ];

  return (
    <div className="space-y-8 animate-slide-up max-w-6xl mx-auto">
      {/* Sleek Hero Welcome */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-indigo-950/40 border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Piri Reis Üniversitesi Blockchain Kulübü
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ClubMind Karar Destek Portalı
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kulüp hafızasını koruyun, geçmiş proje hatalarından ders çıkarın ve en yüksek puanlı fikirleri tek tıkla çalışan bir MVP planına dönüştürün.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate('ideaforge')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <Lightbulb className="w-4 h-4" />
              Yeni Fikir Üret
            </button>
            <button
              onClick={() => onNavigate('clubmind')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700/80 transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-cyan-400" />
              Hafızaya Not Ekle
            </button>
          </div>
        </div>
      </div>

      {/* "İlk Bakışta Nasıl Çalışır?" 4-Step Interactive Flow */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            ClubMind 4 Adımlı Karar Akışı
          </span>
          <span className="text-[11px] text-slate-400">
            Adımlara tıklayarak doğrudan o modüle geçebilirsiniz
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                onClick={() => onNavigate(st.tab)}
                className="hover-card group p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                      {st.num}
                    </span>
                    <Icon className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                    {st.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {st.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/40 flex items-center gap-1 text-[11px] font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Modüle Git</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Metrics (Sade ve Temiz) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: 'Hafıza Dokümanı', val: documents.length, icon: Database, color: 'text-cyan-400' },
          { label: 'Üretilen Fikir', val: ideas.length, icon: Lightbulb, color: 'text-amber-400' },
          { label: 'Puanlanan Proje', val: evaluations.length, icon: Scale, color: 'text-purple-400' },
          { label: 'Geçmiş Proje', val: projects.length, icon: History, color: 'text-indigo-400' },
          { label: 'Kurumsal İlke', val: lessons.length, icon: BookOpen, color: 'text-emerald-400' },
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="hover-card p-4 rounded-2xl bg-slate-900/50 border border-slate-800/70">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>{m.label}</span>
                <Icon className={`w-3.5 h-3.5 ${m.color}`} />
              </div>
              <div className="text-2xl font-black text-white font-mono">{m.val}</div>
            </div>
          );
        })}
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Highest Scoring Ideas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  En Yüksek Skorlu Fikirler
                </h3>
                <p className="text-xs text-slate-400">
                  IdeaScore 5 kriterli analizinde öne çıkan adaylar:
                </p>
              </div>
              <button
                onClick={() => onNavigate('ideascore')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
              >
                Tümü →
              </button>
            </div>

            <div className="space-y-3">
              {highestScoring.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  Henüz puanlanmış fikir bulunmuyor.
                </div>
              ) : (
                highestScoring.map((item) => {
                  const idea = ideas.find(i => i.id === item.ideaId);
                  return (
                    <div
                      key={item.id}
                      className="hover-card p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-white truncate">
                            {item.ideaName}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            {item.recommendation}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 truncate">
                          {idea?.pitch || 'Kulüp projesi'}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-lg font-black font-mono text-indigo-400">
                            {item.overallScore}
                          </div>
                          <div className="text-[10px] text-slate-400">/ 100</div>
                        </div>

                        {idea && (
                          <button
                            onClick={() => onSelectIdeaForBlueprint(idea)}
                            className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition cursor-pointer"
                          >
                            Planı Gör
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Lessons Learned Highlight */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-base text-white">
                  Öne Çıkan Kurumsal Dersler
                </h3>
              </div>
              <button
                onClick={() => onNavigate('retrospective')}
                className="text-xs text-amber-400 hover:underline font-semibold cursor-pointer"
              >
                Dersler →
              </button>
            </div>

            <div className="space-y-3">
              {lessons.slice(0, 3).map((l) => (
                <div key={l.id} className="hover-card p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
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
        </div>
      </div>
    </div>
  );
}
