import fs from 'fs';
import path from 'path';
import { pdfResources } from '../src/data/pdfResources';

const distDir = path.join(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

const escapeHtmlAttr = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const siteUrl = (process.env.VITE_SITE_URL || '').replace(/\/$/, '');

function injectMeta(
  html: string,
  meta: { url: string; title: string; description: string; image: string }
) {
  const title = escapeHtmlAttr(meta.title);
  const description = escapeHtmlAttr(meta.description);
  const image = escapeHtmlAttr(meta.image);
  const url = escapeHtmlAttr(meta.url);

  return html
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/>/g, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/>/g, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/>/g, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta\s+name="description"\s+content=".*?"\s*\/>/s, `<meta name="description" content="${description}" />`)
    .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/>/s, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/>/s, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/>/g, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/>/g, `<meta name="twitter:image" content="${image}" />`);
}

// Generate /pdfs/index.html
const pdfsIndexDir = path.join(distDir, 'pdfs');
fs.mkdirSync(pdfsIndexDir, { recursive: true });
fs.writeFileSync(
  path.join(pdfsIndexDir, 'index.html'),
  injectMeta(template, {
    url: `${siteUrl}/pdfs`,
    title: 'Grade 12 Mathematics Past Paper & Solution PDFs – Unlock Education',
    description:
      'Read and download Grade 12 Mathematics Past Paper Questions & Worked Solutions PDFs by Sayar Zwe (Unlock Education).',
    image: `${siteUrl}/logo.png`,
  }),
  'utf-8'
);

// Generate /pdfs/<id>/index.html for every available PDF
for (const pdf of pdfResources) {
  if (!pdf.available) continue;
  const pdfDir = path.join(pdfsIndexDir, pdf.id);
  fs.mkdirSync(pdfDir, { recursive: true });
  const coverImage = pdf.pages[0] || '/logo.png';
  fs.writeFileSync(
    path.join(pdfDir, 'index.html'),
    injectMeta(template, {
      url: `${siteUrl}/pdfs/${pdf.id}`,
      title: `${pdf.fileName} – Unlock Education`,
      description: `${pdf.description} (${pdf.pageCount} Pages). Read online or download PDF.`,
      image: `${siteUrl}${coverImage}`,
    }),
    'utf-8'
  );
}

console.log('Generated static OpenGraph HTML pages for PDF routes in dist/pdfs/.');
