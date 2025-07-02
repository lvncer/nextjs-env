import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("should initialize with default value of 0", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("should initialize with custom initial value", () => {
    const { result } = renderHook(() => useCounter({ initialValue: 10 }));
    expect(result.current.count).toBe(10);
  });

  it("should increment count by default step (1)", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("should increment count by custom step", () => {
    const { result } = renderHook(() => useCounter({ step: 5 }));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(5);
  });

  it("should decrement count by default step (1)", () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  it("should decrement count by custom step", () => {
    const { result } = renderHook(() => useCounter({ initialValue: 10, step: 3 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(7);
  });

  it("should reset count to initial value", () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }));

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(7);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(5);
  });

  it("should set count to specific value", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.set(42);
    });

    expect(result.current.count).toBe(42);
  });

  it("should respect maximum value limit", () => {
    const { result } = renderHook(() => useCounter({ max: 10 }));

    act(() => {
      result.current.set(15);
    });

    expect(result.current.count).toBe(10);

    act(() => {
      result.current.set(5);
      result.current.increment();
      result.current.increment();
      result.current.increment();
      result.current.increment();
      result.current.increment();
      result.current.increment(); // Should not go beyond max
    });

    expect(result.current.count).toBe(10);
  });

  it("should respect minimum value limit", () => {
    const { result } = renderHook(() => useCounter({ min: 0 }));

    act(() => {
      result.current.set(-5);
    });

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.decrement(); // Should not go below min
    });

    expect(result.current.count).toBe(0);
  });

  it("should work with both min and max limits", () => {
    const { result } = renderHook(() =>
      useCounter({
        initialValue: 5,
        min: 0,
        max: 10,
        step: 2,
      })
    );

    // Test max limit
    act(() => {
      result.current.increment(); // 7
      result.current.increment(); // 9
      result.current.increment(); // Should be 10 (max), not 11
    });

    expect(result.current.count).toBe(10);

    // Test min limit
    act(() => {
      result.current.set(1);
      result.current.decrement(); // Should be 0 (min), not -1
    });

    expect(result.current.count).toBe(0);
  });

  it("should maintain function reference stability", () => {
    const { result, rerender } = renderHook(() => useCounter());

    const firstIncrement = result.current.increment;
    const firstDecrement = result.current.decrement;
    const firstReset = result.current.reset;
    const firstSet = result.current.set;

    rerender();

    expect(result.current.increment).toBe(firstIncrement);
    expect(result.current.decrement).toBe(firstDecrement);
    expect(result.current.reset).toBe(firstReset);
    expect(result.current.set).toBe(firstSet);
  });
});
