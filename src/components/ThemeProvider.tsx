import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'paper' | 'dark' | 'system';
export type ColorPalette = 'ocean' | 'emerald' | 'royal' | 'indigo';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
  palette: ColorPalette;
  setPalette: (palette: ColorPalette) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'light';
    }
    return 'light';
  });

  const [palette, setPaletteState] = useState<ColorPalette>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('unlock_edu_palette') as ColorPalette) || 'ocean';
    }
    return 'ocean';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
  };

  const setPalette = (newPalette: ColorPalette) => {
    localStorage.setItem('unlock_edu_palette', newPalette);
    setPaletteState(newPalette);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-palette', palette);
  }, [palette]);

  useEffect(() => {
    const root = window.document.documentElement;

    const updateTheme = () => {
      let activeTheme: 'light' | 'dark' = 'light';

      if (theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        activeTheme = systemPrefersDark ? 'dark' : 'light';
      } else if (theme === 'dark') {
        activeTheme = 'dark';
      } else {
        activeTheme = 'light';
      }

      setResolvedTheme(activeTheme);

      root.classList.remove('dark', 'theme-paper');

      if (activeTheme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'paper') {
        root.classList.add('theme-paper');
      }
    };

    updateTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => updateTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, palette, setPalette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
