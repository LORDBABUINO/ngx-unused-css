import path from 'path';
import { Ignore } from '../config';
import { SELECTORS_TO_IGNORE } from '../constants';
import { handler } from './whitelist/handler';

/**
 * Filters a list of CSS classes by removing those that are specified in the ignore list or match patterns from an Ignore object associated with the current CSS file path.
 *
 * @param classes - The list of CSS class names to be filtered.
 * @param cssPath - The path to the current CSS file being processed.
 * @param ignore - An array of strings or Ignore objects specifying classes or patterns to ignore.
 * @param projectPath - The root path of the project, used to resolve relative file paths.
 * @returns A filtered array of CSS class names that are not ignored based on the provided rules.
 */
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
