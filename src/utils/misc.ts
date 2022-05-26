export function pick<T, K extends keyof T>(obj: T, keys: K[]) {
  return keys.reduce(
    (acc, key) => ({ ...acc, [key]: obj[key] ?? null }),
    {} as Pick<T, K>,
  );
}
