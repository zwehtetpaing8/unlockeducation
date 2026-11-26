import { useState, useRef, useEffect } from 'react';
import { useTheme, Theme, ColorPalette } from './ThemeProvider';
import { Sun, Moon, Monitor, BookOpen, Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ThemeToggle() {
  const { theme, setTheme, palette, setPalette } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const themeOptions: { value: Theme; label: string; sub: string; icon: typeof Sun }[] = [
    { value: 'light', label: 'Daylight', sub: 'Crisp academic light', icon: Sun },
    { value: 'paper', label: 'Warm Paper', sub: 'Eye-care textbook tint', icon: BookOpen },
    { value: 'dark', label: 'Night Slate', sub: 'Deep navy dark mode', icon: Moon },
    { value: 'system', label: 'System', sub: 'Match device setting', icon: Monitor },
  ];

  const paletteOptions: { value: ColorPalette; label: string; colorClass: string }[] = [
    { value: 'ocean', label: 'Unlock Brand (Sky & Gold)', colorClass: 'bg-[#0284c7]' },
    { value: 'emerald', label: 'Emerald Scholar (Teal)', colorClass: 'bg-[#0d9488]' },
    { value: 'royal', label: 'Royal Oxford (Blue)', colorClass: 'bg-[#2563eb]' },
    { value: 'indigo', label: 'Classic Iris (Indigo)', colorClass: 'bg-[#4f46e5]' },
  ];

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4 text-amber-500" />;
      case 'paper':
        return <BookOpen className="w-4 h-4 text-amber-600" />;
      case 'dark':
        return <Moon className="w-4 h-4 text-indigo-400" />;
      case 'system':
        return <Monitor className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'paper':
        return 'Paper';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
    }
  };

  return (
    <div id="theme-toggle-container" className="relative" ref={dropdownRef}>
      <button
        id="theme-toggle-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 min-h-[38px] bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-2xs select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
        title="Customize theme & color palette"
      >
        <span className="flex items-center justify-center">
          {getThemeIcon()}
        </span>
        <span className="hidden sm:inline-block">
          {getThemeLabel()}
        </span>
        <Palette className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 opacity-80" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="theme-toggle-dropdown"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-900/10 dark:shadow-black/50 p-2.5 z-50 overflow-hidden space-y-3"
          >
            {/* Surface Mode Section */}
            <div className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Reading Surface
              </div>
              {themeOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = theme === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setTheme(opt.value);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-xl transition-colors cursor-pointer select-none ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <Icon className={`w-4 h-4 shrink-0 ${
                        isSelected
                          ? opt.value === 'light' || opt.value === 'paper'
                            ? 'text-amber-500'
                            : 'text-indigo-500 dark:text-indigo-400'
                          : 'text-slate-400 dark:text-slate-500'
                      }`} />
                      <div>
                        <div className="leading-tight">{opt.label}</div>
                        <div className="text-[10px] font-normal text-slate-400 dark:text-slate-500">{opt.sub}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Accent Color Palette Section */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Color Theme
              </div>
              <div className="space-y-1">
                {paletteOptions.map((pal) => {
                  const isSelected = palette === pal.value;
                  return (
                    <button
                      key={pal.value}
                      onClick={() => {
                        setPalette(pal.value);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-xl transition-colors cursor-pointer select-none ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-3.5 h-3.5 rounded-full ${pal.colorClass} ring-2 ring-offset-1 ring-slate-200 dark:ring-slate-700 dark:ring-offset-slate-900`} />
                        <span>{pal.label}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
