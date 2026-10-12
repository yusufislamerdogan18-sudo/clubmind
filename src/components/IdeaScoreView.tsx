import React, { useState } from 'react';
import { 
  Scale, Sparkles, AlertTriangle, CheckCircle2, 
  Columns, ArrowRight, ShieldCheck, Zap, FileCode2,
  TrendingUp, Award, Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  ProjectIdea, IdeaEvaluation, HistoricalProject, 
  LessonLearned, CriteriaWeights, CriteriaScores 
} from '../types';
import { AIService } from '../services/ai';

interface IdeaScoreViewProps {
  ideas: ProjectIdea[];
  evaluations: IdeaEvaluation[];
  projects: HistoricalProject[];
  lessons: LessonLearned[];
  weights: CriteriaWeights;
  onSaveEvaluation: (evaluation: Omit<IdeaEvaluation, 'id' | 'evaluatedAt'>) => void;
  onSelectForBlueprint: (idea: ProjectIdea) => void;
  preselectedIdea?: ProjectIdea | null;
  isDemoMode: boolean;
}

export default function IdeaScoreView({
  ideas,
  evaluations,
  projects,
  lessons,
  weights,
  onSaveEvaluation,
  onSelectForBlueprint,
  preselectedIdea,
  isDemoMode,
}: IdeaScoreViewProps) {
  const [selectedIdeaId, setSelectedIdeaId] = useState<string>(
    preselectedIdea?.id || (ideas[0]?.id || '')
  );
  const [loading, setLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [compareIdeaId1, setCompareIdeaId1] = useState<string>(ideas[0]?.id || '');
  const [compareIdeaId2, setCompareIdeaId2] = useState<string>(ideas[1]?.id || ideas[0]?.id || '');

  const activeIdea = ideas.find(i => i.id === selectedIdeaId);
  const existingEval = evaluations.find(e => e.ideaId === selectedIdeaId);

  const handleEvaluate = async () => {
    if (!activeIdea) return;
    setLoading(true);

    try {
      const evalRes = await AIService.evaluateIdea(activeIdea, weights, projects, lessons);
      onSaveEvaluation({
        ideaId: activeIdea.id,
        ideaName: activeIdea.name,
        overallScore: evalRes.overallScore,
        criteriaScores: evalRes.criteriaScores,
        criteriaReasoning: evalRes.criteriaReasoning,
        strengths: evalRes.strengths,
        weaknesses: evalRes.weaknesses,
        implementationRisks: evalRes.implementationRisks,
        recommendedImprovements: evalRes.recommendedImprovements,
        recommendation: evalRes.recommendation,
        historicalLessonsAnalysis: evalRes.historicalLessonsAnalysis,
        isSimulated: isDemoMode,
      });

      // Trigger Web3 celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#6366f1', '#a855f7'],
        });
      } catch (e) {
        // silent fallback
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const eval1 = evaluations.find(e => e.ideaId === compareIdeaId1);
  const eval2 = evaluations.find(e => e.ideaId === compareIdeaId2);
  const idea1 = ideas.find(i => i.id === compareIdeaId1);
  const idea2 = ideas.find(i => i.id === compareIdeaId2);

  // SVG Gauge calculations
  const score = existingEval ? Math.round(existingEval.overallScore) : 0;
  const strokeDashoffset = 314 - (314 * score) / 100; // circumference ~ 2 * pi * 50 = 314

  const criteriaList: { key: keyof CriteriaScores; label: string; weight: number; icon: string }[] = [
    { key: 'novelty', label: 'İnovasyon & Özgünlük', weight: weights.novelty || 25, icon: '🚀' },
    { key: 'feasibility', label: 'Yapılabilirlik (48s)', weight: weights.feasibility || 20, icon: '🛠️' },
    { key: 'clubValue', label: 'PRU Kulüp & Liman Uyumu', weight: weights.clubValue || 30, icon: '⚓' },
    { key: 'technicalAccessibility', label: 'Ekip Yetkinliği', weight: weights.technicalAccessibility || 15, icon: '👥' },
    { key: 'blockchainRelevance', label: 'Jüri & Web3 Etkisi', weight: weights.blockchainRelevance || 10, icon: '🏆' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
            <Scale className="w-3 h-3" />
            IdeaScore 5.0 Decision Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            5 Kriterli Puanlama & Jüri Analizi
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Önyargısız yapay zeka jüri motoruyla projeleri derecelendirin ve riski minimize edin.
          </p>
        </div>

        <button
          onClick={() => setShowComparison(!showComparison)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 font-semibold text-xs border border-white/[0.08] transition cursor-pointer self-start sm:self-auto"
        >
          <Columns className="w-4 h-4 text-cyan-400" />
          {showComparison ? 'Tekli Analize Dön' : 'Yan Yana Kıyasla'}
        </button>
      </div>

      {/* Comparison View */}
      {showComparison ? (
        <div className="glass-card rounded-3xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-xs mb-1.5 font-semibold">1. Fikir:</label>
              <select
                value={compareIdeaId1}
                onChange={(e) => setCompareIdeaId1(e.target.value)}
                className="w-full bg-slate-950/80 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white"
              >
                {ideas.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-slate-400 text-xs mb-1.5 font-semibold">2. Fikir:</label>
              <select
                value={compareIdeaId2}
                onChange={(e) => setCompareIdeaId2(e.target.value)}
                className="w-full bg-slate-950/80 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white"
              >
                {ideas.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: idea1, evalData: eval1 },
              { id: idea2, evalData: eval2 }
            ].map((col, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-black text-white text-base">{col.id?.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{col.id?.pitch}</p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-3xl font-black font-mono text-cyan-400">
                      {col.evalData ? col.evalData.overallScore.toFixed(1) : '—'}
                    </span>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">/ 100</span>
                  </div>
                </div>

                {col.evalData ? (
                  <div className="space-y-2.5 pt-3 border-t border-white/[0.06] text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">İnovasyon:</span>
                      <span className="font-mono text-white font-bold">{col.evalData.criteriaScores.novelty} / 100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Yapılabilirlik:</span>
                      <span className="font-mono text-white font-bold">{col.evalData.criteriaScores.feasibility} / 100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">PRU Uyumu:</span>
                      <span className="font-mono text-white font-bold">{col.evalData.criteriaScores.clubValue} / 100</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                      ✓ {col.evalData.strengths[0]}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 py-6 text-center font-mono">Puanlanmadı</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Single Analysis View */
        <div className="space-y-6">
          {/* Quick Idea Picker Bar */}
          <div className="glass-card rounded-2xl p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-xs text-slate-400 font-semibold shrink-0">Hedef Proje:</span>
              <select
                value={selectedIdeaId}
                onChange={(e) => setSelectedIdeaId(e.target.value)}
                className="w-full sm:max-w-md bg-white/[0.04] border border-white/[0.08] text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-400"
              >
                {ideas.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>

            <button
              onClick={handleEvaluate}
              disabled={loading || !activeIdea}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  Hesaplanıyor...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  {existingEval ? 'Yeniden Puanla' : 'IdeaScore ile Puanla'}
                </>
              )}
            </button>
          </div>

          {/* Results Grid */}
          {existingEval && activeIdea ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Visual Score Gauge Card */}
              <div className="glass-card rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4">
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {existingEval.recommendation || '🔥 Güçlü Aday'}
                </span>

                {/* SVG Gauge */}
                <div className="relative w-44 h-44 flex items-center justify-center my-2">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="url(#scoreGradient)"
                      strokeWidth="10"
                      strokeDasharray="314"
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-black text-white font-mono">
                      {existingEval.overallScore.toFixed(1)}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      / 100
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">{activeIdea.name}</h3>
                  <p className="text-xs text-slate-400 max-w-xs">{activeIdea.pitch}</p>
                </div>

                <button
                  onClick={() => onSelectForBlueprint(activeIdea)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <FileCode2 className="w-4 h-4" />
                  Blueprint'e Dönüştür
                </button>
              </div>

              {/* Right 2 Columns: 5 Criteria Bars & Key Insights */}
              <div className="lg:col-span-2 space-y-6">
                {/* 5 Criteria Sliders */}
                <div className="glass-card rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-white">5 Kriter Ağırlık Dağılımı</h3>
                    <span className="text-[11px] font-mono text-cyan-400 font-bold">100 Puan Skalası</span>
                  </div>

                  <div className="space-y-3">
                    {criteriaList.map((crit) => {
                      const scoreVal = (existingEval.criteriaScores as any)[crit.key] || 80;
                      return (
                        <div key={String(crit.key)} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                              <span>{crit.icon}</span>
                              {crit.label}
                              <span className="text-[10px] text-slate-500 font-mono">(%{crit.weight})</span>
                            </span>
                            <span className="font-mono font-bold text-cyan-400">{scoreVal} / 100</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-700"
                              style={{ width: `${scoreVal}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Strengths & Lessons Mitigated */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card rounded-2xl p-4 space-y-2 border-emerald-500/20">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      Güçlü Yönler
                    </div>
                    <div className="space-y-1.5">
                      {existingEval.strengths.slice(0, 3).map((st, i) => (
                        <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <span className="text-emerald-400">•</span>
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-4 space-y-2 border-amber-500/20">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <AlertTriangle className="w-4 h-4" />
                      Önlenen Hatalar
                    </div>
                    <div className="space-y-1.5">
                      {existingEval.historicalLessonsAnalysis?.specificMitigations?.slice(0, 2).map((ls: string, i: number) => (
                        <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <span className="text-amber-400">•</span>
                          <span>{ls}</span>
                        </div>
                      )) || (
                        <div className="text-xs text-slate-400">Geçmiş proje riskleri kontrol edildi.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-12 text-center space-y-3">
              <Scale className="w-10 h-10 text-cyan-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Henüz Puanlama Yapılmadı</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Yukarıdaki "IdeaScore ile Puanla" butonuna tıklayarak yapay zeka jüri değerlendirmesini başlatın.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
