import React, { useState } from 'react';
import { 
  Lightbulb, Sparkles, Scale, Trash2, Plus, 
  Clock, ArrowRight, Layers, ShieldCheck, CheckCircle2 
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
  const [theme, setTheme] = useState('Web3 & Kulüp Operasyonları');
  const [developmentTime, setDevelopmentTime] = useState('2 hafta (Hackathon)');
  const [teamSkill, setTeamSkill] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [loading, setLoading] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  // Manual entry
  const [manualName, setManualName] = useState('');
  const [manualPitch, setManualPitch] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const config: IdeaGenerationConfig = {
        theme,
        targetAudience: 'Piri Reis Üniversitesi Öğrencileri',
        developmentTime,
        teamSkill,
        primaryGoal: 'Kulüp içi işleyişi kolaylaştırmak ve çalışan MVP üretmek',
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
      problem: 'Kulüp içi ihtiyaç',
      solution: manualPitch,
      targetAudience: 'Kulüp üyeleri',
      whyItMatters: 'Kulüp verimliliği.',
      mvpFeatures: ['Temel Arayüz', 'Kayıt ve Doğrulama'],
      difficulty: teamSkill,
      estimatedTime: developmentTime,
      techStack: ['React', 'TypeScript', 'Tailwind'],
      potentialRisks: ['Zaman kısıtı'],
      isBlockchainNecessary: false,
      blockchainJustification: 'MVP aşamasında blokzincir zorunlu değildir.',
      isCustom: true,
    });

    setManualName('');
    setManualPitch('');
    setShowManualModal(false);
  };

  return (
    <div className="space-y-8 animate-slide-up max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
              <Lightbulb className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Yapay Zeka Fikir Üretici
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            IdeaForge Fikir Laboratuvarı
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kulüp hedeflerine ve geçmiş projelere uygun, tuzaklardan arındırılmış yeni MVP fikirleri üretin.
          </p>
        </div>

        <button
          onClick={() => setShowManualModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700/80 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          Kendi Fikrini Yaz
        </button>
      </div>

      {/* Generator Control Card (Sade ve Kompakt) */}
      <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">Tema / Odak Alanı</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Web3 & Kulüp Operasyonları">Web3 & Kulüp Operasyonları</option>
              <option value="Doğrulanabilir İtibar & SBT">Doğrulanabilir İtibar & Rozetler</option>
              <option value="Şeffaf Finans & Kasa">Şeffaf Kasa & Bütçe</option>
              <option value="Web3 Eğitim & Onboarding">Web3 Eğitim & Quiz</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Geliştirme Süresi</label>
            <select
              value={developmentTime}
              onChange={(e) => setDevelopmentTime(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="48 saat (Hackathon)">48 saat (Hackathon Sprint)</option>
              <option value="2 hafta (Dönem İçi MVP)">2 hafta (Dönem İçi MVP)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Ekip Teknik Düzeyi</label>
            <select
              value={teamSkill}
              onChange={(e) => setTeamSkill(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Beginner">Başlangıç (HTML/React temel)</option>
              <option value="Intermediate">Orta (React, TS, Temel EVM)</option>
              <option value="Advanced">İleri (Fullstack, Web3)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Geçmiş 3 projenin retrospektif dersleri otomatik analiz edilir.
          </span>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all duration-200 hover:scale-[1.02] cursor-pointer disabled:opacity-50 shrink-0"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                Dersler İnceleniyor & Fikirler Üretiliyor...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Fikirleri Üret (Generate)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            Fikir Havuzu ({ideas.length})
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Beğendiğiniz fikri tek tıkla IdeaScore'a gönderebilirsiniz
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="hover-card p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-white">{idea.name}</h3>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {idea.difficulty} • {idea.estimatedTime}
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    idea.isBlockchainNecessary
                      ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20'
                      : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                  }`}>
                    {idea.isBlockchainNecessary ? 'Onchain Katmanı' : 'Hafif Web2 / Gasless'}
                  </span>
                </div>

                <div className="text-xs text-indigo-300 bg-indigo-950/20 p-2.5 rounded-xl border border-indigo-500/20 italic">
                  "{idea.pitch}"
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {idea.problem}
                </p>

                {/* Scope items */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {idea.mvpFeatures.map((f, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-800">
                      ✓ {f}
                    </span>
                  ))}
                </div>

                {/* Retrospective Lesson Avoided Pill */}
                {idea.avoidedPastPitfalls && idea.avoidedPastPitfalls.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-[11px] text-slate-300 space-y-0.5">
                    <span className="text-[10px] text-amber-400 font-bold uppercase block">
                      Geçmiş Projelerden Çıkarılan Ders:
                    </span>
                    <span>{idea.avoidedPastPitfalls[0]}</span>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <button
                  onClick={() => onDeleteIdea(idea.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition cursor-pointer"
                  title="Sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSendToScore(idea)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition shadow-sm hover:scale-[1.02] cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" />
                  IdeaScore'da Değerlendir
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Entry Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="animate-scale-in bg-slate-900 border border-slate-700/80 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-white">Özel Fikir Girişi</h3>

            <form onSubmit={handleManualSubmit} className="space-y-4">
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
                <label className="block text-slate-300 font-medium mb-1">Tek Cümlelik Özet *</label>
                <input
                  type="text"
                  required
                  placeholder="Kulüp kararları için gazsız oylama..."
                  value={manualPitch}
                  onChange={(e) => setManualPitch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
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
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold"
                >
                  Fikri Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
