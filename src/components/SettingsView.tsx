import React, { useState } from 'react';
import { 
  Settings, Scale, Sparkles, RotateCcw, CheckCircle2, 
  AlertTriangle, Key 
} from 'lucide-react';
import { AppSettings, CriteriaWeights } from '../types';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  onResetData: () => void;
}

export default function SettingsView({
  settings,
  onUpdateSettings,
  onResetData,
}: SettingsViewProps) {
  const [weights, setWeights] = useState<CriteriaWeights>(settings.criteriaWeights);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(settings.isDemoMode);
  const [apiKey, setApiKey] = useState<string>(settings.apiKey || '');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const totalWeight = 
    Number(weights.clubValue) +
    Number(weights.novelty) +
    Number(weights.feasibility) +
    Number(weights.technicalAccessibility) +
    Number(weights.blockchainRelevance);

  const isWeightValid = totalWeight === 100;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isWeightValid) return;

    onUpdateSettings({
      criteriaWeights: {
        clubValue: Number(weights.clubValue),
        novelty: Number(weights.novelty),
        feasibility: Number(weights.feasibility),
        technicalAccessibility: Number(weights.technicalAccessibility),
        blockchainRelevance: Number(weights.blockchainRelevance),
      },
      aiProvider: isDemoMode ? 'demo' : 'gemini',
      apiKey,
      isDemoMode,
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 animate-slide-up max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Settings className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Konfigürasyon
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Platform Ayarları
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          IdeaScore kriter ağırlıklarını özelleştirin, yapay zeka modunu belirleyin veya örnek verileri sıfırlayın.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Criteria Weights Customizer */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-400" />
                IdeaScore Kriter Ağırlıkları
              </h2>
              <p className="text-xs text-slate-400">
                Tüm kriterlerin toplamı tam olarak %100 olmalıdır.
              </p>
            </div>

            <div className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 ${
              isWeightValid
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
            }`}>
              <span>Toplam Ağırlık:</span>
              <span>%{totalWeight}</span>
              {isWeightValid ? '✓' : '⚠️'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex justify-between font-bold text-slate-200">
                <span>1. Kulübe Fayda:</span>
                <span className="font-mono text-purple-400">%{weights.clubValue}</span>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={weights.clubValue}
                onChange={(e) => setWeights({ ...weights, clubValue: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-white"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex justify-between font-bold text-slate-200">
                <span>2. Özgünlük:</span>
                <span className="font-mono text-purple-400">%{weights.novelty}</span>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={weights.novelty}
                onChange={(e) => setWeights({ ...weights, novelty: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-white"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex justify-between font-bold text-slate-200">
                <span>3. Süre İçi Uygulanabilirlik:</span>
                <span className="font-mono text-purple-400">%{weights.feasibility}</span>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={weights.feasibility}
                onChange={(e) => setWeights({ ...weights, feasibility: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-white"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex justify-between font-bold text-slate-200">
                <span>4. Teknik Erişilebilirlik:</span>
                <span className="font-mono text-purple-400">%{weights.technicalAccessibility}</span>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={weights.technicalAccessibility}
                onChange={(e) => setWeights({ ...weights, technicalAccessibility: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-white"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 sm:col-span-2">
              <div className="flex justify-between font-bold text-slate-200">
                <span>5. Anlamlı Blokzincir Kullanımı:</span>
                <span className="font-mono text-purple-400">%{weights.blockchainRelevance}</span>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={weights.blockchainRelevance}
                onChange={(e) => setWeights({ ...weights, blockchainRelevance: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-white"
              />
            </div>
          </div>
        </div>

        {/* AI Mode Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Yapay Zeka Çalışma Modu
              </h2>
              <p className="text-xs text-slate-400">
                Demo modunda gerçekçi simülasyon yanıtları üretilir; sıfır API maliyeti.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div>
                <div className="font-bold text-white">Demo Modu (Simüle AI)</div>
                <div className="text-slate-400 text-[11px]">
                  İnternet bağlantısı veya API anahtarı gerekmez.
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDemoMode}
                  onChange={(e) => setIsDemoMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {!isDemoMode && (
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <label className="block text-slate-300 font-bold flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-amber-400" />
                  Gemini / OpenAI API Anahtarı
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy... veya sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-rose-950/30 text-slate-400 hover:text-rose-400 border border-slate-800 text-xs font-semibold transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Örnek Demo Verilerini Sıfırla
          </button>

          <button
            type="submit"
            disabled={!isWeightValid}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all duration-200 hover:scale-[1.02] cursor-pointer disabled:opacity-50"
          >
            Ayarları Kaydet
          </button>
        </div>

        {saveSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center animate-slide-up">
            ✓ Ayarlar başarıyla güncellendi!
          </div>
        )}
      </form>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="animate-scale-in bg-slate-900 border border-slate-700/80 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Demo Verilerini Sıfırla
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Tüm dokümanlar, fikirler, retrospektif kayıtları ve planlar varsayılan PRU Blockchain Kulübü başlangıç verilerine döndürülecektir. Devam etmek istiyor musunuz?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold"
              >
                Evet, Sıfırla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
