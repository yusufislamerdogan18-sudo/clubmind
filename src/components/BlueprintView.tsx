import React, { useState, useEffect } from 'react';
import { 
  FileCode2, CheckSquare, Square, Sparkles, Clock, 
  Printer, Play, CheckCircle2, Pause, RotateCcw, Copy, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
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

  // Presentation Timer State
  const [timerSeconds, setTimerSeconds] = useState(150); // 2.5 minutes = 150s
  const [timerRunning, setTimerRunning] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const activeIdea = ideas.find(i => i.id === selectedIdeaId);
  const existingBlueprint = blueprints.find(b => b.ideaId === selectedIdeaId);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

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

  const handleTaskToggle = (bpId: string, taskId: string, currentStatus: boolean) => {
    onUpdateTask(bpId, taskId, !currentStatus);
    if (!currentStatus && completedTasksCount + 1 === totalTasksCount) {
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  };

  const handleCopyScript = () => {
    if (!existingBlueprint) return;
    const text = existingBlueprint.demoScript.map(s => `[${s.timing} - ${s.section}]\n${s.whatToSayAndShow}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <FileCode2 className="w-3 h-3" />
            Project Blueprint Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Sprint Yol Haritası & Jüri Senaryosu
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            48 saatlik hackathon için somut görevler, ertelenen fazlar ve 2.5 dk sunum metni.
          </p>
        </div>

        {existingBlueprint && (
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 font-semibold text-xs border border-white/[0.08] transition cursor-pointer self-start sm:self-auto"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            PDF / Çıktı
          </button>
        )}
      </div>

      {/* Target Idea Selector Bar */}
      <div className="glass-card rounded-2xl p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-xs text-slate-400 font-semibold shrink-0">Planlanacak Fikir:</span>
          <select
            value={selectedIdeaId}
            onChange={(e) => setSelectedIdeaId(e.target.value)}
            className="w-full sm:max-w-md bg-white/[0.04] border border-white/[0.08] text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-400"
          >
            {ideas.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>
        </div>

        <button
          onClick={handleGenerateBlueprint}
          disabled={loading || !activeIdea}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
        >
          {loading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
              Oluşturuluyor...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              {existingBlueprint ? 'Planı Güncelle' : 'MVP Blueprintini Çıkar'}
            </>
          )}
        </button>
      </div>

      {/* Blueprint Content */}
      {existingBlueprint && activeIdea ? (
        <div className="space-y-6">
          {/* Top Progress Overview Card */}
          <div className="glass-card rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                MVP Eylem Planı
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {existingBlueprint.projectName}
              </h2>
              <p className="text-xs text-slate-300 max-w-xl">
                {existingBlueprint.objective}
              </p>
            </div>

            {/* Progress Box */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center min-w-[160px] shrink-0">
              <div className="text-3xl font-black font-mono text-emerald-400">
                %{progressPercent}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">
                İlerleme
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-1">
                {completedTasksCount} / {totalTasksCount} Görev
              </div>
            </div>
          </div>

          {/* Scope Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5 border-emerald-500/20 space-y-3">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                Zorunlu Çekirdek MVP Kapsamı
              </div>
              <div className="space-y-1.5">
                {existingBlueprint.coreMvpScope.map((scope, idx) => (
                  <div key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{scope}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border-white/[0.06] space-y-3">
              <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Clock className="w-4 h-4 text-slate-500" />
                Ertelenen Özellikler (MVP Sonrası)
              </div>
              <div className="space-y-1.5">
                {existingBlueprint.postponedFeatures.map((post, idx) => (
                  <div key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="text-slate-600">•</span>
                    <span>{post}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sprint Task Checklist */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-black text-white">Sprint Görev Kontrol Listesi</h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                {completedTasksCount} / {totalTasksCount} Bitti
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {existingBlueprint.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleTaskToggle(existingBlueprint.id, task.id, task.completed)}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    task.completed
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-400'
                      : 'bg-white/[0.02] border-white/[0.06] text-white hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    <span className={`text-xs ${task.completed ? 'line-through text-slate-500' : 'font-medium text-slate-200'}`}>
                      {task.title}
                    </span>
                  </div>

                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 uppercase font-semibold">
                    {task.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Presentation Teleprompter & Live Timer */}
          <div className="glass-card rounded-3xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-base font-black text-white">2.5 Dakika Jüri Sunum Metni</h3>
                  <p className="text-xs text-slate-400">Canlı sunum için kronometre ve slayt kartları</p>
                </div>
              </div>

              {/* Timer & Copy Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/[0.1]">
                  <span className={`font-mono text-lg font-black ${timerSeconds <= 30 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`}>
                    {formatTimer(timerSeconds)}
                  </span>
                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    className="p-1 rounded-lg hover:bg-white/[0.08] text-slate-300 transition"
                  >
                    {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => { setTimerRunning(false); setTimerSeconds(150); }}
                    className="p-1 rounded-lg hover:bg-white/[0.08] text-slate-300 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleCopyScript}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-semibold border border-white/[0.08] transition cursor-pointer"
                >
                  {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedScript ? 'Kopyalandı' : 'Kopyala'}</span>
                </button>
              </div>
            </div>

            {/* Cue Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {existingBlueprint.demoScript.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/20 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {step.timing}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {step.section}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed pt-1">
                    {step.whatToSayAndShow}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-12 text-center space-y-3">
          <FileCode2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Blueprint Bekleniyor</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Yukarıdaki "MVP Blueprintini Çıkar" butonuna tıklayarak sprint görevlerini ve 2.5 dk sunum metnini oluşturun.
          </p>
        </div>
      )}
    </div>
  );
}
