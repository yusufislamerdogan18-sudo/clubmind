import React, { useState } from 'react';
import { 
  FileCode2, CheckSquare, Square, Sparkles, Clock, AlertTriangle, 
  Layers, Printer, Download, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Play 
} from 'lucide-react';
import { ProjectBlueprint, ProjectIdea, LessonLearned } from '../types';
import { AIService } from '../services/ai';

interface BlueprintViewProps {
  ideas: ProjectIdea[];
  blueprints: ProjectBlueprint[];
  lessons: LessonLearned[];
  onSaveBlueprint: (bp: Omit<ProjectBlueprint, 'id' | 'createdAt'>) => void;
  onUpdateTask: (bpId: string, taskId: string, completed: boolean) => void;
  preselectedIdea?: ProjectIdea | null;
}

export default function BlueprintView({
  ideas,
  blueprints,
  lessons,
  onSaveBlueprint,
  onUpdateTask,
  preselectedIdea,
}: BlueprintViewProps) {
  const [selectedIdeaId, setSelectedIdeaId] = useState<string>(
    preselectedIdea?.id || (ideas[0]?.id || '')
  );
  const [loading, setLoading] = useState(false);

  const activeIdea = ideas.find(i => i.id === selectedIdeaId);
  const existingBlueprint = blueprints.find(b => b.ideaId === selectedIdeaId);

  const handleGenerateBlueprint = async () => {
    if (!activeIdea) return;
    setLoading(true);

    try {
      const bpRes = await AIService.generateBlueprint(activeIdea, lessons);
      onSaveBlueprint({
        ideaId: activeIdea.id,
        projectName: bpRes.projectName,
        objective: bpRes.objective,
        targetUser: bpRes.targetUser,
        problemStatement: bpRes.problemStatement,
        coreMvpScope: bpRes.coreMvpScope,
        postponedFeatures: bpRes.postponedFeatures,
        recommendedTechStack: bpRes.recommendedTechStack,
        milestones: bpRes.milestones,
        tasks: bpRes.tasks,
        appliedHistoricalLessons: bpRes.appliedHistoricalLessons,
        testingChecklist: bpRes.testingChecklist,
        demoScript: bpRes.demoScript,
        nextSteps: bpRes.nextSteps,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const completedTasksCount = existingBlueprint?.tasks.filter(t => t.completed).length || 0;
  const totalTasksCount = existingBlueprint?.tasks.length || 0;
  const progressPercent = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400">
              <FileCode2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Uygulama & Eylem Planı
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Project Blueprint: Fikirden Çalışan MVP'ye
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Seçilen fikri 48 saatlik veya 2 haftalık gerçekçi bir sprint planına, görev listesine ve sunum senaryosuna dönüştürün.
          </p>
        </div>

        {existingBlueprint && (
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition cursor-pointer self-start sm:self-auto"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            Planı Yazdır / PDF
          </button>
        )}
      </div>

      {/* Idea Selector Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-xs text-slate-400 font-semibold shrink-0">Planlanacak Fikir:</span>
          <select
            value={selectedIdeaId}
            onChange={(e) => setSelectedIdeaId(e.target.value)}
            className="w-full sm:max-w-md bg-slate-950 border border-slate-700 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
          >
            {ideas.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerateBlueprint}
          disabled={loading || !activeIdea}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
        >
          {loading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Plan Hazırlanıyor...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              {existingBlueprint ? 'Planı Yeniden Oluştur' : 'MVP Blueprintini Oluştur'}
            </>
          )}
        </button>
      </div>

      {/* Blueprint Content */}
      {existingBlueprint && activeIdea ? (
        <div className="space-y-6">
          {/* Overview Hero Card */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  MVP Eylem Planı
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {existingBlueprint.projectName}
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  {existingBlueprint.objective}
                </p>
              </div>

              {/* Progress Ring / Bar */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center min-w-[160px]">
                <div className="text-2xl font-black font-mono text-emerald-400">
                  %{progressPercent}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-bold mt-0.5">
                  Tamamlanma Oranı
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  {completedTasksCount} / {totalTasksCount} Görev
                </div>
              </div>
            </div>

            {/* Scope Comparison: Core vs Postponed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5 uppercase text-[11px]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Çekirdek MVP Kapsamı (Zorunlu)
                </div>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {existingBlueprint.coreMvpScope.map((scope, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{scope}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="font-bold text-slate-400 flex items-center gap-1.5 uppercase text-[11px]">
                  <Clock className="w-4 h-4 text-slate-500" />
                  Ertelenen Özellikler (MVP Sonrası)
                </div>
                <ul className="space-y-1 text-slate-400 text-[11px]">
                  {existingBlueprint.postponedFeatures.map((post, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-slate-500">•</span>
                      <span>{post}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Task Checklist */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                  Adım Adım Geliştirme Görev Listesi
                </h3>
                <p className="text-xs text-slate-400">
                  Görevleri tamamladıkça işaretleyin; durum anında yerel hafızaya kaydedilir.
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-xl border border-emerald-500/30">
                {completedTasksCount} / {totalTasksCount} Bitti
              </span>
            </div>

            <div className="space-y-2">
              {existingBlueprint.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onUpdateTask(existingBlueprint.id, task.id, !task.completed)}
                  className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                    task.completed
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-400'
                      : 'bg-slate-950/80 border-slate-800 text-white hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                    <span className={`text-xs ${task.completed ? 'line-through text-slate-400' : 'font-medium text-slate-200'}`}>
                      {task.title}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 uppercase">
                    {task.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Applied Historical Lessons (Retrospective Integration) */}
          <div className="bg-gradient-to-b from-amber-950/30 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                Bu Plana Entegre Edilen Geçmiş Proje Dersleri
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              Geçmiş hataların tekrarlanmaması için bu projeye uygulanan somut önlemler:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {existingBlueprint.appliedHistoricalLessons.map((l, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    {l.lessonTitle}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {l.actionableMeasure}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathon Demo Presentation Script (2-3 Minutes) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Play className="w-4 h-4 text-cyan-400" />
                  Hackathon Jüri Sunumu Senaryosu (2-3 Dakikalık Demo Akışı)
                </h3>
                <p className="text-xs text-slate-400">
                  Sunum anında sahneye çıktığınızda ne söyleyeceğiniz ve hangi ekranı göstereceğiniz:
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-xl border border-cyan-500/30">
                Tam 2.5 Dakika
              </span>
            </div>

            <div className="space-y-3">
              {existingBlueprint.demoScript.map((step, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row gap-4 text-xs">
                  <div className="sm:w-32 shrink-0">
                    <div className="font-mono text-cyan-400 font-bold text-xs">{step.timing}</div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">{step.section}</div>
                  </div>
                  <div className="flex-1 text-slate-200 leading-relaxed font-sans bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
                    {step.whatToSayAndShow}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-16 text-center space-y-3">
          <FileCode2 className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">Blueprint Oluşturmak İçin Butona Tıklayın</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Yukarıdan seçtiğiniz proje fikrinin kapsamını, görev listesini ve sunum senaryosunu üretmek için "MVP Blueprintini Oluştur" butonuna basın.
          </p>
        </div>
      )}
    </div>
  );
}
