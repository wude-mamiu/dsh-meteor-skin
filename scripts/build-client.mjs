/**
 * Build client.js from client.template.js by embedding assets/webp/background-2560.webp
 * — the user's picture pre-upscaled to 2560px with Lanczos + unsharp mask. The
 * browser downscales it to the window (cover), which keeps the wallpaper crisp
 * instead of letting the GPU upscale a 1024px source.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

const PLACEHOLDER = '__BACKGROUND_DATA_URI__';
const image = readFileSync(join(root, 'assets', 'webp', 'background-2560.webp'));

const template = readFileSync(join(root, 'client.template.js'), 'utf8');
if (!template.includes(PLACEHOLDER)) {
  throw new Error(`client.template.js no longer contains ${PLACEHOLDER}`);
}

const output = template.replace(PLACEHOLDER, () => `data:image/webp;base64,${image.toString('base64')}`);
const target = join(root, 'client.js');
writeFileSync(target, output, 'utf8');
console.log(`client.js written: ${output.length} bytes (image ${image.length} bytes)`);
