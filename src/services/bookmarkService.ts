import { supabase } from '../lib/supabase';

const hasSupabaseKeys = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

const getDemoBookmarks = (userId: string): string[] => {
  try {
    const list = localStorage.getItem(`unlockedu_demo_bookmarks_${userId}`);
    return list ? JSON.parse(list) : [];
  } catch (e) {
    return [];
  }
};

const saveDemoBookmarks = (userId: string, bookmarks: string[]) => {
  try {
    localStorage.setItem(`unlockedu_demo_bookmarks_${userId}`, JSON.stringify(bookmarks));
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
    if (!hasSupabaseKeys) {
      const bookmarks = getDemoBookmarks(userId);
      return bookmarks.includes(lessonId);
    }

    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .maybeSingle();

      if (error) {
        console.error('Error checking bookmark:', error);
        return false;
      }

      return !!data;
    } catch (e) {
      console.error('Error checking bookmark', e);
      return false;
    }
  },

  /**
   * Adds a bookmark for a lesson
   */
  async addBookmark(userId: string, lessonId: string): Promise<void> {
    if (!hasSupabaseKeys) {
      const bookmarks = getDemoBookmarks(userId);
      if (!bookmarks.includes(lessonId)) {
        bookmarks.push(lessonId);
        saveDemoBookmarks(userId, bookmarks);
      }
      return;
    }

    const { error } = await supabase
      .from('bookmarks')
      .insert({ user_id: userId, lesson_id: lessonId });

    if (error) {
      console.error('Error adding bookmark:', error);
      throw error;
    }
  },

  /**
   * Removes a bookmark for a lesson
   */
  async removeBookmark(userId: string, lessonId: string): Promise<void> {
    if (!hasSupabaseKeys) {
      const bookmarks = getDemoBookmarks(userId);
      const updated = bookmarks.filter(id => id !== lessonId);
      saveDemoBookmarks(userId, updated);
      return;
    }

    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('lesson_id', lessonId);

    if (error) {
      console.error('Error removing bookmark:', error);
      throw error;
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

  /**
   * Gets all bookmarks for a user (Demo supportive)
   */
  async getUserBookmarkLessonIds(userId: string): Promise<string[]> {
    if (!hasSupabaseKeys) {
      return getDemoBookmarks(userId);
    }
    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('lesson_id')
        .eq('user_id', userId);
      if (error) throw error;
      return (data || []).map(b => b.lesson_id);
    } catch (e) {
      console.error('Error getting user bookmarks:', e);
      return [];
    }
  }
};
