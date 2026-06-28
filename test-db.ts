import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

async function run() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase keys missing!');
    return;
  }
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Fetch all chapters
  const { data: chapters } = await supabase.from('chapters').select('*').order('grade_id').order('chapter_number');
  console.log('--- ALL CHAPTERS IN DB ---');
  chapters?.forEach(c => {
    console.log(`Chapter ID: ${c.id}, Grade: ${c.grade_id}, Ch: ${c.chapter_number}, Title: ${c.title}`);
  });

  // Delete lesson by exact ID
  console.log('\n--- DELETING INTRODUCTION TO I BY ID ---');
  const response = await supabase
    .from('lessons')
    .delete()
    .eq('id', '521cf9d8-0b06-49f3-ba6f-1f3f704ca6f2');
  
  console.log('Delete Response:', {
    error: response.error,
    status: response.status,
    statusText: response.statusText,
    data: response.data
  });
  
  if (response.error) {
    console.error('Error deleting lesson:', response.error);
  } else {
    console.log('Successfully completed delete operation!');
  }

  // Fetch all lessons again
  const { data: lessons } = await supabase.from('lessons').select('*');
  console.log('\n--- ALL LESSONS IN DB AFTER DELETION ATTEMPT ---');
  lessons?.forEach(l => {
    const ch = chapters?.find(c => c.id === l.chapter_id);
    console.log(`Lesson ID: ${l.id}, Chapter: ${ch ? ch.title : 'Unknown (' + l.chapter_id + ')'}, Title: ${l.title}`);
    console.log(`Content Sample: ${l.content ? l.content.substring(0, 200) : 'None'}`);
  });
}

run();
