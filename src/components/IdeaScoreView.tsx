import React, { useState } from 'react';
import { 
  Scale, Sparkles, AlertTriangle, CheckCircle2, XCircle, ArrowRight, 
  Columns, ShieldCheck, TrendingUp, History, Info, FileCode2 
} from 'lucide-react';
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getRecBadge = (rec: string) => {
    switch (rec) {
      case 'Strong Candidate':
        return <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">GÜÇLÜ ADAY (ÖNERİLİR)</span>;
      case 'Promising with Changes':
        return <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">DEĞİŞİKLİKLE UYGULANABİLİR</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">YENİDEN PLANLANMALI</span>;
    }
  };

  // Compare ideas
  const eval1 = evaluations.find(e => e.ideaId === compareIdeaId1);
  const eval2 = evaluations.find(e => e.ideaId === compareIdeaId2);
  const idea1 = ideas.find(i => i.id === compareIdeaId1);
  const idea2 = ideas.find(i => i.id === compareIdeaId2);

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
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
            Kulübe fayda (%{weights.clubValue}), özgünlük (%{weights.novelty}), uygulanabilirlik (%{weights.feasibility}), teknik erişilebilirlik (%{weights.technicalAccessibility}) ve anlamlı blokzincir kullanımı (%{weights.blockchainRelevance}).
          </p>
        </div>

        <button
          onClick={() => setShowComparison(!showComparison)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition cursor-pointer self-start sm:self-auto"
        >
          <Columns className="w-4 h-4 text-purple-400" />
          {showComparison ? 'Tekli Analize Dön' : 'Yan Yana Kıyasla (Compare)'}
        </button>
      </div>

      {/* SIDE-BY-SIDE COMPARISON VIEW */}
      {showComparison ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Columns className="w-5 h-5 text-purple-400" />
                İki Proje Fikrinin Yan Yana Kıyaslaması
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Puanlar, kriter dağılımları ve ödünleşimler (trade-offs) doğrudan karşılaştırılır.
              </p>
            </div>
          </div>

          {/* Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-400 font-semibold text-xs mb-1">1. Fikri Seç:</label>
              <select
                value={compareIdeaId1}
                onChange={(e) => setCompareIdeaId1(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              >
                {ideas.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold text-xs mb-1">2. Fikri Seç:</label>
              <select
                value={compareIdeaId2}
                onChange={(e) => setCompareIdeaId2(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              >
                {ideas.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Column 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{idea1?.name}</h3>
                  <div className="text-xs text-indigo-300 italic mt-0.5">"{idea1?.pitch}"</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black font-mono text-purple-400">
                    {eval1 ? eval1.overallScore : 'Puanlanmadı'}
                  </div>
                  <div className="text-[10px] text-slate-400">Genel Skor</div>
                </div>
              </div>

              {eval1 ? (
                <div className="space-y-3 text-xs">
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <div className="flex justify-between"><span>Kulübe Fayda (%{weights.clubValue}):</span><span className="font-mono font-bold text-white">{eval1.criteriaScores.clubValue}/100</span></div>
                    <div className="flex justify-between"><span>Özgünlük (%{weights.novelty}):</span><span className="font-mono font-bold text-white">{eval1.criteriaScores.novelty}/100</span></div>
                    <div className="flex justify-between"><span>Uygulanabilirlik (%{weights.feasibility}):</span><span className="font-mono font-bold text-white">{eval1.criteriaScores.feasibility}/100</span></div>
                    <div className="flex justify-between"><span>Teknik Erişilebilirlik (%{weights.technicalAccessibility}):</span><span className="font-mono font-bold text-white">{eval1.criteriaScores.technicalAccessibility}/100</span></div>
                    <div className="flex justify-between"><span>Blokzincir Uygunluğu (%{weights.blockchainRelevance}):</span><span className="font-mono font-bold text-white">{eval1.criteriaScores.blockchainRelevance}/100</span></div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold">Öne Çıkan Güçlü Yön:</span>
                    <p className="text-[11px] text-slate-300">{eval1.strengths[0]}</p>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 py-6 text-center">
                  Bu fikir henüz değerlendirilmedi. Lütfen önce tekli modda değerlendirin.
                </div>
              )}
            </div>

            {/* Column 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{idea2?.name}</h3>
                  <div className="text-xs text-indigo-300 italic mt-0.5">"{idea2?.pitch}"</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black font-mono text-purple-400">
                    {eval2 ? eval2.overallScore : 'Puanlanmadı'}
                  </div>
                  <div className="text-[10px] text-slate-400">Genel Skor</div>
                </div>
              </div>

              {eval2 ? (
                <div className="space-y-3 text-xs">
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <div className="flex justify-between"><span>Kulübe Fayda (%{weights.clubValue}):</span><span className="font-mono font-bold text-white">{eval2.criteriaScores.clubValue}/100</span></div>
                    <div className="flex justify-between"><span>Özgünlük (%{weights.novelty}):</span><span className="font-mono font-bold text-white">{eval2.criteriaScores.novelty}/100</span></div>
                    <div className="flex justify-between"><span>Uygulanabilirlik (%{weights.feasibility}):</span><span className="font-mono font-bold text-white">{eval2.criteriaScores.feasibility}/100</span></div>
                    <div className="flex justify-between"><span>Teknik Erişilebilirlik (%{weights.technicalAccessibility}):</span><span className="font-mono font-bold text-white">{eval2.criteriaScores.technicalAccessibility}/100</span></div>
                    <div className="flex justify-between"><span>Blokzincir Uygunluğu (%{weights.blockchainRelevance}):</span><span className="font-mono font-bold text-white">{eval2.criteriaScores.blockchainRelevance}/100</span></div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold">Öne Çıkan Güçlü Yön:</span>
                    <p className="text-[11px] text-slate-300">{eval2.strengths[0]}</p>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 py-6 text-center">
                  Bu fikir henüz değerlendirilmedi. Lütfen önce tekli modda değerlendirin.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* SINGLE EVALUATION VIEW */
        <div className="space-y-6">
          {/* Idea Selector Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-xs text-slate-400 font-semibold shrink-0">Değerlendirilecek Fikir:</span>
              <select
                value={selectedIdeaId}
                onChange={(e) => setSelectedIdeaId(e.target.value)}
                className="w-full sm:max-w-md bg-slate-950 border border-slate-700 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                {ideas.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleEvaluate}
              disabled={loading || !activeIdea}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Puanlanıyor...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {existingEval ? 'Yeniden Puanla & Analiz Et' : 'IdeaScore ile Değerlendir'}
                </>
              )}
            </button>
          </div>

          {/* Evaluation Results */}
          {existingEval && activeIdea ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Score Hero Card */}
              <div className="bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getRecBadge(existingEval.recommendation)}
                      <span className="text-xs text-slate-400 font-mono">
                        Son Analiz: {new Date(existingEval.evaluatedAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {existingEval.ideaName}
                    </h2>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                      {activeIdea.pitch}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 shrink-0">
                    <div className="text-center">
                      <div className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${getScoreColor(existingEval.overallScore)}`}>
                        {existingEval.overallScore}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                        / 100 Ağırlıklı Toplam Skor
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disclaimer Note */}
                <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5 italic">
                  <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  Bu skor bir tahmindir; başarı garantisi değildir. Projenin ekip motivasyonu ve kullanıcı doğrulaması esastır.
                </div>
              </div>

              {/* 5 Criteria Breakdown */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-purple-400" />
                  5 Kriterli Detaylı Puan Dağılımı ve Gerekçeler
                </h3>

                <div className="space-y-4">
                  {[
                    { key: 'clubValue', name: '1. Kulübe Fayda', weight: weights.clubValue, score: existingEval.criteriaScores.clubValue, reason: existingEval.criteriaReasoning.clubValue },
                    { key: 'novelty', name: '2. Özgünlük ve Farklılaşma', weight: weights.novelty, score: existingEval.criteriaScores.novelty, reason: existingEval.criteriaReasoning.novelty },
                    { key: 'feasibility', name: '3. Süre İçi Uygulanabilirlik', weight: weights.feasibility, score: existingEval.criteriaScores.feasibility, reason: existingEval.criteriaReasoning.feasibility },
                    { key: 'technicalAccessibility', name: '4. Ekip İçin Teknik Erişilebilirlik', weight: weights.technicalAccessibility, score: existingEval.criteriaScores.technicalAccessibility, reason: existingEval.criteriaReasoning.technicalAccessibility },
                    { key: 'blockchainRelevance', name: '5. Anlamlı Blokzincir Kullanımı', weight: weights.blockchainRelevance, score: existingEval.criteriaScores.blockchainRelevance, reason: existingEval.criteriaReasoning.blockchainRelevance },
                  ].map((c) => (
                    <div key={c.key} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{c.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            Ağırlık: %{c.weight}
                          </span>
                        </div>
                        <span className={`text-base font-mono font-bold ${getScoreColor(c.score)}`}>
                          {c.score} / 100
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${c.score}%` }}
                        ></div>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                        {c.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths, Weaknesses, Risks, Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3">
                  <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5 uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    Temel Güçlü Yönler
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {existingEval.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3">
                  <div className="text-amber-400 font-bold text-xs flex items-center gap-1.5 uppercase">
                    <AlertTriangle className="w-4 h-4" />
                    Zayıf Yönler & Uygulama Riskleri
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {existingEval.weaknesses.map((w, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                    {existingEval.implementationRisks.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400">⚠️</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* HISTORICAL LESSONS & RISK ANALYSIS SECTION (Special Requirement) */}
              <div className="bg-gradient-to-b from-amber-950/30 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    Kurumsal Geçmiş Proje & Risk Analizi (Historical Lessons Analysis)
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  IdeaScore, kulübün geçmiş tamamlanan veya yarım kalan projelerindeki deneyimlerini bu fikre uyarlayarak öngörülen riskleri raporlar:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <span className="text-[10px] text-amber-400 uppercase font-bold">
                      Tekrarlayan Hata & Tuzak Uyarıları:
                    </span>
                    <ul className="space-y-1.5 text-slate-300 text-[11px]">
                      {existingEval.historicalLessonsAnalysis.recurringProblemsWarning.map((warn, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-400">✖</span>
                          <span>{warn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold">
                      Önerilen Somut Risk Önlemleri (Mitigations):
                    </span>
                    <ul className="space-y-1.5 text-slate-300 text-[11px]">
                      {existingEval.historicalLessonsAnalysis.specificMitigations.map((mit, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400">✓</span>
                          <span>{mit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-mono pt-1">
                  Referans Geçmiş Projeler: {existingEval.historicalLessonsAnalysis.relevantProjects.join(', ')}
                </div>
              </div>

              {/* Action: Send to Blueprint */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Bu Fikri MVP Geliştirme Planına Dönüştür
                  </h4>
                  <p className="text-xs text-slate-400">
                    Project Blueprint motoru ile görev listesi, kilometre taşları ve sunum senaryosu oluşturun.
                  </p>
                </div>

                <button
                  onClick={() => onSelectForBlueprint(activeIdea)}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer shrink-0"
                >
                  <FileCode2 className="w-4 h-4" />
                  Project Blueprint'e Gönder
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-16 text-center space-y-3">
              <Scale className="w-8 h-8 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">Fikri Puanlamak İçin Butona Tıklayın</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Yukarıdaki menüden seçtiğiniz fikri IdeaScore kriterlerine ve kulübün kurumsal derslerine göre puanlamak için "IdeaScore ile Değerlendir" butonuna basın.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
