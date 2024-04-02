import path from 'path';
import sass from 'sass';
import { pathToFileURL } from 'url';
import { Config } from '../config';

/**
 * Compile styling file
 * @param {string} cssPath
 */
export default function compileSCSS(cssPath: string, config: Config): string {
  const options: sass.Options<'sync'> = {
    importers: [
      {
        // An importer that redirects relative URLs starting with "~" to
        // `node_modules`.
        findFileUrl(url: string) {
          return url.startsWith('~')
            ? new URL(
              path.join('node_modules', url.substring(1)),
              pathToFileURL('node_modules')
            )
            : null;
        }
      },
      ...(config.importer ? [config.importer] : [])
    ],
    loadPaths: config.includePaths
  };

  return sass.compile(cssPath, options).css.toString();
}
