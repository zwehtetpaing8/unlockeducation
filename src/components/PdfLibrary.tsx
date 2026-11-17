import React, { useState, useEffect } from 'react';
import { Download, Share2, Check, FileText } from 'lucide-react';
import { pdfResources, pdfChapters, PdfCategory } from '../data/pdfResources';

export default function PdfLibrary() {
  const [selectedPdfId, setSelectedPdfId] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const pdfParam = params.get('pdf');
    if (pdfParam && pdfResources.some((p) => p.id === pdfParam)) {
      return pdfParam;
    }
    return 'ch1-past-paper';
  });

  const initialPdf = pdfResources.find((p) => p.id === selectedPdfId) || pdfResources[0];
  const [selectedChapterId, setSelectedChapterId] = useState<number>(initialPdf.chapterId);
  const [selectedCategory, setSelectedCategory] = useState<'all' | PdfCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedPdf = pdfResources.find((p) => p.id === selectedPdfId) || pdfResources[0];

  // Keep URL synced with the currently selected PDF file so direct links always land on that exact file
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('view', 'pdfs');
    params.set('pdf', selectedPdfId);
    const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    window.history.replaceState({}, '', newUrl);
  }, [selectedPdfId]);

  const chapterFiles = pdfResources.filter(
    (p) =>
      p.chapterId === selectedChapterId &&
      (selectedCategory === 'all' || p.category === selectedCategory)
  );

  const handleSelectChapter = (chapterId: number) => {
    setSelectedChapterId(chapterId);
    const firstAvailableInChapter =
      pdfResources.find((p) => p.chapterId === chapterId && p.available) ||
      pdfResources.find((p) => p.chapterId === chapterId);
    if (firstAvailableInChapter) {
      setSelectedPdfId(firstAvailableInChapter.id);
    }
  };

  const getPublicOrigin = () => {
    const origin = window.location.origin;
    if (origin.includes('ais-dev-')) {
      return origin.replace('ais-dev-', 'ais-pre-');
    }
    return origin;
  };

  const handleCopyShareLink = (e: React.MouseEvent, pdfId: string) => {
    e.stopPropagation();
    const shareUrl = `${getPublicOrigin()}${window.location.pathname}?view=pdfs&pdf=${pdfId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(pdfId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const currentChapter = pdfChapters.find((c) => c.id === selectedChapterId);

  return (
    <div className="space-y-5 w-full max-w-full overflow-hidden">
      {/* Filter & File Selection Card */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
        {/* Chapter Tabs + Category Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white">
              Past Paper & Solution PDF Files
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select a chapter and file (Questions or Solutions) to read or download
            </p>
          </div>

          {/* File Type Filter (All / Questions / Solutions) */}
          <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto">
            {(['all', 'questions', 'solutions'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer capitalize ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Files' : cat === 'questions' ? 'Questions' : 'Solutions'}
              </button>
            ))}
          </div>
        </div>

        {/* Chapter Selector Pills */}
        <div className="flex flex-wrap gap-1.5">
          {pdfChapters.map((ch) => {
            const hasAvailable = pdfResources.some((p) => p.chapterId === ch.id && p.available);
            const isSelected = selectedChapterId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => handleSelectChapter(ch.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xs font-bold'
                    : hasAvailable
                    ? 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-300'
                    : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/60 dark:border-slate-800/50 text-slate-400 dark:text-slate-500'
                }`}
              >
                <span>Ch {ch.id}</span>
                <span className="hidden md:inline">: {ch.title}</span>
              </button>
            );
          })}
        </div>

        {/* Files inside the Selected Chapter (with Download & Share Buttons directly inside) */}
        {chapterFiles.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-1">
            {chapterFiles.map((file) => {
              const isSelected = file.id === selectedPdfId && selectedChapterId === file.chapterId;
              const isCopied = copiedId === file.id;
              return (
                <div
                  key={file.id}
                  onClick={() => setSelectedPdfId(file.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 ring-1 ring-indigo-500/30'
                      : 'bg-slate-50/70 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          file.category === 'questions'
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                        }`}
                      >
                        {file.category === 'questions' ? 'Questions Only' : 'Solutions'}
                      </span>
                      {file.available ? (
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          {file.pageCount} Pages
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white break-all">
                      {file.fileName}
                    </p>
                  </div>

                  {/* Action Buttons directly inside the file card */}
                  {file.available && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleCopyShareLink(e, file.id)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Share</span>
                          </>
                        )}
                      </button>

                      <a
                        href={file.pdfUrl}
                        download={file.downloadName}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 bg-slate-50/60 dark:bg-slate-950/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Chapter {selectedChapterId} ({currentChapter?.title}) အတွက် PDF ဖိုင်များ မကြာမီ ထပ်တင်ပေးသွားပါမည်။
            </p>
          </div>
        )}
      </div>

      {/* Rendered PDF Pages in Image View directly below */}
      {selectedChapterId === selectedPdf.chapterId && selectedPdf.available ? (
        <div className="space-y-4 max-w-3xl mx-auto w-full">
          {selectedPdf.pages.map((pageUrl, idx) => (
            <div
              key={idx}
              className="w-full bg-white rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              <div className="bg-slate-100 dark:bg-slate-800/90 px-4 py-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700">
                <span className="truncate">{selectedPdf.fileName}</span>
                <span className="shrink-0">Page {idx + 1} / {selectedPdf.pageCount}</span>
              </div>
              <img
                src={pageUrl}
                alt={`${selectedPdf.fileName} - Page ${idx + 1}`}
                loading={idx <= 1 ? 'eager' : 'lazy'}
                className="w-full h-auto block"
              />
            </div>
          ))}
        </div>
      ) : (
        selectedChapterId === selectedPdf.chapterId && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-10 text-center space-y-2 max-w-3xl mx-auto">
            <FileText className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200">
              {selectedPdf.fileName}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ဤဖိုင်ကို မကြာမီ ထပ်မံတင်ပေးသွားပါမည်။
            </p>
          </div>
        )
      )}
    </div>
  );
}
