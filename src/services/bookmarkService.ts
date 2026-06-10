import { supabase } from '../lib/supabase';

const hasKeys = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) && typeof window !== 'undefined' && localStorage.getItem('unlockedu_force_demo') !== 'true';

const getLocalBookmarks = (): string[] => {
  try {
    const stored = localStorage.getItem('unlockedu_demo_bookmarks');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const setLocalBookmarks = (bookmarks: string[]) => {
  try {
    localStorage.setItem('unlockedu_demo_bookmarks', JSON.stringify(bookmarks));
  } catch (e) {
    console.error('Failed to save demo bookmarks', e);
  }
};

/**
 * Service for managing user bookmarks
 */
export const bookmarkService = {
  /**
   * Checks if a lesson is bookmarked by a user
   */
  async isBookmarked(userId: string, lessonId: string): Promise<boolean> {
    if (!hasKeys) {
      const list = getLocalBookmarks();
      return list.includes(lessonId);
    }

    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking bookmark from Supabase:', error);
      const list = getLocalBookmarks();
      return list.includes(lessonId);
    }
  },

  /**
   * Adds a bookmark for a lesson
   */
  async addBookmark(userId: string, lessonId: string): Promise<void> {
    if (!hasKeys) {
      const list = getLocalBookmarks();
      if (!list.includes(lessonId)) {
        setLocalBookmarks([...list, lessonId]);
      }
      return;
    }

    try {
      const { error } = await supabase
        .from('bookmarks')
        .insert({ user_id: userId, lesson_id: lessonId });

      if (error) throw error;
    } catch (error) {
      console.error('Error adding bookmark to Supabase:', error);
      const list = getLocalBookmarks();
      if (!list.includes(lessonId)) {
        setLocalBookmarks([...list, lessonId]);
      }
    }
  },

  /**
   * Removes a bookmark for a lesson
   */
  async removeBookmark(userId: string, lessonId: string): Promise<void> {
    if (!hasKeys) {
      const list = getLocalBookmarks();
      setLocalBookmarks(list.filter(id => id !== lessonId));
      return;
    }

    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', userId)
        .eq('lesson_id', lessonId);

      if (error) throw error;
    } catch (error) {
      console.error('Error removing bookmark from Supabase:', error);
      const list = getLocalBookmarks();
      setLocalBookmarks(list.filter(id => id !== lessonId));
    }
  },

  /**
   * Toggles a bookmark for a lesson
   */
  async toggleBookmark(userId: string, lessonId: string): Promise<boolean> {
    const current = await this.isBookmarked(userId, lessonId);
    if (current) {
      await this.removeBookmark(userId, lessonId);
      return false;
    } else {
      await this.addBookmark(userId, lessonId);
      return true;
    }
  },
};
