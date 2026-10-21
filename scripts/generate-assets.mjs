// Generates the placeholder resume PDFs and the Open Graph image into /public.
// Run with: node scripts/generate-assets.mjs
// Replace public/resume-*.pdf with your real resumes (keep the file names), and og.png with your own artwork if you like.
import { writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

await mkdir('public', { recursive: true });

function pdf(lines) {
  const content = ['BT /F1 18 Tf 72 720 Td 24 TL', ...lines.map((l, i) => `${i ? 'T* ' : ''}(${l}) Tj`), 'ET'].join('\n');
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ];
  let out = '%PDF-1.4\n';
  const offsets = [];
  objs.forEach((o, i) => {
    offsets.push(Buffer.byteLength(out));
    out += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = Buffer.byteLength(out);
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((o) => (out += `${String(o).padStart(10, '0')} 00000 n \n`));
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return out;
}

await writeFile('public/resume-b2b.pdf', pdf(['R. Veera Manoharan - Resume (B2B-led)', 'Placeholder file. Replace with your real resume.']), 'latin1');
await writeFile('public/resume-devices.pdf', pdf(['R. Veera Manoharan - Resume (Devices-led)', 'Placeholder file. Replace with your real resume.']), 'latin1');

const slab = (i) => {
  const y = 40 + i * 78;
  const live = i === 0 || i === 4;
  const stroke = live ? '#e8893a' : '#38342e';
  const fill = live ? '#221f1c' : '#1a1816';
  return `<g fill="${fill}" stroke="${stroke}" stroke-width="2"><path d="M880 ${y}L1020 ${y + 34}L880 ${y + 68}L740 ${y + 34}Z"/><path d="M740 ${y + 34}V${y + 44}L880 ${y + 78}L1020 ${y + 44}V${y + 34}" fill="none"/></g>`;
};
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#12100e"/>
${[0, 1, 2, 3, 4, 5].map(slab).join('')}
<text x="72" y="300" font-family="Arial, Helvetica, sans-serif" font-size="84" font-weight="700" fill="#f1ece4">Products,</text>
<text x="72" y="392" font-family="Arial, Helvetica, sans-serif" font-size="84" font-weight="700" fill="#f1ece4">taken apart.</text>
<text x="72" y="470" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#a8a299">R. Veera Manoharan · Product manager</text>
<rect x="72" y="150" width="64" height="6" fill="#e8893a"/>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('Wrote resume PDFs and og.png');
