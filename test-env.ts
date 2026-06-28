import dotenv from 'dotenv';

dotenv.config();

console.log('Available env vars containing SUPABASE:');
Object.keys(process.env).forEach(k => {
  if (k.includes('SUPABASE') || k.includes('DATABASE') || k.includes('SERVICE')) {
    console.log(`- ${k}: ${process.env[k] ? 'EXISTS' : 'EMPTY'}`);
  }
});
