const camelToSnake = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export const convertKeysToSnakeCase = <T>(input: T): T => {
  // Array → recurse on each item
  if (Array.isArray(input)) {
    return input.map(convertKeysToSnakeCase) as T;
  }

  // Object → convert keys
  if (input !== null && typeof input === 'object') {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(input)) {
      result[camelToSnake(key)] = convertKeysToSnakeCase(value);
    }

    return result as T;
  }

  // Primitive → return as-is
  return input;
};

export const snakeToCamel = (str: string): string =>
  str.replace(/^_+/, '').replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());

export const convertKeysToCamelCase = <T>(input: T): T => {
  if (Array.isArray(input)) {
    return input.map(convertKeysToCamelCase) as T;
  }

  if (input !== null && typeof input === 'object') {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(input)) {
      result[snakeToCamel(key)] = convertKeysToCamelCase(value);
    }

    return result as T;
  }

  return input;
};
