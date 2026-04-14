import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const root = resolve(import.meta.dirname, '..');
const svgPath = resolve(root, 'public/og-image.svg');
const pngPath = resolve(root, 'public/og-image.png');

const svg = await readFile(svgPath, 'utf8');

const resvg = new Resvg(svg, {
  fitTo: {
    mode: 'width',
    value: 1200,
  },
  background: 'rgba(13,17,23,1)',
  font: {
    loadSystemFonts: true,
    defaultFontFamily: 'DejaVu Sans Mono',
  },
});

const png = resvg.render().asPng();
await writeFile(pngPath, png);
