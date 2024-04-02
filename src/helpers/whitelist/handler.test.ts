import { handler } from './handler';
import { Ignore } from '../../config';

describe('handler function', () => {
  const input = ['.test.sub-no-used', '.class-no-used'];

  it('should filter selectors defined in ignore', () => {
    const fileToIgnore: Ignore = {
      file: 'filename',
      selectors: ['.class-no-used']
    };
    const results = handler(input, fileToIgnore, []);
    expect(results).toEqual(['.test.sub-no-used']);
  });

  it('should filter out all selectors', () => {
    const fileToIgnore: Ignore = {
      file: 'filename',
      selectors: ['.class-no-used', '.sub-no-used']
    };
    const results = handler(input, fileToIgnore, []);
    expect(results).toEqual([]);
  });
  test('filters classes based on ignore list', () => {
    const classes = ['btn-primary', 'text-center', 'hidden', 'active'];
    const ignore = ['hidden'];
    const result = handler(classes, undefined, ignore);
    expect(result).toMatchSnapshot();
  });

  test('ignores specific selectors from fileIgnore', () => {
    const classes = ['btn-primary', 'text-center', 'hidden', 'active'];
    const fileIgnore: Ignore = {
      file: 'example.css',
      selectors: ['btn-primary', 'active']
    };
    const ignore = ['hidden'];
    const result = handler(classes, fileIgnore, ignore);
    expect(result).toMatchSnapshot();
  });

  test('returns empty array if fileIgnore all is true', () => {
    const classes = ['btn-primary', 'text-center', 'hidden', 'active'];
    const fileIgnore: Ignore = { file: 'example.css', all: true };
    const ignore = ['hidden'];
    const result = handler(classes, fileIgnore, ignore);
    expect(result).toMatchSnapshot();
  });
});
