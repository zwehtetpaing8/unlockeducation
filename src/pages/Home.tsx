import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, BookOpen, CheckCircle2, 
  PlayCircle, Award, Target, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const Home: React.FC = () => {
  const grades = [
    { 
      level: 10, 
      title: 'Grade 10', 
      chapters: 10, 
      description: 'Foundational concepts in Algebra, Geometry, and Trigonometry.',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    { 
      level: 11, 
      title: 'Grade 11', 
      chapters: 11, 
      description: 'Advanced functions, Coordinate Geometry, and Calculus basics.',
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    { 
      level: 12, 
      title: 'Grade 12', 
      chapters: 11, 
      description: 'Matriculation exam focus with Complex Numbers, Integrals, and more.',
      color: 'bg-purple-50 text-purple-600 border-purple-100'
    }
  ];

  const features = [
    { icon: <BookOpen />, title: 'Chapter-wise Study', desc: 'Detailed lessons with formulas and examples.' },
    { icon: <Zap />, title: 'Exam Mastery', desc: 'Practice with mock exams and past matriculation papers.' },
    { icon: <Target />, title: 'Interactive Quizzes', desc: 'Test your knowledge with instant feedback MCQs.' },
    { icon: <Award />, title: 'Progress Tracking', desc: 'Stay motivated by tracking your learning journey.' },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-6">
              <PlayCircle size={14} />
              <span>Learn Math Anytime, Anywhere</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Master Myanmar <br />
              <span className="text-blue-600">Maths Curriculum</span>
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-10 max-w-lg leading-relaxed">
              A comprehensive platform for Grade 10, 11, and 12 students. 
              Step-by-step lessons, interactive practice, and past paper 
              solutions tailored for your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/grade/12"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-center shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/past-papers"
                className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 px-8 py-4 rounded-2xl font-bold text-center transition-all"
              >
                Past Papers
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square md:aspect-video rounded-3xl bg-neutral-200 dark:bg-neutral-800 overflow-hidden shadow-2xl">
              {/* Replace with actual educational image asset if available */}
              <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                <div className="space-y-4">
                  <div className="text-6xl">📐</div>
                  <h3 className="text-2xl font-bold italic opacity-60">
                    "Mathematics is the music of reason."
                  </h3>
                </div>
              </div>
            </div>
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl shadow-xl hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,000+</p>
                  <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Practice Questions</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grades Overview */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold mb-4">Choose Your Grade</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Select your grade level to access the full curriculum, 
            chapter-by-chapter lessons, and practice materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {grades.map((grade, idx) => (
            <motion.div
              key={grade.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <Link 
                to={`/grade/${grade.level}`}
                className={cn(
                  "block p-8 border rounded-3xl h-full transition-all group-hover:shadow-xl group-hover:-translate-y-1",
                  "bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800"
                )}
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", grade.color)}>
                  <span className="text-2xl font-bold">{grade.level}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{grade.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-6 line-clamp-2">
                  {grade.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">
                    {grade.chapters} Chapters
                  </span>
                  <div className="w-10 h-10 rounded-full bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-neutral-900 dark:bg-neutral-800/50 rounded-[3rem] p-12 md:p-20 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-8 leading-tight">
              Powerful Tools Built <br />
              for Effective Learning
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="space-y-3">
                  <div className="text-blue-400">
                    {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 32 })}
                  </div>
                  <h4 className="text-xl font-bold">{feature.title}</h4>
                  <p className="text-neutral-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block relative h-full min-h-[400px]">
             {/* Abstract design elements or dashboard preview */}
             <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-white/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Award size={80} className="mx-auto mb-6 text-blue-400 opacity-50" />
                  <p className="text-neutral-400 italic font-mono text-sm">Interactive Quiz Preview</p>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
