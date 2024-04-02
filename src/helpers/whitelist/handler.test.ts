import { handler } from './handler';
import { Ignore } from '../../config';

describe('handler function', () => {
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
