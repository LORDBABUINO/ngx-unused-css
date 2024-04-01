/**
 * Returns array of all possible combinations of array values
 * e.g. if param is ["a", "b"] it will return [["a"], ["b"], ["a", "b"]]
 * @param { Array<string> } a - Array of strings
 */
export default function combine(a: string[]): string[][] {
  const buildCombinations = (
    index: number = 0,
    current: string[] = []
  ): string[][] =>
    index === a.length
      ? [current]
      : buildCombinations(index + 1, current.concat(a[index])).concat(
          buildCombinations(index + 1, current)
        );

  return buildCombinations().slice(0, -1);
}
