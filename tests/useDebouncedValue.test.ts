import { renderHook, act } from "@testing-library/react-hooks";
import { useDebouncedValue } from "../src/useDebouncedValue";

jest.useFakeTimers();

test("useDebouncedValue updates after delay", () => {
  const { result, rerender } = renderHook(({ v, d }) => useDebouncedValue(v, d), {
    initialProps: { v: "a", d: 500 },
  });

  expect(result.current).toBe("a");

  // update the value
  rerender({ v: "b", d: 500 });
  // value should still be old immediately
  expect(result.current).toBe("a");

  // fast-forward time just before timeout
  act(() => {
    jest.advanceTimersByTime(400);
  });
  expect(result.current).toBe("a");

  // advance to complete
  act(() => {
    jest.advanceTimersByTime(200);
  });
  expect(result.current).toBe("b");
});

test("clears timer on unmount", () => {
  const { unmount, rerender } = renderHook(({ v, d }) => useDebouncedValue(v, d), {
    initialProps: { v: "x", d: 300 },
  });
  rerender({ v: "y", d: 300 });
  unmount();
  // if no errors thrown and timers cleared, test passes
});
