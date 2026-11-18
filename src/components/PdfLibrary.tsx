import React, { useState, useEffect } from 'react';
import { Download, Share2, Check, FileText, ArrowLeft, Eye, Sparkles, Images } from 'lucide-react';
import { pdfResources, pdfChapters, PdfCategory } from '../data/pdfResources';
import AnimatedProofs from './AnimatedProofs';

const getPdfIdFromLocation = () => {
  const pathMatch = window.location.pathname.match(/^\/pdfs\/([^/]+)\/?$/);
  const params = new URLSearchParams(window.location.search);
  const candidate = pathMatch?.[1] || params.get('pdf');
  if (candidate && pdfResources.some((p) => p.id === candidate && p.available)) {
    return candidate;
  }
  return null;
};

export default function PdfLibrary() {
  // Only open a specific PDF image reader if /pdfs/:id or ?pdf=... is in the URL or user clicks a file to View
  const [viewingPdfId, setViewingPdfId] = useState<string | null>(() => getPdfIdFromLocation());

  const [selectedChapterId, setSelectedChapterId] = useState<'all' | number>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | PdfCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [readerMode, setReaderMode] = useState<'animated' | 'pages'>('animated');

  // Sync URL and document.title with viewingPdfId using clean /pdfs/<id> paths
  useEffect(() => {
    if (viewingPdfId) {
      const targetUrl = `/pdfs/${viewingPdfId}${window.location.hash}`;
      if (window.location.pathname !== `/pdfs/${viewingPdfId}`) {
        window.history.replaceState({}, '', targetUrl);
      }
      const current = pdfResources.find((p) => p.id === viewingPdfId);
      if (current) {
        document.title = `${current.fileName} – Unlock Education`;
      }
    } else {
      const targetUrl = `/pdfs${window.location.hash}`;
      if (window.location.pathname !== '/pdfs' || window.location.search) {
        window.history.replaceState({}, '', targetUrl);
      }
      document.title = 'PDF Files – Unlock Education';
    }
  }, [viewingPdfId]);

  // Listen to browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setViewingPdfId(getPdfIdFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const getPublicOrigin = () => {
    const origin = window.location.origin;
    if (origin.includes('ais-dev-')) {
      return origin.replace('ais-dev-', 'ais-pre-');
    }
    return origin;
  };

  const handleCopyShareLink = (e: React.MouseEvent, pdfId: string) => {
    e.stopPropagation();
    const shareUrl = `${getPublicOrigin()}/pdfs/${pdfId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(pdfId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const viewingPdf = viewingPdfId
    ? pdfResources.find((p) => p.id === viewingPdfId && p.available) || null
    : null;

  // Dedicated Single-File Reader View (opened via direct share link or clicking a file)
  if (viewingPdf) {
    const isCopied = copiedId === viewingPdf.id;
    const showAnimated = viewingPdf.hasAnimatedSolutions && readerMode === 'animated';

    return (
      <div className="max-w-3xl mx-auto w-full space-y-4">
        {/* Minimalist Top Bar */}
        <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setViewingPdfId(null)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Files</span>
            </button>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 shrink-0" />
            <h2 className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white truncate">
              {viewingPdf.fileName}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {viewingPdf.hasAnimatedSolutions && (
              <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => setReaderMode('animated')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    readerMode === 'animated'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Animated</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReaderMode('pages')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    readerMode === 'pages'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Images className="w-3.5 h-3.5" />
                  <span>PDF Pages</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={(e) => handleCopyShareLink(e, viewingPdf.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
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
              href={viewingPdf.pdfUrl}
              download={viewingPdf.downloadName}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
          </div>
        </div>

        {/* Animated Line-by-Line Solutions OR PDF Pages */}
        {showAnimated ? (
          <AnimatedProofs />
        ) : (
          <div className="space-y-4">
            {viewingPdf.pages.map((pageUrl, idx) => (
              <div
                key={idx}
                className="w-full bg-white rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden"
              >
                <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-2 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 flex items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-800">
                  <span className="truncate">{viewingPdf.fileName}</span>
                  <span className="shrink-0">
                    Page {idx + 1} / {viewingPdf.pageCount}
                  </span>
                </div>
                <img
                  src={pageUrl}
                  alt={`${viewingPdf.fileName} - Page ${idx + 1}`}
                  loading={idx <= 1 ? 'eager' : 'lazy'}
                  className="w-full h-auto block"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Minimalist File List View (No page images shown here)
  const filteredFiles = pdfResources.filter(
    (p) =>
      (selectedChapterId === 'all' || p.chapterId === selectedChapterId) &&
      (selectedCategory === 'all' || p.category === selectedCategory)
  );

  const currentChapter =
    selectedChapterId === 'all'
      ? null
      : pdfChapters.find((c) => c.id === selectedChapterId);

  return (
    <div className="max-w-3xl mx-auto w-full space-y-4">
      {/* Header, Category Filter & Chapter Menu */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white">
              PDF Files
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Grade 12 Mathematics Past Papers — Questions & Solutions
            </p>
          </div>

          <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl self-start sm:self-auto">
            {(['all', 'questions', 'solutions'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Files' : cat === 'questions' ? 'Questions' : 'Solutions'}
              </button>
            ))}
          </div>
        </div>

        {/* Chapter Menu Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setSelectedChapterId('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              selectedChapterId === 'all'
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xs'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-300'
            }`}
          >
            All Chapters
          </button>
          {pdfChapters.map((ch) => {
            const hasAvailable = pdfResources.some((p) => p.chapterId === ch.id && p.available);
            const isSelected = selectedChapterId === ch.id;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => setSelectedChapterId(ch.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xs'
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
      </div>

      {/* Minimalist File List */}
      {filteredFiles.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/80 overflow-hidden">
          {filteredFiles.map((file) => {
            const isCopied = copiedId === file.id;
            return (
              <div
                key={file.id}
                onClick={() => {
                  if (!file.available) return;
                  setReaderMode(file.hasAnimatedSolutions ? 'animated' : 'pages');
                  setViewingPdfId(file.id);
                }}
                className={`px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  file.available
                    ? 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer'
                    : 'opacity-60'
                }`}
              >
                {/* Left: File Icon + Name + Meta */}
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 mt-0.5 sm:mt-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-white break-all">
                      {file.fileName}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 flex-wrap">
                      <span>Ch {file.chapterId}: {file.chapterTitle}</span>
                      <span>•</span>
                      <span>{file.category === 'questions' ? 'Questions Only' : 'Solutions'}</span>
                      {file.available ? (
                        <>
                          <span>•</span>
                          <span>{file.pageCount} Pages</span>
                        </>
                      ) : (
                        <>
                          <span>•</span>
                          <span className="text-amber-600 dark:text-amber-400 font-medium">
                            Coming Soon
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Minimalist Actions */}
                {file.available && (
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center flex-wrap">
                    {file.hasAnimatedSolutions && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setReaderMode('animated');
                          setViewingPdfId(file.id);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/50 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Animated</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setReaderMode(file.hasAnimatedSolutions ? 'pages' : 'animated');
                        setViewingPdfId(file.id);
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleCopyShareLink(e, file.id)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
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
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {currentChapter
              ? `Chapter ${currentChapter.id} (${currentChapter.title}) အတွက် PDF ဖိုင်များ မကြာမီ ထပ်တင်ပေးသွားပါမည်။`
              : 'PDF ဖိုင်များ မကြာမီ ထပ်တင်ပေးသွားပါမည်။'}
          </p>
        </div>
      )}
    </div>
  );
}
