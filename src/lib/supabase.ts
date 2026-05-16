import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

/**
 * Returns the Supabase client, initializing it if necessary.
 * This avoids crashing on startup if environment variables are missing.
 */
export const getSupabase = (): SupabaseClient => {
  if (client) return client;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase credentials missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your secrets panel.'
    );
  }

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
};

// Export a proxy that mimics the SupabaseClient to maintain backward compatibility
// but throws a helpful error if accessed before variables are set.
export const supabase = new Proxy({} as SupabaseClient, {
  get: (target, prop, receiver) => {
    return Reflect.get(getSupabase(), prop, receiver);
  },
});
