import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

async function main() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase keys missing!');
    return;
  }
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: profiles, error } = await supabase.from('profiles').select('*');
  if (error) {
    console.error('Error fetching profiles:', error);
    return;
  }
  console.log('ALL Profiles in DB:');
  profiles?.forEach(p => {
    console.log(`- ID: ${p.id}, Email: ${p.email || p.email_address || 'N/A'}, Role: ${p.role}`);
  });
}

main();
