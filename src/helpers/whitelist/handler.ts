import { Ignore } from '../../config';

export function handler(
  classes: string[],
  fileIgnore: Ignore | undefined,
  ignore: string[]
) {
  const allIgnorePatterns = [...ignore, ...(fileIgnore?.selectors || [])];

  return fileIgnore?.all
    ? []
    : classes.filter(
      (c) =>
        !allIgnorePatterns.some((ignorePattern) => c.includes(ignorePattern))
    );
}
