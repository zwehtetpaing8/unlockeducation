import { supabase } from '../lib/supabase';

/**
 * Service for managing user bookmarks
 */
export const bookmarkService = {
  /**
   * Checks if a lesson is bookmarked by a user
   */
  async isBookmarked(userId: string, lessonId: string): Promise<boolean> {
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
  },

  /**
   * Adds a bookmark for a lesson
   */
  async addBookmark(userId: string, lessonId: string): Promise<void> {
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
};
