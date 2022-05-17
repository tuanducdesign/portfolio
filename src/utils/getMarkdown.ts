import fs from 'fs/promises';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import matter from 'gray-matter';
import { nanoid } from 'nanoid';
import prism from 'remark-prism';

export const parser = remark().use(remarkHtml, { sanitize: false }).use(prism);
export const dataDir = path.join(process.cwd(), 'src/data');

export const getMarkdown = async (fileName: string, isProject?: boolean) => {
  let filePath;
  if (isProject) {
    filePath = path.join(dataDir, 'projects', fileName + '.md');
  } else {
    filePath = path.join(dataDir, fileName + '.md');
  }
  const file = await fs.readFile(filePath, 'utf-8');
  const { content, data } = matter(file);
  const html = await parser.process(content);
  return {
    html: html.toString(),
    meta: { ...data, slug: fileName, id: nanoid() },
  };
};
