import React, { useState } from 'react';
import { 
  Lightbulb, Sparkles, Scale, Trash2, Plus, 
  ArrowRight, ShieldCheck, Zap, Layers, Ship, Award, CheckCircle
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
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Maritime' | 'Campus' | 'Identity'>('All');
  const [loading, setLoading] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  // Manual entry
  const [manualName, setManualName] = useState('');
  const [manualPitch, setManualPitch] = useState('');

  const filterChips = [
    { id: 'All', label: 'Tüm Fikirler' },
    { id: 'Maritime', label: '⚓ Denizcilik & Liman' },
    { id: 'Campus', label: '🏛️ Kampüs DAO' },
    { id: 'Identity', label: '🛡️ SBT & İtibar' },
  ];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const config: IdeaGenerationConfig = {
        theme: 'Denizcilik ve Web3 Kulüp Operasyonları',
        targetAudience: 'Piri Reis Üniversitesi Öğrencileri ve Hackathon Jüri Heyeti',
        developmentTime: '48 saat (Hackathon Sprint)',
        teamSkill: 'Intermediate',
        primaryGoal: 'Jüri önünde 2.5 dakikada çalışan canlı MVP sunumu',
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
      problem: 'Kulüp içi ihtiyaç ve operasyonel verimlilik',
      solution: manualPitch,
      targetAudience: 'Kulüp üyeleri',
      whyItMatters: 'Topluluk üretkenliğini artırır.',
      mvpFeatures: ['Arayüz', 'Cüzdan Entegrasyonu'],
      difficulty: 'Intermediate',
      estimatedTime: '48 saat',
      techStack: ['React', 'TypeScript', 'EVM'],
      potentialRisks: ['Zaman kısıtı'],
      isBlockchainNecessary: true,
      blockchainJustification: 'Doğrulanabilir sahiplik için on-chain kayıt.',
      isCustom: true,
    });

    setManualName('');
    setManualPitch('');
    setShowManualModal(false);
  };

  const filteredIdeas = ideas.filter(idea => {
    if (selectedFilter === 'Maritime') {
      return idea.name.toLowerCase().includes('port') || idea.name.toLowerCase().includes('deniz') || idea.pitch.toLowerCase().includes('liman');
    }
    if (selectedFilter === 'Campus') {
      return idea.name.toLowerCase().includes('treasury') || idea.pitch.toLowerCase().includes('kampüs') || idea.pitch.toLowerCase().includes('kasa');
    }
    if (selectedFilter === 'Identity') {
      return idea.name.toLowerCase().includes('badge') || idea.pitch.toLowerCase().includes('sbt') || idea.pitch.toLowerCase().includes('itibar');
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <Zap className="w-3 h-3" />
            IdeaForge Generator
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Fikir Havuzu & Üretici
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Geçmiş kulüp derslerinden beslenen, MVP odaklı Web3 proje önerileri.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowManualModal(true)}
            className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 font-semibold text-xs border border-white/[0.08] transition cursor-pointer"
          >
            + Manuel Ekle
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                Analiz Ediliyor...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                AI ile Fikir Türet
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filterChips.map(chip => (
          <button
            key={chip.id}
            onClick={() => setSelectedFilter(chip.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedFilter === chip.id
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            {chip.label}
          </button>
        ))}
        <span className="text-xs font-mono text-slate-500 ml-auto hidden sm:block">
          {filteredIdeas.length} Fikir Listeleniyor
        </span>
      </div>

      {/* Cards Deck */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredIdeas.map((idea) => {
          const isMaritime = idea.name.toLowerCase().includes('port') || idea.pitch.toLowerCase().includes('liman');
          return (
            <div
              key={idea.id}
              className="glass-card rounded-2xl p-5 flex flex-col justify-between group hover:border-cyan-500/40"
            >
              <div className="space-y-3">
                {/* Card Top Pill Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/[0.05] text-cyan-400 border border-white/[0.08]">
                    {idea.estimatedTime || '48 Saat'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300">
                      {idea.difficulty || 'Intermediate'}
                    </span>
                    <button
                      onClick={() => onDeleteIdea(idea.id)}
                      className="p-1 rounded-md text-slate-600 hover:text-rose-400 transition"
                      title="Fikri Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title & Pitch */}
                <div>
                  <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                    {idea.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-3">
                    {idea.pitch}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(idea.techStack || ['React', 'Solidity']).slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-slate-400 border border-white/[0.05]"
                    >
                      {tech}
                    </span>
                  ))}
                  {idea.avoidedPastPitfalls && idea.avoidedPastPitfalls.length > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                      ✓ Ders Analizli
                    </span>
                  )}
                </div>
              </div>

              {/* Card Action Button */}
              <div className="mt-5 pt-4 border-t border-white/[0.06]">
                <button
                  onClick={() => onSendToScore(idea)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-indigo-600/80 to-cyan-600/80 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" />
                  IdeaScore İle Puanla
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Idea Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="glass-card rounded-3xl p-6 max-w-lg w-full space-y-4 border border-white/[0.1] shadow-2xl">
            <h2 className="text-lg font-black text-white">Yeni Fikir Ekle</h2>
            <form onSubmit={handleManualSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Proje Adı</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: PortChain IoT"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Tek Cümlelik Özet (Pitch)</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Projenin ne çözdüğünü ve ne yaptığını kısaca özetleyin..."
                  value={manualPitch}
                  onChange={(e) => setManualPitch(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-cyan-400"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
