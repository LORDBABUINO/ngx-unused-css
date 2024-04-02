import path from 'path';
import { Ignore } from '../config';
import { SELECTORS_TO_IGNORE } from '../constants';
import { handler } from './whitelist/handler';

export default function whitelist(
  classes: string[],
  cssPath: string,
  ignore: (string | Ignore)[],
  projectPath: string
) {
  const normalizedCssPath = path.resolve(cssPath);
  const fileToIgnore = ignore.find(
    (c) =>
      typeof c === 'object' &&
      path.resolve(projectPath, c.file) === normalizedCssPath
  ) as Ignore;

  const ignoreSelectors = SELECTORS_TO_IGNORE.concat(
    ignore.filter((c) => typeof c === 'string') as string[]
  );

  return handler(classes, fileToIgnore, ignoreSelectors);
}
