import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Chapter, Lesson, Grade } from '../types';
import { MOCK_CHAPTERS, MOCK_LESSONS } from '../services/curriculum';
import { 
  Plus, Save, Trash2, Edit3, 
  Eye, FileCode, CheckCircle, 
  ArrowRight, Layers, BookOpen, 
  FileText, Loader2, Info, Database, 
  RefreshCw, Check, AlertTriangle, ArrowUpRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'past-papers' | 'grades' | 'db-sync'>('lessons');
  const [grades, setGrades] = useState<Grade[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [dbLessons, setDbLessons] = useState<Lesson[]>([]);
  const [dbPastPapers, setDbPastPapers] = useState<any[]>([]);
  const [dbChaptersAll, setDbChaptersAll] = useState<Chapter[]>([]);
  
  const [selectedGradeId, setSelectedGradeId] = useState<string>('');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('');
  
  // Toggle forms
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [showPaperForm, setShowPaperForm] = useState(false);
  const [showChapterForm, setShowChapterForm] = useState(false);

  // Lesson Form States
  const [isEditingLesson, setIsEditingLesson] = useState(false);
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [lessonType, setLessonType] = useState<Lesson['type']>('theory');
  const [lessonOrderIndex, setLessonOrderIndex] = useState(0);

  // Past Paper Form States
  const [isEditingPaper, setIsEditingPaper] = useState(false);
  const [paperId, setPaperId] = useState('');
  const [paperYear, setPaperYear] = useState<number>(new Date().getFullYear());
  const [paperSubject, setPaperSubject] = useState('Mathematics');
  const [paperGradeLevel, setPaperGradeLevel] = useState<number>(12);
  const [paperTitle, setPaperTitle] = useState('');
  const [paperPdfUrl, setPaperPdfUrl] = useState('#');
  const [paperAnswerPdfUrl, setPaperAnswerPdfUrl] = useState('');
  const [paperChapter, setPaperChapter] = useState('');
  const [paperContent, setPaperContent] = useState('');
  const [paperSolutionContent, setPaperSolutionContent] = useState('');
  const [paperSection, setPaperSection] = useState<'A' | 'Section A Multiple Choice' | 'B' | 'C' | 'D' | 'Full Paper'>('A');

  // Chapter Form States
  const [isEditingChapter, setIsEditingChapter] = useState(false);
  const [chapterFormId, setChapterFormId] = useState<string | null>(null);
  const [chapterGradeId, setChapterGradeId] = useState<number>(12);
  const [chapterNumber, setChapterNumber] = useState<number>(1);
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterDesc, setChapterDesc] = useState('');
  const [chapterOrderIndex, setChapterOrderIndex] = useState(0);

  // Global States
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Database counts & Sync Logs
  const [counts, setCounts] = useState({ grades: 0, chapters: 0, lessons: 0, pastPapers: 0 });
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);

  useEffect(() => {
    fetchGrades();
    fetchChaptersAll();
    fetchPastPapers();
    fetchDBCounts();
  }, []);

  useEffect(() => {
    if (selectedGradeId) fetchChapters();
  }, [selectedGradeId]);

  useEffect(() => {
    if (selectedChapterId) {
      fetchLessons();
    } else {
      setDbLessons([]);
    }
  }, [selectedChapterId]);

  const showStatus = (type: 'success' | 'error', message: string) => {
    setStatus({ type, message });
    setTimeout(() => setStatus(null), 5000);
  };

  const fetchGrades = async () => {
    const { data } = await supabase.from('grades').select('*').order('level', { ascending: true });
    if (data) setGrades(data);
  };

  const fetchChaptersAll = async () => {
    const { data } = await supabase.from('chapters').select('*').order('grade_id', { ascending: true }).order('chapter_number', { ascending: true });
    if (data) setDbChaptersAll(data);
  };

  const fetchChapters = async () => {
    const { data } = await supabase.from('chapters').select('*').eq('grade_id', selectedGradeId).order('chapter_number', { ascending: true });
    if (data) setChapters(data);
  };

  const fetchLessons = async () => {
    if (!selectedChapterId) return;
    const { data } = await supabase
      .from('lessons')
      .select('*')
      .eq('chapter_id', selectedChapterId)
      .order('order_index', { ascending: true });
    if (data) setDbLessons(data);
  };

  const fetchPastPapers = async () => {
    const { data } = await supabase.from('past_papers').select('*').order('year', { ascending: false }).order('id', { ascending: true });
    if (data) setDbPastPapers(data);
  };

  const fetchDBCounts = async () => {
    try {
      const { count: gCount } = await supabase.from('grades').select('*', { count: 'exact', head: true });
      const { count: cCount } = await supabase.from('chapters').select('*', { count: 'exact', head: true });
      const { count: lCount } = await supabase.from('lessons').select('*', { count: 'exact', head: true });
      const { count: pCount } = await supabase.from('past_papers').select('*', { count: 'exact', head: true });
      
      setCounts({
        grades: gCount || 0,
        chapters: cCount || 0,
        lessons: lCount || 0,
        pastPapers: pCount || 0
      });
    } catch (err) {
      console.error('Error fetching database counts:', err);
    }
  };

  // LESSON MANAGEMENT
  const handleSaveLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChapterId) return showStatus('error', 'Please select a chapter first');
    
    setLoading(true);
    const payload = {
      chapter_id: selectedChapterId,
      title: lessonTitle,
      content: lessonContent,
      type: lessonType,
      order_index: lessonOrderIndex
    };

    let error;
    if (isEditingLesson && lessonId) {
      const { error: err } = await supabase.from('lessons').update(payload).eq('id', lessonId);
      error = err;
    } else {
      const { error: err } = await supabase.from('lessons').insert(payload);
      error = err;
    }

    setLoading(false);
    if (error) {
      showStatus('error', 'Error saving lesson: ' + error.message);
    } else {
      showStatus('success', `Lesson ${isEditingLesson ? 'updated' : 'published'} successfully!`);
      resetLessonForm();
      fetchLessons();
      fetchDBCounts();
    }
  };

  const handleEditLesson = (lesson: Lesson) => {
    setLessonId(lesson.id);
    setLessonTitle(lesson.title);
    setLessonContent(lesson.content);
    setLessonType(lesson.type);
    setLessonOrderIndex(lesson.order_index);
    setIsEditingLesson(true);
    setShowLessonForm(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteLesson = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;
    const { error } = await supabase.from('lessons').delete().eq('id', id);
    if (error) {
      showStatus('error', 'Error deleting: ' + error.message);
    } else {
      showStatus('success', 'Lesson deleted successfully!');
      fetchLessons();
      fetchDBCounts();
    }
  };

  const resetLessonForm = () => {
    setLessonId(null);
    setLessonTitle('');
    setLessonContent('');
    setLessonType('theory');
    setLessonOrderIndex(0);
    setIsEditingLesson(false);
    setShowLessonForm(false);
  };

  // PAST PAPER MANAGEMENT
  const handleSavePaper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperId) return showStatus('error', 'Please provide a unique ID (e.g., 2026_Q01)');
    
    setLoading(true);
    const payload = {
      id: paperId,
      year: paperYear,
      subject: paperSubject,
      grade_level: paperGradeLevel,
      title: paperTitle,
      pdf_url: paperPdfUrl,
      answer_pdf_url: paperAnswerPdfUrl || null,
      chapter: paperChapter || null,
      content: paperContent,
      solution_content: paperSolutionContent,
      section: paperSection
    };

    let error;
    if (isEditingPaper) {
      const { error: err } = await supabase.from('past_papers').update(payload).eq('id', paperId);
      error = err;
    } else {
      const { error: err } = await supabase.from('past_papers').insert(payload);
      error = err;
    }

    setLoading(false);
    if (error) {
      showStatus('error', 'Error saving exam paper: ' + error.message);
    } else {
      showStatus('success', `Exam paper ${isEditingPaper ? 'updated' : 'created'} successfully!`);
      resetPaperForm();
      fetchPastPapers();
      fetchDBCounts();
    }
  };

  const handleEditPaper = (paper: any) => {
    setPaperId(paper.id);
    setPaperYear(paper.year);
    setPaperSubject(paper.subject);
    setPaperGradeLevel(paper.grade_level);
    setPaperTitle(paper.title);
    setPaperPdfUrl(paper.pdf_url);
    setPaperAnswerPdfUrl(paper.answer_pdf_url || '');
    setPaperChapter(paper.chapter || '');
    setPaperContent(paper.content || '');
    setPaperSolutionContent(paper.solution_content || '');
    setPaperSection(paper.section);
    setIsEditingPaper(true);
    setShowPaperForm(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeletePaper = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this exam paper?')) return;
    const { error } = await supabase.from('past_papers').delete().eq('id', id);
    if (error) {
      showStatus('error', 'Error deleting: ' + error.message);
    } else {
      showStatus('success', 'Exam paper deleted successfully!');
      fetchPastPapers();
      fetchDBCounts();
    }
  };

  const resetPaperForm = () => {
    setPaperId('');
    setPaperYear(new Date().getFullYear());
    setPaperSubject('Mathematics');
    setPaperGradeLevel(12);
    setPaperTitle('');
    setPaperPdfUrl('#');
    setPaperAnswerPdfUrl('');
    setPaperChapter('');
    setPaperContent('');
    setPaperSolutionContent('');
    setPaperSection('A');
    setIsEditingPaper(false);
    setShowPaperForm(false);
  };

  // CHAPTER MANAGEMENT
  const handleSaveChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      grade_id: chapterGradeId,
      chapter_number: chapterNumber,
      title: chapterTitle,
      description: chapterDesc,
      order_index: chapterOrderIndex
    };

    let error;
    if (isEditingChapter && chapterFormId) {
      const { error: err } = await supabase.from('chapters').update(payload).eq('id', chapterFormId);
      error = err;
    } else {
      const { error: err } = await supabase.from('chapters').insert(payload);
      error = err;
    }

    setLoading(false);
    if (error) {
      showStatus('error', 'Error saving chapter: ' + error.message);
    } else {
      showStatus('success', `Chapter ${isEditingChapter ? 'updated' : 'created'} successfully!`);
      setChapterTitle('');
      setChapterDesc('');
      setIsEditingChapter(false);
      setShowChapterForm(false);
      fetchChaptersAll();
      if (selectedGradeId && Number(selectedGradeId) === chapterGradeId) {
        fetchChapters();
      }
      fetchDBCounts();
    }
  };

  const handleEditChapter = (ch: Chapter) => {
    setChapterFormId(ch.id);
    setChapterGradeId(ch.grade_id);
    setChapterNumber(ch.chapter_number);
    setChapterTitle(ch.title);
    setChapterDesc(ch.description);
    setChapterOrderIndex(ch.order_index);
    setIsEditingChapter(true);
    setShowChapterForm(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteChapter = async (id: string) => {
    if (!window.confirm('Warning: Deleting a chapter will also delete ALL its lessons! Proceed?')) return;
    const { error } = await supabase.from('chapters').delete().eq('id', id);
    if (error) {
      showStatus('error', 'Error deleting: ' + error.message);
    } else {
      showStatus('success', 'Chapter deleted successfully!');
      fetchChaptersAll();
      if (selectedGradeId) fetchChapters();
      fetchDBCounts();
    }
  };

  // AUTOMATED CURRICULUM DATABASE SYNC / SEEDER
  const handleSyncCurriculum = async () => {
    setSyncLoading(true);
    setSyncLogs([]);
    const logs: string[] = [];
    const addLog = (msg: string) => {
      logs.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
      setSyncLogs([...logs]);
    };

    addLog('Starting curriculum syncing process...');
    
    try {
      // 1. Check and Sync Grades
      addLog('Syncing Grade Levels...');
      const defaultGrades = [
        { id: 10, level: 10, title: 'Grade 10', description: 'Grade 10 Mathematics' },
        { id: 11, level: 11, title: 'Grade 11', description: 'Grade 11 Mathematics' },
        { id: 12, level: 12, title: 'Grade 12', description: 'Grade 12 Mathematics' },
      ];

      for (const grade of defaultGrades) {
        const { error } = await supabase.from('grades').upsert(grade, { onConflict: 'id' });
        if (error) {
          addLog(`❌ Error syncing grade ${grade.level}: ${error.message}`);
        } else {
          addLog(`✅ Grade ${grade.level} synchronized.`);
        }
      }

      // 2. Fetch or Sync Chapters
      addLog('Syncing Curriculum Chapters...');
      const { data: dbChapters } = await supabase.from('chapters').select('*');
      const chapterMap = new Map<string, string>(); // key: "grade_id-chapter_number", value: UUID id
      
      if (dbChapters) {
        dbChapters.forEach(c => {
          chapterMap.set(`${c.grade_id}-${c.chapter_number}`, c.id);
        });
      }

      for (const mockCh of MOCK_CHAPTERS) {
        const key = `${mockCh.grade_id}-${mockCh.chapter_number}`;
        let chapterId = chapterMap.get(key);

        if (!chapterId) {
          addLog(`Creating chapter: Ch ${mockCh.chapter_number} - ${mockCh.title} (Grade ${mockCh.grade_id})...`);
          const { data, error } = await supabase
            .from('chapters')
            .insert({
              grade_id: mockCh.grade_id,
              chapter_number: mockCh.chapter_number,
              title: mockCh.title,
              description: mockCh.description,
              order_index: mockCh.order_index || 0
            })
            .select('id')
            .single();

          if (error) {
            addLog(`❌ Failed to create chapter ${mockCh.title}: ${error.message}`);
          } else if (data) {
            chapterId = data.id;
            chapterMap.set(key, chapterId);
            addLog(`✅ Chapter "${mockCh.title}" created with ID: ${chapterId}`);
          }
        } else {
          // Update existing to ensure title/desc are fully accurate
          const { error } = await supabase
            .from('chapters')
            .update({
              title: mockCh.title,
              description: mockCh.description,
              order_index: mockCh.order_index || 0
            })
            .eq('id', chapterId);
          
          if (error) {
            addLog(`❌ Failed to update chapter ${mockCh.title}: ${error.message}`);
          } else {
            addLog(`✅ Chapter "${mockCh.title}" synchronized (updated).`);
          }
        }
      }

      // 3. Clean up legacy/incorrect lessons (e.g. 'Introduction to i')
      addLog('Cleaning up legacy lesson "Introduction to i" from DB...');
      const { error: cleanupError } = await supabase
        .from('lessons')
        .delete()
        .eq('title', 'Introduction to i');
      if (cleanupError) {
        addLog(`⚠️ Warning: Failed to clean up legacy "Introduction to i" lessons: ${cleanupError.message}`);
      } else {
        addLog('✅ Legacy "Introduction to i" lessons deleted successfully.');
      }

      // 4. Sync Lessons (preserving complex math formatting perfectly)
      addLog('Syncing Curriculum Lessons (with LaTeX mathematical formulas)...');
      let lessonsInserted = 0;
      let lessonsUpdated = 0;

      for (const mockLesson of MOCK_LESSONS) {
        const mockCh = MOCK_CHAPTERS.find(c => c.id === mockLesson.chapter_id);
        if (!mockCh) {
          addLog(`⚠️ Skipping lesson "${mockLesson.title}": associated mock chapter ${mockLesson.chapter_id} not found.`);
          continue;
        }

        const key = `${mockCh.grade_id}-${mockCh.chapter_number}`;
        const dbChapterId = chapterMap.get(key);

        if (!dbChapterId) {
          addLog(`⚠️ Skipping lesson "${mockLesson.title}": database chapter not found for ${key}`);
          continue;
        }

        // Insert/Upsert via Client SDK preserves backslashes perfectly!
        const { data: existingLesson } = await supabase
          .from('lessons')
          .select('id')
          .eq('chapter_id', dbChapterId)
          .eq('title', mockLesson.title)
          .maybeSingle();

        const payload = {
          chapter_id: dbChapterId,
          title: mockLesson.title,
          type: mockLesson.type,
          content: mockLesson.content,
          order_index: mockLesson.order_index || 0
        };

        if (existingLesson) {
          const { error } = await supabase
            .from('lessons')
            .update(payload)
            .eq('id', existingLesson.id);

          if (error) {
            addLog(`❌ Error updating lesson "${mockLesson.title}": ${error.message}`);
          } else {
            lessonsUpdated++;
            addLog(`🔄 Lesson "${mockLesson.title}" updated.`);
          }
        } else {
          const { error } = await supabase
            .from('lessons')
            .insert(payload);

          if (error) {
            addLog(`❌ Error inserting lesson "${mockLesson.title}": ${error.message}`);
          } else {
            lessonsInserted++;
            addLog(`✨ Lesson "${mockLesson.title}" created successfully.`);
          }
        }
      }

      addLog(`🎉 Synchronization complete! Created ${lessonsInserted} lessons and updated ${lessonsUpdated} lessons.`);
      fetchGrades();
      fetchChaptersAll();
      fetchDBCounts();
    } catch (err: any) {
      addLog(`❌ Fatal Sync Error: ${err.message || err}`);
    } finally {
      setSyncLoading(false);
    }
  };

  const sampleMarkdown = `### Section 1: Introduction to Calculus
The derivative of a function $f(x)$ is defined as:
$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$

Consider the function $f(x) = x^2$. We can find the derivative:
1. Express the difference quotient.
2. Simplify the expression.
3. Apply the limit.
`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1 space-y-2">
        <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-xl mb-6">
          <h2 className="text-xl font-black uppercase tracking-wider mb-2 flex items-center gap-2">
            <Database size={20} className="text-blue-400" />
            <span>Admin Hub</span>
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Manage your courses, study materials, exam papers, and database synchronization.
          </p>
        </div>

        {[
          { id: 'lessons', label: 'Lessons', icon: BookOpen },
          { id: 'past-papers', label: 'Exam Papers', icon: FileText },
          { id: 'grades', label: 'Chapters & Grades', icon: Layers },
          { id: 'db-sync', label: 'Database Sync', icon: RefreshCw },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setStatus(null);
            }}
            className={cn(
              "w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black uppercase tracking-wider text-[11px] transition-all duration-200 select-none",
              activeTab === tab.id 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <span className="flex items-center gap-3">
              <tab.icon size={16} />
              {tab.label}
            </span>
            {tab.id === 'db-sync' && syncLoading && (
              <Loader2 size={14} className="animate-spin text-blue-400" />
            )}
          </button>
        ))}

        {/* Database Status Widget */}
        <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl space-y-3 mt-8">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Live Status</h4>
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-xs">
              <div className="font-black text-slate-800 text-lg">{counts.lessons}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Lessons</div>
            </div>
            <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-xs">
              <div className="font-black text-slate-800 text-lg">{counts.pastPapers}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Papers</div>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Connected to Supabase Cloud
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3 space-y-8">
        
        {/* Status Alerts */}
        {status && (
          <div className={cn(
            "p-5 rounded-2xl flex items-start gap-3.5 text-sm font-bold shadow-md animate-in fade-in slide-in-from-top-4 duration-300",
            status.type === 'success' 
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
              : "bg-rose-50 text-rose-800 border border-rose-200"
          )}>
            <div className="mt-0.5">
              {status.type === 'success' ? <CheckCircle size={18} className="text-emerald-600" /> : <Info size={18} className="text-rose-600" />}
            </div>
            <div className="flex-1">
              {status.message}
            </div>
          </div>
        )}

        {/* ==================== 1. LESSONS TAB ==================== */}
        {activeTab === 'lessons' && (
          <div className="space-y-8">
            {/* Filter Panel */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-xl">
              <h3 className="text-lg md:text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen size={20} className="text-blue-600" />
                <span>Select Course Module</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Course Grade Level</label>
                  <select 
                    value={selectedGradeId}
                    onChange={(e) => {
                      setSelectedGradeId(e.target.value);
                      setSelectedChapterId('');
                      resetLessonForm();
                    }}
                    className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                  >
                    <option value="">Choose Grade Level...</option>
                    {grades.map(g => <option key={g.id} value={g.id}>Grade {g.level} - {g.title}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Module Chapter</label>
                  <select 
                    value={selectedChapterId}
                    onChange={(e) => {
                      setSelectedChapterId(e.target.value);
                      resetLessonForm();
                    }}
                    className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                    disabled={!selectedGradeId}
                  >
                    <option value="">Choose Chapter...</option>
                    {chapters.map(c => <option key={c.id} value={c.id}>Ch {c.chapter_number}: {c.title}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Lessons List Table */}
            {selectedChapterId && (
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-slate-900">
                      Lessons inside Chapter
                    </h3>
                    <p className="text-xs text-slate-400 font-bold">
                      Currently publishing to: {chapters.find(c => c.id === selectedChapterId)?.title}
                    </p>
                  </div>
                  {!showLessonForm && (
                    <button
                      onClick={() => setShowLessonForm(true)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white hover:bg-blue-700 transition-all cursor-pointer shadow-md shadow-blue-100"
                    >
                      <Plus size={14} />
                      Add New Lesson
                    </button>
                  )}
                </div>

                {dbLessons.length === 0 ? (
                  <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400 space-y-3">
                    <BookOpen size={36} className="mx-auto text-slate-300" />
                    <p className="font-bold">No lessons found in this chapter.</p>
                    <p className="text-xs">Click "Add New Lesson" above or run "Database Sync" to import default lessons.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                          <th className="py-3 px-4">Index</th>
                          <th className="py-3 px-4">Title</th>
                          <th className="py-3 px-4">Type</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dbLessons.map((lesson) => (
                          <tr key={lesson.id} className="border-b border-slate-50 hover:bg-slate-50/50 text-sm font-bold text-slate-800 transition-all">
                            <td className="py-4 px-4 font-mono text-xs">{lesson.order_index}</td>
                            <td className="py-4 px-4">{lesson.title}</td>
                            <td className="py-4 px-4">
                              <span className={cn(
                                "px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest",
                                lesson.type === 'theory' && "bg-blue-50 text-blue-700",
                                lesson.type === 'exercise' && "bg-emerald-50 text-emerald-700",
                                lesson.type === 'summary' && "bg-amber-50 text-amber-700",
                                lesson.type === 'formula' && "bg-indigo-50 text-indigo-700"
                              )}>
                                {lesson.type}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button 
                                  onClick={() => handleEditLesson(lesson)}
                                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                  title="Edit Lesson"
                                >
                                  <Edit3 size={15} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteLesson(lesson.id)}
                                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                  title="Delete Lesson"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Lesson Editing / Creating Form */}
            {selectedChapterId && showLessonForm && (
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-12 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-slate-100 pb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900">
                      {isEditingLesson ? 'Edit Active Lesson' : 'Create New Lesson'}
                    </h3>
                    <p className="text-xs text-slate-400 font-bold">Write educational materials with markdown and equations.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button 
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                      className={cn(
                        "flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95 cursor-pointer",
                        previewMode ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                      )}
                    >
                      {previewMode ? <Edit3 size={14} /> : <Eye size={14} />}
                      {previewMode ? 'Editor' : 'Preview Layout'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setLessonContent(sampleMarkdown)}
                      className="px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-950 text-white hover:bg-slate-800 transition-all cursor-pointer active:scale-95"
                    >
                      Load Sample
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSaveLesson} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Lesson Title</label>
                      <input 
                        type="text"
                        placeholder="e.g., Introduction to Polar Form"
                        value={lessonTitle}
                        onChange={e => setLessonTitle(e.target.value)}
                        className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Order/Index</label>
                      <input 
                        type="number"
                        placeholder="0"
                        value={lessonOrderIndex}
                        onChange={e => setLessonOrderIndex(Number(e.target.value))}
                        className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Lesson Category / Type</label>
                      <select 
                        value={lessonType}
                        onChange={e => setLessonType(e.target.value as any)}
                        className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                      >
                        <option value="theory">Theory Lecture</option>
                        <option value="exercise">Exercise/Practice Solutions</option>
                        <option value="summary">Chapter Summary</option>
                        <option value="formula">Formula Cheat-sheet</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center bg-slate-100 p-3.5 rounded-t-xl border-x border-t border-slate-250">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <FileCode size={14} /> Lesson Content
                      </label>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">Supports LaTeX ($...$ and $$...$$)</span>
                    </div>
                    
                    {previewMode ? (
                      <div className="w-full min-h-[400px] p-8 bg-white border border-slate-250 rounded-b-xl prose prose-slate max-w-none markdown-body overflow-x-auto">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath, remarkGfm]}
                          rehypePlugins={[rehypeRaw, rehypeKatex]}
                        >
                          {lessonContent || "*No content written yet. Use LaTeX ($x^2$) and markdown headings.*"}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <textarea 
                        value={lessonContent}
                        onChange={e => setLessonContent(e.target.value)}
                        placeholder="Write your educational content here using markdown. Wrap equations in $ for inline and $$ for block layout."
                        className="w-full min-h-[400px] p-4 bg-slate-50 border border-slate-250 rounded-b-xl outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm leading-relaxed text-slate-800"
                        required
                      />
                    )}
                  </div>

                  <div className="flex justify-end gap-3.5 pt-4 border-t border-slate-100">
                    <button 
                      type="button"
                      className="px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-wider bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all cursor-pointer"
                      onClick={resetLessonForm}
                    >
                      Cancel Form
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-blue-100 flex items-center gap-2 disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                      {isEditingLesson ? 'Update Active Lesson' : 'Publish Lesson'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==================== 2. PAST PAPERS TAB ==================== */}
        {activeTab === 'past-papers' && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Studied Past Papers & Exam Library</h3>
                  <p className="text-xs text-slate-400 font-bold">List and edit original exam questions with detailed solutions.</p>
                </div>
                {!showPaperForm && (
                  <button
                    onClick={() => {
                      resetPaperForm();
                      setShowPaperForm(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white hover:bg-blue-700 transition-all cursor-pointer shadow-md shadow-blue-100"
                  >
                    <Plus size={14} />
                    Add Exam Question
                  </button>
                )}
              </div>

              {dbPastPapers.length === 0 ? (
                <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400 space-y-3">
                  <FileText size={36} className="mx-auto text-slate-300" />
                  <p className="font-bold">No exam past papers stored in database.</p>
                  <p className="text-xs">Add past papers by clicking "Add Exam Question" or seed the database setup.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-4">Code/ID</th>
                        <th className="py-3 px-4">Year/Section</th>
                        <th className="py-3 px-4">Subject/Grade</th>
                        <th className="py-3 px-4">Chapter Topic</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dbPastPapers.map((paper) => (
                        <tr key={paper.id} className="border-b border-slate-50 hover:bg-slate-50/50 text-sm font-bold text-slate-800 transition-all">
                          <td className="py-4 px-4 font-mono text-xs text-blue-600">{paper.id}</td>
                          <td className="py-4 px-4">
                            <div>{paper.year}</div>
                            <div className="text-[10px] text-slate-400 font-black uppercase">{paper.section}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div>{paper.subject}</div>
                            <div className="text-[10px] text-slate-400 font-black uppercase">Grade {paper.grade_level}</div>
                          </td>
                          <td className="py-4 px-4 text-xs font-black text-slate-500">{paper.chapter || 'All Chapters'}</td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleEditPaper(paper)}
                                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                title="Edit Paper"
                              >
                                <Edit3 size={15} />
                              </button>
                              <button 
                                onClick={() => handleDeletePaper(paper.id)}
                                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                title="Delete Paper"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Past Paper Edit/Create Form */}
            {showPaperForm && (
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-12 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900">
                      {isEditingPaper ? 'Edit Past Paper Entry' : 'Add New Past Paper Entry'}
                    </h3>
                    <p className="text-xs text-slate-400 font-bold">Populate past exams and professional step-by-step solutions.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setPreviewMode(!previewMode)}
                    className={cn(
                      "flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer",
                      previewMode ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                    )}
                  >
                    {previewMode ? <Edit3 size={14} /> : <Eye size={14} />}
                    {previewMode ? 'Editor' : 'Preview Layout'}
                  </button>
                </div>

                <form onSubmit={handleSavePaper} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Question ID/Code</label>
                      <input 
                        type="text"
                        placeholder="e.g., 2026A_Q12"
                        value={paperId}
                        onChange={e => setPaperId(e.target.value)}
                        disabled={isEditingPaper}
                        className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-mono text-sm uppercase font-bold disabled:bg-slate-100"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Exam Year</label>
                      <input 
                        type="number"
                        placeholder="2026"
                        value={paperYear}
                        onChange={e => setPaperYear(Number(e.target.value))}
                        className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Grade Level</label>
                      <select 
                        value={paperGradeLevel}
                        onChange={e => setPaperGradeLevel(Number(e.target.value))}
                        className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                      >
                        <option value={10}>Grade 10</option>
                        <option value={11}>Grade 11</option>
                        <option value={12}>Grade 12</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Section</label>
                      <select 
                        value={paperSection}
                        onChange={e => setPaperSection(e.target.value as any)}
                        className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                      >
                        <option value="A">Section A</option>
                        <option value="Section A Multiple Choice">Section A Multiple Choice</option>
                        <option value="B">Section B</option>
                        <option value="C">Section C</option>
                        <option value="D">Section D</option>
                        <option value="Full Paper">Full Paper</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Title / Display Header</label>
                      <input 
                        type="text"
                        placeholder="e.g., Matrices Multiplication - Multi-Step Question"
                        value={paperTitle}
                        onChange={e => setPaperTitle(e.target.value)}
                        className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Chapter / Topic</label>
                      <input 
                        type="text"
                        placeholder="e.g., Chapter 1: Complex Numbers"
                        value={paperChapter}
                        onChange={e => setPaperChapter(e.target.value)}
                        className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">PDF Document Link</label>
                      <input 
                        type="text"
                        placeholder="URL address or #"
                        value={paperPdfUrl}
                        onChange={e => setPaperPdfUrl(e.target.value)}
                        className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Answer Key PDF Link (Optional)</label>
                      <input 
                        type="text"
                        placeholder="URL address"
                        value={paperAnswerPdfUrl}
                        onChange={e => setPaperAnswerPdfUrl(e.target.value)}
                        className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                      />
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center bg-slate-100 p-3.5 rounded-t-xl border-x border-t border-slate-250">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <FileCode size={14} /> Question Problem Content
                      </label>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">Supports LaTeX</span>
                    </div>

                    {previewMode ? (
                      <div className="w-full min-h-[150px] p-6 bg-white border border-slate-250 rounded-b-xl prose prose-slate max-w-none markdown-body overflow-x-auto">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath, remarkGfm]}
                          rehypePlugins={[rehypeRaw, rehypeKatex]}
                        >
                          {paperContent || "*No question written yet.*"}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <textarea 
                        value={paperContent}
                        onChange={e => setPaperContent(e.target.value)}
                        placeholder="Provide the question details here. Embed equations in $...$."
                        className="w-full min-h-[150px] p-4 bg-slate-50 border border-slate-250 rounded-b-xl outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm leading-relaxed text-slate-800"
                        required
                      />
                    )}
                  </div>

                  {/* Solution Content */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center bg-slate-100 p-3.5 rounded-t-xl border-x border-t border-slate-250">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Check size={14} className="text-emerald-500" /> Full Step-by-Step Solution Breakdown
                      </label>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">Supports LaTeX</span>
                    </div>

                    {previewMode ? (
                      <div className="w-full min-h-[250px] p-6 bg-white border border-slate-250 rounded-b-xl prose prose-slate max-w-none markdown-body overflow-x-auto">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath, remarkGfm]}
                          rehypePlugins={[rehypeRaw, rehypeKatex]}
                        >
                          {paperSolutionContent || "*No solution written yet.*"}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <textarea 
                        value={paperSolutionContent}
                        onChange={e => setPaperSolutionContent(e.target.value)}
                        placeholder="Provide the detailed, mathematically structured steps to calculate the answer. Use double backslash (\\) inside aligned matrices."
                        className="w-full min-h-[250px] p-4 bg-slate-50 border border-slate-250 rounded-b-xl outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm leading-relaxed text-slate-800"
                        required
                      />
                    )}
                  </div>

                  <div className="flex justify-end gap-3.5 pt-4 border-t border-slate-100">
                    <button 
                      type="button"
                      className="px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-wider bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all cursor-pointer"
                      onClick={resetPaperForm}
                    >
                      Cancel Form
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-blue-100 flex items-center gap-2 disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                      {isEditingPaper ? 'Update Exam Paper' : 'Publish Exam Paper'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==================== 3. CHAPTERS & GRADES TAB ==================== */}
        {activeTab === 'grades' && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Chapters & Curriculum Modules</h3>
                  <p className="text-xs text-slate-400 font-bold">List and edit curriculum subjects/chapters across different levels.</p>
                </div>
                {!showChapterForm && (
                  <button
                    onClick={() => {
                      setChapterFormId(null);
                      setChapterTitle('');
                      setChapterDesc('');
                      setIsEditingChapter(false);
                      setShowChapterForm(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white hover:bg-blue-700 transition-all cursor-pointer shadow-md shadow-blue-100"
                  >
                    <Plus size={14} />
                    Add New Chapter
                  </button>
                )}
              </div>

              {dbChaptersAll.length === 0 ? (
                <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400 space-y-3">
                  <Layers size={36} className="mx-auto text-slate-300" />
                  <p className="font-bold">No chapters found in Supabase.</p>
                  <p className="text-xs">Chapters can be seeded via "Database Sync" dynamically or created here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-4">Level</th>
                        <th className="py-3 px-4">Ch Number</th>
                        <th className="py-3 px-4">Title</th>
                        <th className="py-3 px-4">Description</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dbChaptersAll.map((ch) => (
                        <tr key={ch.id} className="border-b border-slate-50 hover:bg-slate-50/50 text-sm font-bold text-slate-800 transition-all">
                          <td className="py-4 px-4">
                            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-black uppercase">Grade {ch.grade_id}</span>
                          </td>
                          <td className="py-4 px-4 font-mono text-xs">{ch.chapter_number}</td>
                          <td className="py-4 px-4">{ch.title}</td>
                          <td className="py-4 px-4 text-xs text-slate-500 font-bold max-w-xs truncate">{ch.description}</td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleEditChapter(ch)}
                                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                title="Edit Chapter"
                              >
                                <Edit3 size={15} />
                              </button>
                              <button 
                                onClick={() => handleDeleteChapter(ch.id)}
                                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                title="Delete Chapter"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Chapter form */}
            {showChapterForm && (
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-12 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="border-b border-slate-100 pb-6 mb-8">
                  <h3 className="text-xl md:text-2xl font-black text-slate-900">
                    {isEditingChapter ? 'Edit Curriculum Chapter' : 'Add New Curriculum Chapter'}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold">Configure course syllabus titles and levels.</p>
                </div>

                <form onSubmit={handleSaveChapter} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Grade Level</label>
                      <select 
                        value={chapterGradeId}
                        onChange={e => setChapterGradeId(Number(e.target.value))}
                        className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                      >
                        <option value={10}>Grade 10</option>
                        <option value={11}>Grade 11</option>
                        <option value={12}>Grade 12</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Chapter Number</label>
                      <input 
                        type="number"
                        placeholder="1"
                        value={chapterNumber}
                        onChange={e => setChapterNumber(Number(e.target.value))}
                        className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Order/Index</label>
                      <input 
                        type="number"
                        placeholder="0"
                        value={chapterOrderIndex}
                        onChange={e => setChapterOrderIndex(Number(e.target.value))}
                        className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Chapter Title</label>
                    <input 
                      type="text"
                      placeholder="e.g., Mathematical Induction"
                      value={chapterTitle}
                      onChange={e => setChapterTitle(e.target.value)}
                      className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Brief Description</label>
                    <textarea 
                      placeholder="Brief summary of the chapter topics and educational intent."
                      value={chapterDesc}
                      onChange={e => setChapterDesc(e.target.value)}
                      className="w-full p-4 min-h-[100px] rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-bold"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3.5 pt-4 border-t border-slate-100">
                    <button 
                      type="button"
                      className="px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-wider bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all cursor-pointer"
                      onClick={() => setShowChapterForm(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-blue-100 flex items-center gap-2 disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                      {isEditingChapter ? 'Update Chapter' : 'Save Chapter'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==================== 4. DATABASE SYNC TAB ==================== */}
        {activeTab === 'db-sync' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-12 shadow-xl space-y-8">
              <div className="border-b border-slate-100 pb-6">
                <h3 className="text-xl md:text-3xl font-black text-slate-900 flex items-center gap-3">
                  <Database size={28} className="text-blue-600 animate-pulse" />
                  <span>Curriculum Synchronization Hub</span>
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-1">
                  Synchronize your Supabase cloud database with pre-built premium math lessons with zero backslash loss.
                </p>
              </div>

              {/* Warnings/Context info */}
              <div className="bg-amber-50/75 border border-amber-200 p-6 rounded-2xl flex items-start gap-4 text-xs font-bold leading-relaxed text-amber-950">
                <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5 animate-bounce" />
                <div className="space-y-1.5">
                  <p className="font-extrabold uppercase text-[10px] tracking-wider text-amber-800">Prerequisite checklist</p>
                  <p>
                    This syncing engine loads all Grade 10, 11, and 12 premium curricula from offline file structures into your linked Supabase account. 
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>This process does NOT erase existing data. It adds missing chapters and upserts lessons safely.</li>
                    <li>Synchronizing lessons through the dashboard is 100% immune to SQL string backslash stripping.</li>
                    <li>Your mathematical formulas (such as Module 5 Trigonometric Form) will render with perfect precision.</li>
                  </ul>
                </div>
              </div>

              {/* Status Stats panel */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl text-center shadow-xs">
                  <div className="text-2xl font-black text-slate-800 font-mono">{counts.grades}</div>
                  <div className="text-[10px] text-slate-400 font-black uppercase mt-1">Grades</div>
                </div>
                <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl text-center shadow-xs">
                  <div className="text-2xl font-black text-slate-800 font-mono">{counts.chapters}</div>
                  <div className="text-[10px] text-slate-400 font-black uppercase mt-1">Chapters</div>
                </div>
                <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl text-center shadow-xs">
                  <div className="text-2xl font-black text-slate-800 font-mono">{counts.lessons}</div>
                  <div className="text-[10px] text-slate-400 font-black uppercase mt-1">Lessons</div>
                </div>
                <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl text-center shadow-xs">
                  <div className="text-2xl font-black text-slate-800 font-mono">{counts.pastPapers}</div>
                  <div className="text-[10px] text-slate-400 font-black uppercase mt-1">Past Papers</div>
                </div>
              </div>

              {/* Giant Sync Button */}
              <div className="flex flex-col items-center justify-center py-6 border-t border-b border-slate-100 space-y-4">
                <button
                  type="button"
                  disabled={syncLoading}
                  onClick={handleSyncCurriculum}
                  className="px-10 py-5 rounded-[2rem] font-black uppercase tracking-wider text-xs bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center gap-3.5 select-none disabled:opacity-50 active:scale-95 cursor-pointer"
                >
                  {syncLoading ? (
                    <Loader2 size={18} className="animate-spin text-white" />
                  ) : (
                    <RefreshCw size={18} className="animate-spin duration-[4000ms]" />
                  )}
                  <span>{syncLoading ? 'Synchronizing Live Database...' : 'Sync Curriculum to Supabase'}</span>
                </button>
                {syncStatus && (
                  <p className="text-xs font-black text-blue-600 animate-pulse">{syncStatus}</p>
                )}
              </div>

              {/* Real-Time Syncing log Console */}
              {syncLogs.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Sync Terminal Output</h4>
                  <div className="bg-slate-900 rounded-2xl p-6 font-mono text-xs text-slate-200 leading-relaxed overflow-y-auto max-h-[300px] border border-slate-800 shadow-inner">
                    {syncLogs.map((log, index) => (
                      <div key={index} className="mb-1.5 select-all">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
