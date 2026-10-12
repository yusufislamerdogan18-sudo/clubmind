import React, { useState } from 'react';
import { 
  Lightbulb, Sparkles, Scale, RefreshCw, Trash2, Edit3, Plus, 
  CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Layers, Clock, Cpu 
} from 'lucide-react';
import { ProjectIdea, ClubDocument, LessonLearned } from '../types';
import { AIService, IdeaGenerationConfig } from '../services/ai';

interface IdeaForgeViewProps {
  ideas: ProjectIdea[];
  documents: ClubDocument[];
  lessons: LessonLearned[];
  onAddIdea: (idea: Omit<ProjectIdea, 'id' | 'createdAt'>) => void;
  onDeleteIdea: (id: string) => void;
  onSendToScore: (idea: ProjectIdea) => void;
  isDemoMode: boolean;
}

export default function IdeaForgeView({
  ideas,
  documents,
  lessons,
  onAddIdea,
  onDeleteIdea,
  onSendToScore,
  isDemoMode,
}: IdeaForgeViewProps) {
  // Generation configuration
  const [theme, setTheme] = useState('Web3 & Kulüp Operasyonları');
  const [targetAudience, setTargetAudience] = useState('Piri Reis Üniversitesi Öğrencileri ve Kulüp');
  const [developmentTime, setDevelopmentTime] = useState('2 hafta (Hackathon)');
  const [teamSkill, setTeamSkill] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [primaryGoal, setPrimaryGoal] = useState('Kulüp içi işleyişi kolaylaştırmak ve çalışan MVP üretmek');
  const [keywords, setKeywords] = useState('şeffaflık, hafif mimari, sıfır gaz maliyeti');

  const [loading, setLoading] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  // Manual entry state
  const [manualName, setManualName] = useState('');
  const [manualPitch, setManualPitch] = useState('');
  const [manualProblem, setManualProblem] = useState('');
  const [manualSolution, setManualSolution] = useState('');
  const [manualTech, setManualTech] = useState('');
  const [manualBlockchain, setManualBlockchain] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const config: IdeaGenerationConfig = {
        theme,
        targetAudience,
        developmentTime,
        teamSkill,
        primaryGoal,
        keywords,
      };

      const res = await AIService.generateIdeas(config, documents, lessons);
      res.ideas.forEach((idea) => {
        onAddIdea({
          name: idea.name,
          pitch: idea.pitch,
          problem: idea.problem,
          solution: idea.solution,
          targetAudience: idea.targetAudience,
          whyItMatters: idea.whyItMatters,
          mvpFeatures: idea.mvpFeatures,
          difficulty: idea.difficulty,
          estimatedTime: idea.estimatedTime,
          techStack: idea.techStack,
          potentialRisks: idea.potentialRisks,
          isBlockchainNecessary: idea.isBlockchainNecessary,
          blockchainJustification: idea.blockchainJustification,
          avoidedPastPitfalls: idea.avoidedPastPitfalls,
          builtOnPastSuccesses: idea.builtOnPastSuccesses,
        });
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualPitch) return;

    onAddIdea({
      name: manualName,
      pitch: manualPitch,
      problem: manualProblem || 'Kulüp ihtiyacı',
      solution: manualSolution || manualPitch,
      targetAudience,
      whyItMatters: 'Kulüp üretkenliği ve deneyimi.',
      mvpFeatures: ['Temel Arayüz', 'Kayıt ve Doğrulama'],
      difficulty: teamSkill,
      estimatedTime: developmentTime,
      techStack: manualTech ? manualTech.split(',').map(t => t.trim()) : ['React', 'TypeScript'],
      potentialRisks: ['Zaman yönetimi'],
      isBlockchainNecessary: manualBlockchain,
      blockchainJustification: manualBlockchain ? 'Doğrulanabilir kayıt için onchain katmanı.' : 'MVP aşamasında blokzincir zorunlu değildir.',
      isCustom: true,
    });

    setManualName('');
    setManualPitch('');
    setManualProblem('');
    setManualSolution('');
    setShowManualModal(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
              <Lightbulb className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Yapay Zeka Fikir Üretim Laboratuvarı
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            IdeaForge Fikir Çalışma Alanı
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kulübün hedeflerini ve geçmiş projelerin kurumsal derslerini harmanlayarak gerçekçi, kazanma odaklı MVP fikirleri üretin.
          </p>
        </div>

        <button
          onClick={() => setShowManualModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          Kendi Fikrini Gir
        </button>
      </div>

      {/* Generator Configuration Panel */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white">
              Fikir Üretim Parametreleri
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {isDemoMode ? 'Demo Modu (Ders Destekli)' : 'Canlı LLM'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">Tema / Odak Alanı</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="Web3 & Kulüp Operasyonları">Web3 & Kulüp Operasyonları</option>
              <option value="Doğrulanabilir İtibar & SBT">Doğrulanabilir İtibar & SBT (Sertifikalar)</option>
              <option value="Şeffaf Finans & Kasa">Şeffaf Finans & Kulüp Kasası</option>
              <option value="Web3 Eğitim & Onboarding">Web3 Eğitim & Yeni Üye Onboarding</option>
              <option value="DAO & Yönetişim">DAO Karar Alma & Yönetişim</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Hedef Kitle</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Geliştirme Süresi</label>
            <select
              value={developmentTime}
              onChange={(e) => setDevelopmentTime(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
            >
              <option value="48 saat (Hackathon)">48 saat (Hackathon Sprint)</option>
              <option value="1-2 hafta">1-2 hafta (Dönem İçi MVP)</option>
              <option value="1 ay">1 ay (Büyük Proje)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Ekip Teknik Seviyesi</label>
            <select
              value={teamSkill}
              onChange={(e) => setTeamSkill(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
            >
              <option value="Beginner">Başlangıç (HTML/React temel)</option>
              <option value="Intermediate">Orta Seviye (React, TS, Temel Solidity)</option>
              <option value="Advanced">İleri Seviye (Full-stack, EVM, DeFi)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-400 font-medium mb-1">Ana Amaç & Kısıtlar</label>
            <input
              type="text"
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Generate Action Button */}
        <div className="pt-2 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            💡 Yapay zeka geçmiş 3 projenin retrospektif derslerini inceleyerek riskleri eler.
          </p>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                Dersler Taranıyor & Fikirler Üretiliyor...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Fikirleri Üret (Generate Ideas)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            Üretilen Fikir Havuzu ({ideas.length})
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Beğendiğiniz fikri doğrudan IdeaScore'a gönderebilirsiniz.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Card Top */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-extrabold text-white">
                      {idea.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {idea.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {idea.estimatedTime}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    idea.isBlockchainNecessary
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {idea.isBlockchainNecessary ? 'Onchain Katmanı Var' : 'Hafif Web2 / Gasless'}
                  </span>
                </div>

                {/* Pitch & Problem */}
                <div className="text-xs space-y-2">
                  <div className="text-indigo-300 font-medium italic bg-indigo-950/20 p-2.5 rounded-xl border border-indigo-500/20">
                    "{idea.pitch}"
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400 font-bold block mb-0.5">Çözülen Problem:</span>
                      <span className="text-slate-300">{idea.problem}</span>
                    </div>
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-emerald-400 font-bold block mb-0.5">Çözüm Yaklaşımı:</span>
                      <span className="text-slate-300">{idea.solution}</span>
                    </div>
                  </div>
                </div>

                {/* MVP Scope Features */}
                <div className="text-xs space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Önerilen MVP Özellikleri:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {idea.mvpFeatures.map((f, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Past Pitfalls Avoided (Retrospective Integration Highlight) */}
                {idea.avoidedPastPitfalls && idea.avoidedPastPitfalls.length > 0 && (
                  <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-[11px] space-y-1">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5 text-[10px] uppercase">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Geçmiş Proje Hatalarından Çıkarılan Ders:
                    </div>
                    <p className="text-slate-300 leading-snug">
                      {idea.avoidedPastPitfalls[0]}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => onDeleteIdea(idea.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
                  title="Fikri Sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSendToScore(idea)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition shadow-md shadow-indigo-600/25 cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" />
                  IdeaScore'da Değerlendir & Puanla
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Entry Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Özel Fikir Girişi Yap</h3>

            <form onSubmit={handleManualSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Proje Adı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: PRU CampusVote"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Tek Cümlelik Pitch *</label>
                <input
                  type="text"
                  required
                  placeholder="Öğrencilerin kulüp kararlarında oy kullandığı gazsız oylama platformu..."
                  value={manualPitch}
                  onChange={(e) => setManualPitch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Çözülen Problem</label>
                <textarea
                  rows={2}
                  placeholder="Kulüpteki hangi sorun çözülüyor..."
                  value={manualProblem}
                  onChange={(e) => setManualProblem(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="bcReq"
                  checked={manualBlockchain}
                  onChange={(e) => setManualBlockchain(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-0"
                />
                <label htmlFor="bcReq" className="text-slate-300 font-medium">
                  Bu projede blokzincir katmanı şarttır (SBT, şeffaflık vb.)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 text-white font-bold"
                >
                  Fikri Havuza Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
