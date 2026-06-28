import { curriculumService } from './src/services/curriculum';
import dotenv from 'dotenv';

dotenv.config();

// Since curriculum.ts uses import.meta.env, and node runs process.env, let's inject it
(globalThis as any).import = { meta: { env: process.env } };

async function main() {
  const lessons = await curriculumService.getAllLessonsByGrade('12');
  console.log('Returned Lessons count:', lessons.length);
  lessons.forEach((l, idx) => {
    console.log(`${idx + 1}. Title: ${l.title}, ID: ${l.id}, ChID: ${l.chapter_id}`);
  });
}

main();
