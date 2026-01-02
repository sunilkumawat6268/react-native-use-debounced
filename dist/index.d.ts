/**
 * Returns a debounced value that updates after `delay` milliseconds
 * from the last change to `value`.
 *
 * Useful for search inputs, autosave, validations, etc.
 */
declare function useDebouncedValue<T>(value: T, delay?: number): T;

export { useDebouncedValue as default };
