import React, { useState, useEffect } from 'react';
import Sidebar, { NavTab } from './components/Sidebar';
import DashboardView from './components/DashboardView';
import ClubMindView from './components/ClubMindView';
import RetrospectiveView from './components/RetrospectiveView';
import IdeaForgeView from './components/IdeaForgeView';
import IdeaScoreView from './components/IdeaScoreView';
import BlueprintView from './components/BlueprintView';
import SettingsView from './components/SettingsView';
import { StorageService } from './services/storage';
import { 
  ClubDocument, HistoricalProject, LessonLearned, 
  ProjectIdea, IdeaEvaluation, ProjectBlueprint, AppSettings 
} from './types';
import { Menu, X, Anchor, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Application State
  const [documents, setDocuments] = useState<ClubDocument[]>([]);
  const [projects, setProjects] = useState<HistoricalProject[]>([]);
  const [lessons, setLessons] = useState<LessonLearned[]>([]);
  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);
  const [evaluations, setEvaluations] = useState<IdeaEvaluation[]>([]);
  const [blueprints, setBlueprints] = useState<ProjectBlueprint[]>([]);
  const [settings, setSettings] = useState<AppSettings>(StorageService.getSettings());

  // Inter-module preselected ideas
  const [preselectedIdeaForScore, setPreselectedIdeaForScore] = useState<ProjectIdea | null>(null);
  const [preselectedIdeaForBlueprint, setPreselectedIdeaForBlueprint] = useState<ProjectIdea | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Load state on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    setDocuments(StorageService.getDocuments());
    setProjects(StorageService.getProjects());
    setLessons(StorageService.getLessons());
    setIdeas(StorageService.getIdeas());
    setEvaluations(StorageService.getEvaluations());
    setBlueprints(StorageService.getBlueprints());
    setSettings(StorageService.getSettings());
  };

  // Document Handlers
  const handleAddDocument = (doc: Omit<ClubDocument, 'id' | 'createdAt'>) => {
    const saved = StorageService.saveDocument(doc);
    setDocuments(StorageService.getDocuments());
    showToast(`"${saved.title}" hafızaya eklendi.`);
  };

  const handleDeleteDocument = (id: string) => {
    StorageService.deleteDocument(id);
    setDocuments(StorageService.getDocuments());
    showToast('Doküman silindi.');
  };

  // Historical Project Handlers
  const handleAddProject = (proj: Omit<HistoricalProject, 'id'>) => {
    const saved = StorageService.saveProject(proj);
    setProjects(StorageService.getProjects());
    showToast(`"${saved.name}" retrospektif kaydı eklendi.`);
  };

  // Lesson Learned Handlers
  const handleAddLesson = (lesson: Omit<LessonLearned, 'id'>) => {
    const saved = StorageService.saveLesson(lesson);
    setLessons(StorageService.getLessons());
    showToast(`"${saved.title}" dersler kütüphanesine eklendi.`);
  };

  const handleDeleteLesson = (id: string) => {
    StorageService.deleteLesson(id);
    setLessons(StorageService.getLessons());
    showToast('Ders silindi.');
  };

  // Idea Handlers
  const handleAddIdea = (idea: Omit<ProjectIdea, 'id' | 'createdAt'>) => {
    const saved = StorageService.saveIdea(idea);
    setIdeas(StorageService.getIdeas());
    showToast(`"${saved.name}" fikri oluşturuldu.`);
  };

  const handleDeleteIdea = (id: string) => {
    StorageService.deleteIdea(id);
    setIdeas(StorageService.getIdeas());
    showToast('Fikir silindi.');
  };

  const handleSendToScore = (idea: ProjectIdea) => {
    setPreselectedIdeaForScore(idea);
    setActiveTab('ideascore');
  };

  // Evaluation Handlers
  const handleSaveEvaluation = (evalData: Omit<IdeaEvaluation, 'id' | 'evaluatedAt'>) => {
    StorageService.saveEvaluation(evalData);
    setEvaluations(StorageService.getEvaluations());
    showToast(`"${evalData.ideaName}" başarıyla puanlandı.`);
  };

  const handleSelectForBlueprint = (idea: ProjectIdea) => {
    setPreselectedIdeaForBlueprint(idea);
    setActiveTab('blueprint');
  };

  // Blueprint Handlers
  const handleSaveBlueprint = (bp: Omit<ProjectBlueprint, 'id' | 'createdAt'>) => {
    const saved = StorageService.saveBlueprint(bp);
    setBlueprints(StorageService.getBlueprints());
    showToast(`"${saved.projectName}" eylem planı kaydedildi.`);
  };

  const handleUpdateTask = (bpId: string, taskId: string, completed: boolean) => {
    StorageService.updateBlueprintTask(bpId, taskId, completed);
    setBlueprints(StorageService.getBlueprints());
  };

  // Settings Handlers
  const handleUpdateSettings = (newSettings: AppSettings) => {
    StorageService.saveSettings(newSettings);
    setSettings(newSettings);
    showToast('Ayarlar güncellendi.');
  };

  const handleResetData = () => {
    StorageService.resetAllData();
    loadAllData();
    showToast('Tüm örnek veriler başlangıç durumuna sıfırlandı.');
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-indigo-600 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-2xl animate-fadeIn flex items-center gap-2 border border-indigo-400">
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block shrink-0">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDemoMode={settings.isDemoMode}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <header className="lg:hidden sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base">
              ⚓
            </div>
            <div>
              <span className="font-extrabold text-sm text-white">ClubMind</span>
              <span className="text-[10px] text-slate-400 ml-1.5">PRU Blockchain</span>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-1">
            {[
              { id: 'dashboard' as NavTab, label: 'Genel Bakış' },
              { id: 'clubmind' as NavTab, label: 'ClubMind Hafızası' },
              { id: 'retrospective' as NavTab, label: 'Retrospektif & Dersler' },
              { id: 'ideaforge' as NavTab, label: 'IdeaForge' },
              { id: 'ideascore' as NavTab, label: 'IdeaScore' },
              { id: 'blueprint' as NavTab, label: 'Project Blueprint' },
              { id: 'settings' as NavTab, label: 'Ayarlar' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  activeTab === tab.id ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Viewport Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              documents={documents}
              ideas={ideas}
              evaluations={evaluations}
              projects={projects}
              lessons={lessons}
              onNavigate={setActiveTab}
              onSelectIdeaForEvaluation={handleSendToScore}
              onSelectIdeaForBlueprint={handleSelectForBlueprint}
            />
          )}

          {activeTab === 'clubmind' && (
            <ClubMindView
              documents={documents}
              onAddDocument={handleAddDocument}
              onDeleteDocument={handleDeleteDocument}
              isDemoMode={settings.isDemoMode}
            />
          )}

          {activeTab === 'retrospective' && (
            <RetrospectiveView
              projects={projects}
              lessons={lessons}
              onAddProject={handleAddProject}
              onAddLesson={handleAddLesson}
              onDeleteLesson={handleDeleteLesson}
            />
          )}

          {activeTab === 'ideaforge' && (
            <IdeaForgeView
              ideas={ideas}
              documents={documents}
              lessons={lessons}
              onAddIdea={handleAddIdea}
              onDeleteIdea={handleDeleteIdea}
              onSendToScore={handleSendToScore}
              isDemoMode={settings.isDemoMode}
            />
          )}

          {activeTab === 'ideascore' && (
            <IdeaScoreView
              ideas={ideas}
              evaluations={evaluations}
              projects={projects}
              lessons={lessons}
              weights={settings.criteriaWeights}
              onSaveEvaluation={handleSaveEvaluation}
              onSelectForBlueprint={handleSelectForBlueprint}
              preselectedIdea={preselectedIdeaForScore}
              isDemoMode={settings.isDemoMode}
            />
          )}

          {activeTab === 'blueprint' && (
            <BlueprintView
              ideas={ideas}
              blueprints={blueprints}
              lessons={lessons}
              onSaveBlueprint={handleSaveBlueprint}
              onUpdateTask={handleUpdateTask}
              preselectedIdea={preselectedIdeaForBlueprint}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>
    </div>
  );
}
