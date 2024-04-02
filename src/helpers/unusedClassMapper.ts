import fs from 'fs';
import { Config } from '../config';
import findUnusedCss from '../main/findUnusedCss';
import { promisify } from 'util';

type UnusedClasses = string[]; // Return class names as array of strings
export type UnusedClassesMap = [UnusedClasses, string]; // Second string is actual html file where unused classes were found

const stat = async (cssPath: string) => {
  try {
    // Try to read styling file path in order to determine if file exist
    await promisify(fs.stat)(cssPath);
    return true;
  } catch (error) {
    // console.warn(
    //   `Styling file ${cssPath} for component ${htmlPath} not found. Ensure the path is correct and the file exists. Skipping...`
    // );
    return false;
  }
};

/**
 * Returns array of classes/attributes not used in html
 *
 * @param cssPath - styling file path
 * @param htmlContent - html content to analyse
 * @param htmlPath - html file path
 * @returns Promise<([string[], string])>
 */
export default async function unusedClassMapper(
  cssPath: string,
  htmlContent: string,
  htmlPath: string,
  config: Config
): Promise<UnusedClassesMap> {
  const exists = await stat(cssPath);
  if (exists) {
    const classes = await findUnusedCss(htmlContent, cssPath, config);
    return [classes, htmlPath];
  }
  return [[], htmlPath];
}
