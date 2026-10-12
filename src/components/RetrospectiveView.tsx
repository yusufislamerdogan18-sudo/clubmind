import React, { useState } from 'react';
import { 
  History, BookOpen, AlertTriangle, CheckCircle2, XCircle, 
  Search, Plus, Sparkles, X, ChevronRight 
} from 'lucide-react';
import { HistoricalProject, LessonLearned, LessonCategory, ProjectStatus } from '../types';

interface RetrospectiveViewProps {
  projects: HistoricalProject[];
  lessons: LessonLearned[];
  onAddProject: (proj: Omit<HistoricalProject, 'id'>) => void;
  onAddLesson: (lesson: Omit<LessonLearned, 'id'>) => void;
  onDeleteLesson: (id: string) => void;
}

export default function RetrospectiveView({
  projects,
  lessons,
  onAddProject,
  onAddLesson,
}: RetrospectiveViewProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'lessons'>('projects');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedProject, setSelectedProject] = useState<HistoricalProject | null>(null);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);

  // New Project Form
  const [pName, setPName] = useState('');
  const [pObjective, setPObjective] = useState('');
  const [pStatus, setPStatus] = useState<ProjectStatus>('completed');
  const [pPlannedTime, setPPlannedTime] = useState('');
  const [pActualTime, setPActualTime] = useState('');
  const [pTechnologies, setPTechnologies] = useState('');
  const [pWhatWentWell, setPWhatWentWell] = useState('');
  const [pWhatWentWrong, setPWhatWentWrong] = useState('');
  const [pCauses, setPCauses] = useState('');

  // New Lesson Form
  const [lTitle, setLTitle] = useState('');
  const [lLesson, setLLesson] = useState('');
  const [lProjectName, setLProjectName] = useState('');
  const [lCategory, setLCategory] = useState<LessonCategory>('scope management');
  const [lConfidence, setLConfidence] = useState<'high' | 'medium' | 'hypothesis'>('high');
  const [lRecommendation, setLRecommendation] = useState('');

  const filteredProjects = projects.filter(p => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.objective.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredLessons = lessons.filter(l => {
    const matchesCat = categoryFilter === 'all' || l.category === categoryFilter;
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.lesson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Tamamlandı (Başarılı)</span>;
      case 'partially completed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Kısmen Tamamlandı</span>;
      case 'abandoned':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">Terk Edildi</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">Devam Ediyor</span>;
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
      technologies: pTechnologies.split(',').map(t => t.trim()),
      plannedDuration: pPlannedTime || '3 hafta',
      actualDuration: pActualTime || '4 hafta',
      challenges: [pWhatWentWrong],
      documentedCauses: pCauses || 'Kullanıcı ve geliştirme dinamikleri',
      whatWentWell: [pWhatWentWell],
      whatWentWrong: [pWhatWentWrong],
      lessonsLearned: [pCauses],
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
      projectName: lProjectName || 'Genel Kulüp Deneyimi',
      evidenceOrSource: 'Kullanıcı tarafından belgelendi',
      category: lCategory,
      confidence: lConfidence,
      isDocumentedFact: lConfidence !== 'hypothesis',
      practicalRecommendation: lRecommendation || lLesson,
    });

    setLTitle('');
    setLLesson('');
    setLRecommendation('');
    setShowAddLessonModal(false);
  };

  return (
    <div className="space-y-8 animate-slide-up max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
              <History className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Kurumsal Öğrenme & Hafıza
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Geçmiş Projeler & Çıkarılan Dersler
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Geçmişteki hataları tekrar etmemek için tamamlanan, yarım kalan ve terk edilen projeleri şeffafça inceleyin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'projects' ? (
            <button
              onClick={() => setShowAddProjectModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/25 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Geçmiş Proje Ekle
            </button>
          ) : (
            <button
              onClick={() => setShowAddLessonModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Yeni Ders Ekle
            </button>
          )}
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition cursor-pointer ${
            activeTab === 'projects'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <History className="w-4 h-4" />
          Geçmiş Proje Kayıtları ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab('lessons')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition cursor-pointer ${
            activeTab === 'lessons'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Dersler Kütüphanesi ({lessons.length})
        </button>
      </div>

      {/* PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {['all', 'completed', 'partially completed', 'abandoned'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition cursor-pointer ${
                    statusFilter === st
                      ? 'bg-amber-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {st === 'all' ? 'Tümü' : st === 'completed' ? 'Tamamlananlar' : st === 'partially completed' ? 'Yarım Kalanlar' : 'Terk Edilenler'}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Proje ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Clean 3-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="hover-card p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    {getStatusBadge(p.status)}
                    <span className="text-[10px] text-slate-400 font-mono">
                      {p.plannedDuration}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {p.name}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {p.objective}
                  </p>

                  {/* Clean takeaway quote */}
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-[11px] space-y-1">
                    <span className="text-[10px] text-amber-400 font-bold uppercase">Belgelenen Kök Neden:</span>
                    <p className="text-slate-300 italic">"{p.documentedCauses}"</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <div className="flex flex-wrap gap-1">
                    {p.technologies.slice(0, 2).map((tech, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(p)}
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold transition cursor-pointer"
                  >
                    Detayı Aç <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LESSONS LEARNED TAB */}
      {activeTab === 'lessons' && (
        <div className="space-y-6">
          {/* Lessons List */}
          <div className="space-y-3">
            {filteredLessons.map((l) => (
              <div
                key={l.id}
                className="hover-card p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <h3 className="font-bold text-sm text-white">{l.title}</h3>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {l.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Çıkarılan İlke:</span>
                    <p className="text-slate-200 leading-relaxed">{l.lesson}</p>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">Kaynak: {l.projectName}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold block mb-1">Gelecek Ekipler İçin Somut Tavsiye:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{l.practicalRecommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Retrospective Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="animate-scale-in bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getStatusBadge(selectedProject.status)}
                  <span className="text-xs text-slate-400 font-mono">
                    Planlanan: {selectedProject.plannedDuration} | Gerçekleşen: {selectedProject.actualDuration}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">
                  {selectedProject.name}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedProject.objective}
                </p>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Başarılar & İyi Gidenler
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                    {selectedProject.whatWentWell.map((w, idx) => <li key={idx}>{w}</li>)}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                  <div className="font-bold text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    Engeller & Sorunlar
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                    {selectedProject.whatWentWrong.map((w, idx) => <li key={idx}>{w}</li>)}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-amber-400 text-xs">Belgelenen Kök Neden (Root Cause)</div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{selectedProject.documentedCauses}</p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-1.5">
                <div className="font-bold text-indigo-300 text-xs">Gelecek Ekiplere Kurumsal Dersler</div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                  {selectedProject.lessonsLearned.map((l, idx) => <li key={idx}>{l}</li>)}
                </ul>
              </div>
            </div>

            <div className="text-right pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="animate-scale-in bg-slate-900 border border-slate-700/80 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Geçmiş Proje Kaydı Ekle</h3>
              <button onClick={() => setShowAddProjectModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Proje Adı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: PRU NFT Mezuniyet Yıllığı"
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Orijinal Amaç *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Projede hedeflenen amaç..."
                  value={pObjective}
                  onChange={(e) => setPObjective(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Durum</label>
                  <select
                    value={pStatus}
                    onChange={(e) => setPStatus(e.target.value as ProjectStatus)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                  >
                    <option value="completed">Tamamlandı</option>
                    <option value="partially completed">Kısmen Tamamlandı</option>
                    <option value="abandoned">Terk Edildi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Teknolojiler</label>
                  <input
                    type="text"
                    placeholder="React, Solidity"
                    value={pTechnologies}
                    onChange={(e) => setPTechnologies(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="animate-scale-in bg-slate-900 border border-slate-700/80 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Yeni Ders Ekle</h3>
              <button onClick={() => setShowAddLessonModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLesson} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Ders Başlığı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Kapsam Disiplini Kuralı"
                  value={lTitle}
                  onChange={(e) => setLTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Ders Açıklaması *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Yaşanan deneyim..."
                  value={lLesson}
                  onChange={(e) => setLLesson(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Somut Tavsiye</label>
                <textarea
                  rows={2}
                  placeholder="Yeni takımlara tavsiye..."
                  value={lRecommendation}
                  onChange={(e) => setLRecommendation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLessonModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Dersi Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
