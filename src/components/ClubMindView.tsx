import React, { useState } from 'react';
import { 
  Database, Search, Plus, Upload, Trash2, Eye, Tag, Calendar, 
  MessageSquare, Sparkles, AlertCircle, FileText, CheckCircle2, X 
} from 'lucide-react';
import { ClubDocument, DocumentCategory } from '../types';
import { AIService } from '../services/ai';

interface ClubMindViewProps {
  documents: ClubDocument[];
  onAddDocument: (doc: Omit<ClubDocument, 'id' | 'createdAt'>) => void;
  onDeleteDocument: (id: string) => void;
  isDemoMode: boolean;
}

export default function ClubMindView({
  documents,
  onAddDocument,
  onDeleteDocument,
  isDemoMode,
}: ClubMindViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<ClubDocument | null>(null);

  // New Document form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<DocumentCategory>('Meeting Notes');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTags, setNewTags] = useState('');
  const [newContent, setNewContent] = useState('');
  const [fileError, setFileError] = useState('');

  // Q&A Interface state
  const [qaQuestion, setQaQuestion] = useState('');
  const [qaLoading, setQaLoading] = useState(false);
  const [qaResult, setQaResult] = useState<{ answer: string; citations: string[]; isSimulated: boolean } | null>(null);

  const categories: (DocumentCategory | 'All')[] = [
    'All', 'Meeting Notes', 'Projects', 'Research', 'Decisions', 'Education'
  ];

  // Filtered documents
  const filteredDocs = documents.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setNewContent(text);
        if (!newTitle) {
          setNewTitle(file.name.replace(/\.[^/.]+$/, ''));
        }
      };
      reader.readAsText(file);
    } else {
      setFileError('Bu sürümde yalnızca TXT ve Markdown (.md) metin dosyalarının içeriği doğrudan çıkarılabilmektedir.');
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    onAddDocument({
      title: newTitle,
      category: newCategory,
      date: newDate,
      tags: tagsArray.length > 0 ? tagsArray : ['genel'],
      content: newContent,
      author: 'Kulüp Üyesi'
    });

    // Reset form
    setNewTitle('');
    setNewTags('');
    setNewContent('');
    setShowAddModal(false);
  };

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

  const quickQuestions = [
    'Kulübün 2026 stratejik hedefleri nelerdir?',
    'Solidity eğitiminde öğrenciler en çok neyde zorlandı?',
    'DAO oylamalarında gaz masrafı katılımı nasıl etkiliyor?'
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Database className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Kulüp Dijital Hafızası
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            ClubMind Kurumsal Hafıza & Notlar
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Piri Reis Üniversitesi Blockchain Kulübü'nün geçmiş kararlarını, toplantı tutanaklarını ve eğitim raporlarını koruyun.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Yeni Doküman / Not Ekle
        </button>
      </div>

      {/* Ask ClubMind (AI Q&A Assistant) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white">
              ClubMind AI Soru-Cevap Motoru
            </h2>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            {isDemoMode ? 'Simüle AI Motoru' : 'Canlı LLM'}
          </span>
        </div>

        <p className="text-xs text-slate-300">
          Kulüp arşivindeki dokümanlara dayanarak sorular sorun. Yapay zeka yanıtını sadece mevcut belgelere dayandırır ve kaynak gösterir.
        </p>

        <form onSubmit={handleAskQuestion} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Örn: 2026 yılı hedefleri neler veya sponsorların beklentisi neydi?"
            value={qaQuestion}
            onChange={(e) => setQaQuestion(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={qaLoading}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
          >
            {qaLoading ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <MessageSquare className="w-4 h-4" />
            )}
            Soruyu Yanıtla
          </button>
        </form>

        {/* Quick Question Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
          <span className="text-slate-500">Hızlı Sorular:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQaQuestion(q);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Q&A Result Box */}
        {qaResult && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-3 animate-fadeIn text-xs">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Kulüp Dokümanlarına Dayalı Yanıt:
              </span>
              {qaResult.isSimulated && (
                <span className="text-[10px] text-amber-400 font-mono bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                  Demo Modu Simülasyonu
                </span>
              )}
            </div>

            <p className="text-slate-200 whitespace-pre-line leading-relaxed">
              {qaResult.answer}
            </p>

            {qaResult.citations.length > 0 && (
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Kaynak Gösterilen Dokümanlar:</span>
                {qaResult.citations.map((cite, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800 font-mono">
                    📄 {cite}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat === 'All' ? 'Tüm Dokümanlar' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Başlık, içerik veya etiket ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-slate-500 bg-slate-900/40 rounded-3xl border border-slate-800/80">
            Arama kriterinize uygun doküman bulunamadı.
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition shadow-md group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    {doc.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {doc.date}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition line-clamp-2">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {doc.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {doc.tags.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="text-[10px] text-slate-400 font-mono">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewingDoc(doc)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                    title="Detay Görüntüle"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteDocument(doc.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
                    title="Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Kulüp Hafızasına Yeni Doküman Ekle</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Doküman Başlığı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 2026 Bahar Dönemi Hackathon Hazırlık Notları"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Kategori</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as DocumentCategory)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  >
                    <option value="Meeting Notes">Meeting Notes (Toplantı)</option>
                    <option value="Projects">Projects (Proje)</option>
                    <option value="Research">Research (Araştırma)</option>
                    <option value="Decisions">Decisions (Kararlar)</option>
                    <option value="Education">Education (Eğitim)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tarih</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Etiketler (Virgülle ayırın)</label>
                <input
                  type="text"
                  placeholder="hackathon, sponsor, butce, solidity"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              {/* File upload shortcut */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">TXT veya Markdown Dosyası Yükle:</span>
                  <label className="cursor-pointer text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    Dosya Seç
                    <input
                      type="file"
                      accept=".txt,.md"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {fileError && (
                  <p className="text-[11px] text-rose-400">{fileError}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Doküman İçeriği *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Toplantıda alınan kararlar, çıkarılan dersler veya proje detayları..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer"
                >
                  Hafızaya Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Document Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {viewingDoc.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {viewingDoc.title}
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  Tarih: {viewingDoc.date} • Ekleyen: {viewingDoc.author || 'Kulüp'}
                </div>
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans">
              {viewingDoc.content}
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <div className="flex gap-1.5">
                {viewingDoc.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
