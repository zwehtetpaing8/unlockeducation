import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressContextType {
  completedLessons: string[];
  bookmarkedLessons: string[];
  toggleComplete: (lessonId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  isCompleted: (lessonId: string) => boolean;
  isBookmarked: (lessonId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [bookmarkedLessons, setBookmarkedLessons] = useState<string[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const storedCompleted = localStorage.getItem('mmmaths_completed');
      if (storedCompleted) {
        setCompletedLessons(JSON.parse(storedCompleted));
      }
      
      const storedBookmarked = localStorage.getItem('mmmaths_bookmarks');
      if (storedBookmarked) {
        setBookmarkedLessons(JSON.parse(storedBookmarked));
      }
    } catch (e) {
      console.error('Error reading localStorage for learning progress:', e);
    }
  }, []);

  const toggleComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const updated = prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId];
      localStorage.setItem('mmmaths_completed', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleBookmark = (lessonId: string) => {
    setBookmarkedLessons((prev) => {
      const updated = prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId];
      localStorage.setItem('mmmaths_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const isCompleted = (lessonId: string) => completedLessons.includes(lessonId);
  const isBookmarked = (lessonId: string) => bookmarkedLessons.includes(lessonId);

  return (
    <ProgressContext.Provider value={{
      completedLessons,
      bookmarkedLessons,
      toggleComplete,
      toggleBookmark,
      isCompleted,
      isBookmarked
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
