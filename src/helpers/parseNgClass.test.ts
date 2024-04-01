import parseNgClass from './parseNgClass';

describe('Parse ngClass method', () => {
  const template = '<div [ngClass]="{ class1: true, class2: false }"></div>';

  it('should create all possible variations from given values in the ngClass attribute', () => {
    const results = parseNgClass(template);

    expect(results).toEqual(
      expect.stringMatching(/^<html><head><\/head><body>.*<\/body><\/html>$/)
    );
    expect(results).toEqual(expect.stringContaining('<div></div>'));
    expect(results).toEqual(
      expect.stringContaining('<div class="class1"></div>')
    );
    expect(results).toEqual(
      expect.stringContaining('<div class="class2"></div>')
    );
    expect(results).toEqual(
      expect.stringContaining('<div class="class1 class2"></div>')
    );
  });
});
