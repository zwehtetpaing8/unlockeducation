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

  const { data: lessons } = await supabase.from('lessons').select('*');
  console.log('ALL Lessons in DB:');
  lessons?.forEach(l => {
    console.log(`- ID: ${l.id}, Title: ${l.title}, ChID: ${l.chapter_id}, Order: ${l.order_index}`);
  });
}

main();
