import fs from 'fs';
import path from 'path';

/**
 * Find all htmls in the project
 *
 * @param base
 * @param ext
 * @param files
 * @param result
 * @returns
 */
export default function findHtml(
  base: string,
  ext = 'html',
  files?: string[],
  result: string[] = []
): string[] {
  return base
    ? (files || fs.readdirSync(base)).reduce((acc, file) => {
        const newBase = path.join(base, file);
        if (fs.statSync(newBase).isDirectory()) {
          return [...acc, ...findHtml(newBase, ext)];
        }
        return path.extname(file) === `.${ext}` ? [...acc, newBase] : acc;
      }, result)
    : result;
}
