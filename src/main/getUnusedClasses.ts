import fs from 'fs/promises';
import { Config } from '../config';
import unusedClassMapper, {
  UnusedClassesMap
} from '../helpers/unusedClassMapper';
import findHtml from './../helpers/findHtml';
import findUnusedCss from './findUnusedCss';

export default class UnusedClasses {
  private allHtmlContent = '';

  constructor(private config: Config) {}

  async getUnusedClasses(projectPath: string): Promise<UnusedClassesMap[]> {
    const list = findHtml(projectPath);
    const result = await this.mapClasses(list);

    return result.filter((c) => (c.length ? c[0] : [])?.length > 0);
  }

  getGlobalUnusedClasses(globalStyles: string) {
    return findUnusedCss(this.allHtmlContent, globalStyles, this.config);
  }

  /**
   *
   * @param list List of html files to be checked
   * @returns
   */
  public async mapClasses(list: string[]): Promise<UnusedClassesMap[]> {
    const promiseArray = list.map(async (htmlPath) => {
      const htmlContent = await fs.readFile(htmlPath, { encoding: 'utf8' });
      const cssPath = htmlPath.replace('.html', `.${this.config.styleExt}`);
      this.allHtmlContent += htmlContent;
      return unusedClassMapper(cssPath, htmlContent, htmlPath, this.config);
    });

    return Promise.all(promiseArray);
  }
}
