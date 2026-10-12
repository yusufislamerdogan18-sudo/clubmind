import React, { useState } from 'react';
import { 
  Scale, Sparkles, AlertTriangle, CheckCircle2, 
  Columns, ArrowRight, History, Info, FileCode2 
} from 'lucide-react';
import { 
  ProjectIdea, IdeaEvaluation, HistoricalProject, 
  LessonLearned, CriteriaWeights 
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

  return (
    <div className="space-y-8 animate-slide-up max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-purple-500/10 text-purple-400">
              <Scale className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              5 Kriterli Şeffaf Karar Motoru
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            IdeaScore Fikir Değerlendirme & Kıyaslama
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fikirleri şeffaf ağırlıklarla 100 üzerinden puanlayın, risklerini görün ve alternatiflerle yan yana kıyaslayın.
          </p>
        </div>

        <button
          onClick={() => setShowComparison(!showComparison)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700/80 transition cursor-pointer self-start sm:self-auto"
        >
          <Columns className="w-4 h-4 text-purple-400" />
          {showComparison ? 'Tekli Analize Dön' : 'Yan Yana Kıyasla (Compare)'}
        </button>
      </div>

      {/* COMPARISON VIEW */}
      {showComparison ? (
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 space-y-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-xs mb-1 font-semibold">1. Fikir:</label>
              <select
                value={compareIdeaId1}
                onChange={(e) => setCompareIdeaId1(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                {ideas.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 text-xs mb-1 font-semibold">2. Fikir:</label>
              <select
                value={compareIdeaId2}
                onChange={(e) => setCompareIdeaId2(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                {ideas.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {[
              { id: idea1, evalData: eval1 },
              { id: idea2, evalData: eval2 }
            ].map((col, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">{col.id?.name}</h3>
                    <p className="text-xs text-slate-400 italic mt-0.5">"{col.id?.pitch}"</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-2xl font-black font-mono text-purple-400">
                      {col.evalData ? col.evalData.overallScore : '—'}
                    </span>
                    <span className="text-[10px] text-slate-500 block">/ 100</span>
                  </div>
                </div>

                {col.evalData ? (
                  <div className="space-y-2 text-xs pt-2 border-t border-slate-800/60">
                    <div className="flex justify-between"><span>Kulübe Fayda (%{weights.clubValue}):</span><span className="font-mono text-white font-bold">{col.evalData.criteriaScores.clubValue}/100</span></div>
                    <div className="flex justify-between"><span>Özgünlük (%{weights.novelty}):</span><span className="font-mono text-white font-bold">{col.evalData.criteriaScores.novelty}/100</span></div>
                    <div className="flex justify-between"><span>Uygulanabilirlik (%{weights.feasibility}):</span><span className="font-mono text-white font-bold">{col.evalData.criteriaScores.feasibility}/100</span></div>
                    <div className="flex justify-between"><span>Teknik Erişilebilirlik (%{weights.technicalAccessibility}):</span><span className="font-mono text-white font-bold">{col.evalData.criteriaScores.technicalAccessibility}/100</span></div>
                    <div className="flex justify-between"><span>Blokzincir Uygunluğu (%{weights.blockchainRelevance}):</span><span className="font-mono text-white font-bold">{col.evalData.criteriaScores.blockchainRelevance}/100</span></div>
                    
                    <div className="pt-2 text-[11px] text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-emerald-400 font-bold block mb-0.5">Güçlü Yön:</span>
                      {col.evalData.strengths[0]}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 py-6 text-center">Bu fikir henüz puanlanmadı.</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* SINGLE EVALUATION VIEW */
        <div className="space-y-6">
          {/* Selector Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-xs text-slate-400 font-semibold shrink-0">Değerlendirilecek Fikir:</span>
              <select
                value={selectedIdeaId}
                onChange={(e) => setSelectedIdeaId(e.target.value)}
                className="w-full sm:max-w-md bg-slate-950 border border-slate-800 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
              >
                {ideas.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>

            <button
              onClick={handleEvaluate}
              disabled={loading || !activeIdea}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all duration-200 hover:scale-[1.02] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Puanlanıyor...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {existingEval ? 'Yeniden Puanla' : 'IdeaScore ile Puanla'}
                </>
              )}
            </button>
          </div>

          {/* Results Card */}
          {existingEval && activeIdea ? (
            <div className="space-y-6">
              {/* Score Header Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    {existingEval.recommendation}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                    {existingEval.ideaName}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    {activeIdea.pitch}
                  </p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center shrink-0 min-w-[140px]">
                  <div className="text-4xl font-black font-mono text-purple-400">
                    {existingEval.overallScore}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">
                    / 100 Ağırlıklı Skor
                  </div>
                </div>
              </div>

              {/* 5 Criteria Bars */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
                <h3 className="font-bold text-sm text-white">5 Şeffaf Kriter Dağılımı:</h3>
                
                <div className="space-y-3">
                  {[
                    { name: '1. Kulübe Fayda', weight: weights.clubValue, score: existingEval.criteriaScores.clubValue, reason: existingEval.criteriaReasoning.clubValue },
                    { name: '2. Özgünlük', weight: weights.novelty, score: existingEval.criteriaScores.novelty, reason: existingEval.criteriaReasoning.novelty },
                    { name: '3. Uygulanabilirlik', weight: weights.feasibility, score: existingEval.criteriaScores.feasibility, reason: existingEval.criteriaReasoning.feasibility },
                    { name: '4. Teknik Erişilebilirlik', weight: weights.technicalAccessibility, score: existingEval.criteriaScores.technicalAccessibility, reason: existingEval.criteriaReasoning.technicalAccessibility },
                    { name: '5. Blokzincir Uygunluğu', weight: weights.blockchainRelevance, score: existingEval.criteriaScores.blockchainRelevance, reason: existingEval.criteriaReasoning.blockchainRelevance },
                  ].map((c, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white">{c.name} (%{c.weight})</span>
                        <span className="font-mono font-bold text-purple-400">{c.score} / 100</span>
                      </div>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${c.score}%` }}></div>
                      </div>
                      <p className="text-[11px] text-slate-400">{c.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Historical Warning */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                  <div className="text-emerald-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Öne Çıkan Güçlü Yönler
                  </div>
                  <ul className="space-y-1 text-slate-300">
                    {existingEval.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                  <div className="text-amber-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
                    <History className="w-4 h-4" />
                    Geçmiş Projelerden Risk Uyarısı
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {existingEval.historicalLessonsAnalysis.recurringProblemsWarning[0]}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Bu Fikri MVP Planına Dönüştür</h4>
                  <p className="text-xs text-slate-400">Görev listesi ve 2.5 dakikalık sunum senaryosu hazırlayın.</p>
                </div>

                <button
                  onClick={() => onSelectForBlueprint(activeIdea)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all duration-200 hover:scale-[1.02] cursor-pointer shrink-0"
                >
                  <FileCode2 className="w-4 h-4" />
                  Blueprint Oluştur
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center text-xs text-slate-500 bg-slate-900/40 rounded-3xl border border-slate-800">
              Fikri değerlendirmek için yukarıdaki butona tıklayın.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
