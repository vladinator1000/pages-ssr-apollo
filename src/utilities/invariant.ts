export function invariant(value: boolean, message?: string): asserts value

export function invariant<T>(
  value: T | null | undefined,
  message?: string,
): asserts value is T

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function invariant(value: any, message?: string) {
  if (value === false || value === null || typeof value === 'undefined') {
    throw new Error(message || 'Value should be defined.')
  }
}
