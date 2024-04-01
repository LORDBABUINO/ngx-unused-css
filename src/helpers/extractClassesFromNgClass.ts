/**
 * Extract ngClass configuration and return array of all classes found
 * @param {string} value
 */
export default function extractClassesFromNgClass(value: string) {
  return [...value.matchAll(/{([^}]+)}/g)].flatMap((match) =>
    match[1]
      .replace(/[\n ]/g, '')
      .split(',')
      .map((e) => e.split(':')[0])
  );
}
