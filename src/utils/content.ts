import fs from 'fs';
import path from 'path';

const base = path.join(process.cwd(), 'content');

export function getFiles(dir = '') {
  return fs.readdirSync(path.join(base, dir));
}

export function getFileContent({
  dir = '',
  filename,
}: {
  filename: string;
  dir?: string;
}) {
  if (!filename.endsWith('.md')) {
    filename += '.md';
  }
  return fs.readFileSync(path.join(base, dir, filename), 'utf-8');
}
