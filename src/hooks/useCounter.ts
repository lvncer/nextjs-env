import { useState, useCallback } from "react";

interface UseCounterProps {
  initialValue?: number;
  step?: number;
  min?: number;
  max?: number;
}

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
}

export function useCounter({
  initialValue = 0,
  step = 1,
  min = -Infinity,
  max = Infinity,
}: UseCounterProps = {}): UseCounterReturn {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => Math.min(prev + step, max));
  }, [step, max]);

  const decrement = useCallback(() => {
    setCount((prev) => Math.max(prev - step, min));
  }, [step, min]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const set = useCallback(
    (value: number) => {
      setCount(Math.min(Math.max(value, min), max));
    },
    [min, max]
  );

  return {
    count,
    increment,
    decrement,
    reset,
    set,
  };
}
