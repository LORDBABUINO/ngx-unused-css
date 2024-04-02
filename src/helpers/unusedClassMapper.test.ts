import unusedClassMapper from './unusedClassMapper';
import findUnusedCss from '../main/findUnusedCss';
import mockFs from 'mock-fs';
import { Config } from '../config';

jest.mock('../main/findUnusedCss', () => jest.fn());

describe('unusedClassMapper', () => {
  beforeEach(() => {
    mockFs({
      'path/to/style.css': 'body { background-color: #fff; }',
      'path/to/component.html': '<div class="unused-class">Hello World</div>'
    });

    (findUnusedCss as jest.Mock).mockClear();
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('should return unused classes and html path', async () => {
    const cssPath = 'path/to/style.css';
    const htmlContent = '<div class="unused-class">Hello World</div>';
    const htmlPath = 'path/to/component.html';
    const config: Config = {
      path: 'path/to',
      styleExt: 'css',
      ignore: []
    };

    (findUnusedCss as jest.Mock).mockResolvedValue(['unused-class']);

    const result = await unusedClassMapper(
      cssPath,
      htmlContent,
      htmlPath,
      config
    );

    expect(result).toEqual([['unused-class'], htmlPath]);
    expect(findUnusedCss).toHaveBeenCalledWith(htmlContent, cssPath, config);
  });

  // it('should throw an error if the CSS file does not exist', async () => {
  //   const cssPath = 'path/to/nonexistent.css';
  //   const htmlContent = '<div class="some-class">Hello World</div>';
  //   const htmlPath = 'path/to/component.html';
  //   const config: Config = {
  //     path: 'path/to',
  //     styleExt: 'css',
  //     ignore: []
  //   };

  //   await expect(
  //     unusedClassMapper(cssPath, htmlContent, htmlPath, config)
  //   ).rejects.toThrow(
  //     `Styling file ${cssPath} for component ${htmlPath} not found. Ensure the path is correct and the file exists. Skipping...`
  //   );
  // });
});
