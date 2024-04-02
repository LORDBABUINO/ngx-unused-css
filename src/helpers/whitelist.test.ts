import whitelist from './whitelist';
import { handler } from './whitelist/handler';
import { SELECTORS_TO_IGNORE } from '../constants';

jest.mock('./whitelist/handler', () => ({
  handler: jest.fn()
}));

describe('whitelist', () => {
  const classes = ['class1', 'class2'];
  const projectPath = 'path/to/project';
  const cssPath = `${projectPath}/path/to/css`;
  const ignore = [
    { file: 'path/to/css', selectors: ['class1'] },
    'ignore-this'
  ];

  beforeEach(() => {
    (handler as jest.Mock).mockClear();
  });

  it('should process classes with ignore rules', () => {
    const expectedIgnoreFileMatched = ignore[0];

    // Assuming handler function returns the filtered classes
    (handler as jest.Mock).mockImplementation(() => ['class2']);

    const result = whitelist(classes, cssPath, ignore, projectPath);
    expect(result).toEqual(['class2']);
    expect(handler).toHaveBeenCalledWith(
      classes,
      expectedIgnoreFileMatched,
      SELECTORS_TO_IGNORE.concat('ignore-this')
    );
  });
});
