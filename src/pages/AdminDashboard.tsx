import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Chapter, Lesson, Grade } from '../types';
import { 
  Plus, Save, Trash2, Edit3, 
  Eye, FileCode, CheckCircle, 
  ArrowRight, Layers, BookOpen, 
  FileText, Loader2, Info
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { MathRenderer } from '../components/ui/MathRenderer';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'past-papers' | 'grades'>('lessons');
  const [grades, setGrades] = useState<Grade[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedGradeId, setSelectedGradeId] = useState<string>('');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('');
  
  // Lesson Form
  const [isEditing, setIsEditing] = useState(false);
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<Lesson['type']>('theory');
  const [orderIndex, setOrderIndex] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchGrades();
  }, []);

  useEffect(() => {
    if (selectedGradeId) fetchChapters();
  }, [selectedGradeId]);

  const fetchGrades = async () => {
    const { data } = await supabase.from('grades').select('*');
    if (data) setGrades(data);
  };

  const fetchChapters = async () => {
    const { data } = await supabase.from('chapters').select('*').eq('grade_id', selectedGradeId);
    if (data) setChapters(data);
  };

  const handleSaveLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChapterId) return setStatus('Please select a chapter');
    
    setLoading(true);
    const payload = {
      chapter_id: selectedChapterId,
      title,
      content,
      type,
      order_index: orderIndex
    };

    let result;
    if (isEditing && lessonId) {
      result = await supabase.from('lessons').update(payload).eq('id', lessonId);
    } else {
      result = await supabase.from('lessons').insert(payload);
    }

    if (result.error) {
      setStatus('Error: ' + result.error.message);
    } else {
      setStatus('Success! Lesson saved.');
      // Reset form if not editing
      if (!isEditing) {
        setTitle('');
        setContent('');
      }
    }
    setLoading(false);
    setTimeout(() => setStatus(null), 3000);
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
      {/* Sidebar Nav */}
      <div className="lg:col-span-1 space-y-2">
        <h2 className="text-2xl font-black uppercase tracking-tight mb-8 px-4 text-slate-900">Admin Control</h2>
        {[
          { id: 'lessons', label: 'Lessons', icon: BookOpen },
          { id: 'past-papers', label: 'Exam Papers', icon: FileText },
          { id: 'grades', label: 'Curriculum', icon: Layers },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all",
              activeTab === tab.id 
                ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20" 
                : "text-slate-500 hover:bg-slate-100"
            )}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Panel */}
      <div className="lg:col-span-3 space-y-8">
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight text-slate-900">Module Editor</h3>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => setPreviewMode(!previewMode)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95",
                  previewMode ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                )}
              >
                {previewMode ? <Edit3 size={16} /> : <Eye size={16} />}
                {previewMode ? 'Edit Mode' : 'Live Preview'}
              </button>
              <button 
                onClick={() => setContent(sampleMarkdown)}
                className="px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white hover:bg-slate-800 transition-all active:scale-95"
              >
                Load Sample
              </button>
            </div>
          </div>

          <form onSubmit={handleSaveLesson} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Select Grade</label>
                <select 
                  value={selectedGradeId}
                  onChange={(e) => setSelectedGradeId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-none ring-1 ring-neutral-200 dark:ring-neutral-700 outline-none"
                >
                  <option value="">Choose Grade...</option>
                  {grades.map(g => <option key={g.id} value={g.id}>Grade {g.level}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Select Chapter</label>
                <select 
                  value={selectedChapterId}
                  onChange={(e) => setSelectedChapterId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-none ring-1 ring-neutral-200 dark:ring-neutral-700 outline-none"
                  disabled={!selectedGradeId}
                >
                  <option value="">Choose Chapter...</option>
                  {chapters.map(c => <option key={c.id} value={c.id}>Ch {c.chapter_number}: {c.title}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Lesson Title</label>
                <input 
                  type="text"
                  placeholder="e.g., Introduction to Limits"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-none ring-1 ring-neutral-200 dark:ring-neutral-700 outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Type</label>
                <select 
                  value={type}
                  onChange={e => setType(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-none ring-1 ring-neutral-200 dark:ring-neutral-700 outline-none"
                >
                  <option value="theory">Theory</option>
                  <option value="exercise">Exercise/Practice</option>
                  <option value="summary">Summary</option>
                  <option value="formula">Formula Cheat-sheet</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center bg-neutral-50 dark:bg-neutral-800 p-2 rounded-t-xl border-x border-t border-neutral-200 dark:border-neutral-700">
                <label className="text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <FileCode size={14} /> Lesson Content (Markdown + LaTeX)
                </label>
                <div className="flex items-center gap-1">
                  <div className="px-2 py-0.5 rounded text-[10px] bg-white border border-neutral-200 text-neutral-400 shadow-sm font-mono">
                    $E=mc^2$
                  </div>
                </div>
              </div>
              
              {previewMode ? (
                <div className="w-full min-h-[400px] p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-b-xl prose prose-blue dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {content || "*No content to preview*"}
                  </ReactMarkdown>
                </div>
              ) : (
                  <textarea 
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Supports Markdown and Inline/Block LaTeX ($...$ or $$...$$)"
                    className="w-full min-h-[400px] p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-b-xl outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm leading-relaxed overflow-x-auto"
                    required
                  />
              )}
            </div>

            {status && (
              <div className={cn(
                "p-4 rounded-xl flex items-center gap-3 text-sm font-bold",
                status.includes('Success') ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
              )}>
                {status.includes('Success') ? <CheckCircle size={18} /> : <Info size={18} />}
                {status}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button 
                type="button"
                className="px-6 py-3 rounded-xl font-bold bg-neutral-100 text-neutral-500 hover:bg-neutral-200 transition-all"
                onClick={() => {
                  setTitle('');
                  setContent('');
                  setIsEditing(false);
                }}
              >
                Clear Form
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                {isEditing ? 'Update Module' : 'Publish Lesson'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
