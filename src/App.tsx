import React, { useState, useEffect } from 'react';
import Navbar, { NavTab } from './components/Navbar';
import TerminalView from './components/TerminalView';
import IdeaForgeView from './components/IdeaForgeView';
import IdeaScoreView from './components/IdeaScoreView';
import BlueprintView from './components/BlueprintView';
import VaultView from './components/VaultView';
import RetroView from './components/RetroView';
import SettingsView from './components/SettingsView';
import { StorageService } from './services/storage';
import { 
  ClubDocument, HistoricalProject, LessonLearned, 
  ProjectIdea, IdeaEvaluation, ProjectBlueprint, AppSettings 
} from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('terminal');

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
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black web3-grid pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-indigo-600/90 backdrop-blur-md text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-indigo-400 animate-slide-up">
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Web3 Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDemoMode={settings.isDemoMode}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {activeTab === 'terminal' && (
          <TerminalView
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

        {activeTab === 'vault' && (
          <VaultView
            documents={documents}
            onAddDocument={handleAddDocument}
            onDeleteDocument={handleDeleteDocument}
            isDemoMode={settings.isDemoMode}
          />
        )}

        {activeTab === 'retro' && (
          <RetroView
            projects={projects}
            lessons={lessons}
            onAddProject={handleAddProject}
            onAddLesson={handleAddLesson}
            onDeleteLesson={handleDeleteLesson}
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
  );
}
