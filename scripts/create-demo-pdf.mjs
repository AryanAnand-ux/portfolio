// Generates a minimal but valid PDF file for demo purposes.
// Run once with: node scripts/create-demo-pdf.mjs
// Then drop your real resume.pdf into /public/ to replace it.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '..', 'public', 'resume.pdf');

const streamContent =
  'BT\n' +
  '/F1 28 Tf\n' +
  '50 740 Td\n' +
  '(Aryan Anand) Tj\n' +
  '0 -36 TD\n' +
  '/F1 14 Tf\n' +
  '(Software Engineer & AI Architect) Tj\n' +
  '0 -22 TD\n' +
  '(MERN Stack | Next.js | TypeScript | Python | GenAI) Tj\n' +
  '0 -44 TD\n' +
  '/F1 12 Tf\n' +
  '(GitHub: github.com/AryanAnand-ux) Tj\n' +
  '0 -18 TD\n' +
  '(LinkedIn: linkedin.com/in/aryananand-ux) Tj\n' +
  '0 -50 TD\n' +
  '/F1 11 Tf\n' +
  '([ DEMO PLACEHOLDER - Replace public/resume.pdf with your actual resume ]) Tj\n' +
  'ET';

const obj1 = '1 0 obj\n<</Type /Catalog /Pages 2 0 R>>\nendobj\n';
const obj2 = '2 0 obj\n<</Type /Pages /Kids [3 0 R] /Count 1>>\nendobj\n';
const obj3 =
  '3 0 obj\n' +
  '<</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R' +
  ' /Resources <</Font <</F1 <</Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold>>>>>>>>\n' +
  'endobj\n';
const obj4 =
  '4 0 obj\n' +
  `<</Length ${streamContent.length}>>\n` +
  'stream\n' +
  streamContent +
  '\nendstream\nendobj\n';

const header = '%PDF-1.4\n';
const off1 = header.length;
const off2 = off1 + obj1.length;
const off3 = off2 + obj2.length;
const off4 = off3 + obj3.length;

const body = header + obj1 + obj2 + obj3 + obj4;
const xrefOffset = body.length;
const pad = (n) => String(n).padStart(10, '0');

const xref =
  'xref\n' +
  '0 5\n' +
  '0000000000 65535 f \n' +
  `${pad(off1)} 00000 n \n` +
  `${pad(off2)} 00000 n \n` +
  `${pad(off3)} 00000 n \n` +
  `${pad(off4)} 00000 n \n` +
  'trailer\n' +
  '<</Size 5 /Root 1 0 R>>\n' +
  'startxref\n' +
  `${xrefOffset}\n` +
  '%%EOF\n';

fs.writeFileSync(outPath, body + xref, 'latin1');
console.log('Demo PDF created at', outPath);
console.log('   Replace public/resume.pdf with your real resume when ready.');
