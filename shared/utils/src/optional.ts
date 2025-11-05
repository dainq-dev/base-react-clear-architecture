/**
 * Optional type utilities
 */

export type Optional<T> = T | None;
export type None = null | undefined;

export function isSome<T>(value: Optional<T>): value is T {
  return value !== null && value !== undefined;
}

export function isNone<T>(value: Optional<T>): value is None {
  return value === null || value === undefined;
}

