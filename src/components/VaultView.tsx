import React, { useState } from 'react';
import { 
  Database, Search, Plus, Trash2, Calendar, 
  Sparkles, CheckCircle2, Send, FileText, ExternalLink, X
} from 'lucide-react';
import { ClubDocument, DocumentCategory } from '../types';
import { AIService } from '../services/ai';

interface VaultViewProps {
  documents: ClubDocument[];
  onAddDocument: (doc: Omit<ClubDocument, 'id' | 'createdAt'>) => void;
  onDeleteDocument: (id: string) => void;
  isDemoMode: boolean;
}

export default function VaultView({
  documents,
  onAddDocument,
  onDeleteDocument,
  isDemoMode,
}: VaultViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<ClubDocument | null>(null);

  // New Document form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<DocumentCategory>('Meeting Notes');
  const [newContent, setNewContent] = useState('');

  // AI Q&A
  const [qaQuestion, setQaQuestion] = useState('');
  const [qaLoading, setQaLoading] = useState(false);
  const [qaResult, setQaResult] = useState<{ answer: string; citations: string[]; isSimulated: boolean } | null>(null);

  const categories: { id: DocumentCategory | 'All'; label: string }[] = [
    { id: 'All', label: 'Tüm Arşiv' },
    { id: 'Meeting Notes', label: '📋 Toplantı Notları' },
    { id: 'Projects', label: '🚀 Proje Kayıtları' },
    { id: 'Decisions', label: '⚖️ Kararlar & Tüzük' },
    { id: 'Education', label: '🎓 Eğitim & Araştırma' },
  ];

  const quickQuestions = [
    '2026 Stratejik hedefleri neler?',
    'Solidity eğitiminde ne yaşandı?',
    'Liman hackathonunda dikkat edilecek kurallar?'
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaQuestion.trim()) return;
    setQaLoading(true);
    setQaResult(null);

    try {
      const res = await AIService.askKnowledge(qaQuestion, documents);
      setQaResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setQaLoading(false);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    onAddDocument({
      title: newTitle,
      category: newCategory,
      date: new Date().toISOString().split('T')[0],
      tags: ['arşiv', newCategory.toLowerCase()],
      content: newContent,
      author: 'PRU Üyesi'
    });

    setNewTitle('');
    setNewContent('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <Database className="w-3 h-3" />
            Club Knowledge Vault
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Kurumsal Hafıza & Arşiv
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Geçmiş kulüp kararları, toplantı tutanakları ve yapay zeka arşivi.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Hafızaya Not Ekle
        </button>
      </div>

      {/* AI Q&A Prompt Bar */}
      <div className="glass-card rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Kulüp Hafızasına Sor (Instant Q&A)</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 font-bold">
            {isDemoMode ? 'Demo Veri Tabanı' : 'LLM Live'}
          </span>
        </div>

        <form onSubmit={handleAskQuestion} className="flex gap-2">
          <input
            type="text"
            placeholder="Arşivdeki belgelerden öğrenmek istediğiniz konuyu yazın..."
            value={qaQuestion}
            onChange={(e) => setQaQuestion(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={qaLoading}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shrink-0"
          >
            {qaLoading ? (
              <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            Sor
          </button>
        </form>

        {/* Quick Question Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setQaQuestion(q)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 hover:text-slate-200 border border-white/[0.05] transition cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Q&A Result */}
        {qaResult && (
          <div className="mt-3 p-4 rounded-xl bg-white/[0.02] border border-cyan-500/30 space-y-2 text-xs animate-slide-up">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Hafızadan Alınan Yanıt:
              </span>
              {qaResult.citations.length > 0 && (
                <span className="text-[10px] font-mono text-slate-400">
                  📄 {qaResult.citations.join(', ')}
                </span>
              )}
            </div>
            <p className="text-slate-200 leading-relaxed">{qaResult.answer}</p>
          </div>
        )}
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-950 font-bold shadow-md'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Dokümanlarda ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                  {doc.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {doc.date}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                {doc.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {doc.content}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <button
                onClick={() => setViewingDoc(doc)}
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                Görüntüle <ExternalLink className="w-3 h-3" />
              </button>

              <button
                onClick={() => onDeleteDocument(doc.id)}
                className="text-slate-600 hover:text-rose-400 transition"
                title="Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Document Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="glass-card rounded-3xl p-6 max-w-2xl w-full space-y-4 max-h-[80vh] flex flex-col border border-white/[0.1] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400">{viewingDoc.category}</span>
                <h2 className="text-base font-black text-white">{viewingDoc.title}</h2>
              </div>
              <button onClick={() => setViewingDoc(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto text-xs text-slate-200 leading-relaxed whitespace-pre-wrap pr-2">
              {viewingDoc.content}
            </div>

            <div className="border-t border-white/[0.06] pt-3 flex justify-end">
              <button
                onClick={() => setViewingDoc(null)}
                className="px-4 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="glass-card rounded-3xl p-6 max-w-lg w-full space-y-4 border border-white/[0.1] shadow-2xl">
            <h2 className="text-base font-black text-white">Hafızaya Doküman Ekle</h2>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Başlık</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 2026 Liman Hackathon Kararları"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Kategori</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="Meeting Notes">Toplantı Notları</option>
                  <option value="Projects">Proje Kayıtları</option>
                  <option value="Decisions">Kararlar & Tüzük</option>
                  <option value="Education">Eğitim & Araştırma</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">İçerik / Notlar</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Toplantıda alınan kararlar, kritik bulgular..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-cyan-400"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
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
