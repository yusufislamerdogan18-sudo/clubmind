import React, { useState } from 'react';
import { 
  History, BookOpen, AlertTriangle, CheckCircle2, 
  Search, Plus, ShieldCheck, Trash2, X, ChevronRight
} from 'lucide-react';
import { HistoricalProject, LessonLearned, LessonCategory, ProjectStatus } from '../types';

interface RetroViewProps {
  projects: HistoricalProject[];
  lessons: LessonLearned[];
  onAddProject: (proj: Omit<HistoricalProject, 'id'>) => void;
  onAddLesson: (lesson: Omit<LessonLearned, 'id'>) => void;
  onDeleteLesson: (id: string) => void;
}

export default function RetroView({
  projects,
  lessons,
  onAddProject,
  onAddLesson,
  onDeleteLesson,
}: RetroViewProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'lessons'>('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);

  // New Project Form
  const [pName, setPName] = useState('');
  const [pObjective, setPObjective] = useState('');
  const [pStatus, setPStatus] = useState<ProjectStatus>('completed');
  const [pPlannedTime, setPPlannedTime] = useState('48 saat');
  const [pWhatWentWrong, setPWhatWentWrong] = useState('');

  // New Lesson Form
  const [lTitle, setLTitle] = useState('');
  const [lLesson, setLLesson] = useState('');
  const [lProjectName, setLProjectName] = useState('');

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.objective.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLessons = lessons.filter(l =>
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.lesson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Tamamlandı</span>;
      case 'partially completed':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Kısmi</span>;
      case 'abandoned':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">Arşivlendi</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Aktif</span>;
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pObjective) return;

    onAddProject({
      name: pName,
      objective: pObjective,
      originalGoals: ['Temel MVP'],
      completedFeatures: ['Arayüz'],
      status: pStatus,
      technologies: ['Solidity', 'React'],
      plannedDuration: pPlannedTime,
      actualDuration: pPlannedTime,
      challenges: [pWhatWentWrong || 'Zaman kısıtı'],
      documentedCauses: 'Operasyonel dinamikler',
      whatWentWell: ['Ekip uyumu'],
      whatWentWrong: [pWhatWentWrong || 'Kapsam genişliği'],
      lessonsLearned: ['MVP kapsamını daralt'],
      isDemo: false,
    });

    setPName('');
    setPObjective('');
    setShowAddProjectModal(false);
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lTitle || !lLesson) return;

    onAddLesson({
      title: lTitle,
      lesson: lLesson,
      projectId: 'custom',
      projectName: lProjectName || 'PRU Deneyimi',
      evidenceOrSource: 'Topluluk tecrübesi',
      category: 'scope management',
      confidence: 'high',
      isDocumentedFact: true,
      practicalRecommendation: lLesson,
    });

    setLTitle('');
    setLLesson('');
    setShowAddLessonModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <History className="w-3 h-3" />
            Post-Mortem & Retrospective
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Geçmiş Projeler & Çıkarılan Dersler
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Eski hataları tekrarlamamak için kulüp arşivindeki tecrübe deposu.
          </p>
        </div>

        <button
          onClick={() => activeTab === 'projects' ? setShowAddProjectModal(true) : setShowAddLessonModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          {activeTab === 'projects' ? 'Geçmiş Proje Ekle' : 'Ders Ekle'}
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Geçmiş Projeler ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'lessons'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Kritik Dersler ({lessons.length})
          </button>
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Arama yap..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {activeTab === 'projects' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  {getStatusBadge(p.status)}
                  <span className="text-[10px] font-mono text-slate-500">{p.plannedDuration}</span>
                </div>

                <h3 className="text-base font-black text-white">{p.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{p.objective}</p>

                {/* What went wrong takeaway */}
                {p.whatWentWrong && p.whatWentWrong.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-rose-500/5 border border-rose-500/20 text-[11px] text-rose-300">
                    <span className="font-bold block text-rose-400 mb-0.5">⚠️ Karşılaşılan Zorluk:</span>
                    {p.whatWentWrong[0]}
                  </div>
                )}
              </div>

              {/* Technologies */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {p.technologies.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Lessons Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLessons.map((l) => (
            <div
              key={l.id}
              className="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    ✓ {l.category}
                  </span>
                  <button
                    onClick={() => onDeleteLesson(l.id)}
                    className="text-slate-600 hover:text-rose-400 transition"
                    title="Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-sm font-bold text-white">{l.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{l.lesson}</p>

                <div className="p-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-[11px] text-cyan-300">
                  <span className="font-bold block text-cyan-400 mb-0.5">Tavsiye:</span>
                  {l.practicalRecommendation}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] text-[10px] text-slate-500 font-mono">
                Kaynak: {l.projectName}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="glass-card rounded-3xl p-6 max-w-lg w-full space-y-4 border border-white/[0.1] shadow-2xl">
            <h2 className="text-base font-black text-white">Geçmiş Proje Kaydı Ekle</h2>
            <form onSubmit={handleCreateProject} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Proje Adı</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: SeaCertificate DApp"
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Hedef / Çıktı</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Projede ne hedeflendi?"
                  value={pObjective}
                  onChange={(e) => setPObjective(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Durum</label>
                  <select
                    value={pStatus}
                    onChange={(e) => setPStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/[0.08] text-white text-xs"
                  >
                    <option value="completed">Tamamlandı</option>
                    <option value="partially completed">Kısmen Tamamlandı</option>
                    <option value="abandoned">Terk Edildi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Süre</label>
                  <input
                    type="text"
                    value={pPlannedTime}
                    onChange={(e) => setPPlannedTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Karşılaşılan Problem / Hata</label>
                <input
                  type="text"
                  placeholder="Örn: Testnet oracle yanıt vermedi..."
                  value={pWhatWentWrong}
                  onChange={(e) => setPWhatWentWrong(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showAddLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="glass-card rounded-3xl p-6 max-w-lg w-full space-y-4 border border-white/[0.1] shadow-2xl">
            <h2 className="text-base font-black text-white">Yeni Ders Kaydı Ekle</h2>
            <form onSubmit={handleCreateLesson} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Ders Başlığı</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Sunum video provası"
                  value={lTitle}
                  onChange={(e) => setLTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Çıkarılan Ders</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Canlı demo riski almamak için videoyu önceden çekin..."
                  value={lLesson}
                  onChange={(e) => setLLesson(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-emerald-400"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLessonModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
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
