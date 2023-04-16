import { useState, useCallback, ChangeEvent } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useInput(initialValue: any) {
  const [input, setInput] = useState(initialValue);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);
  const reset = useCallback(() => setInput(initialValue), [initialValue]);
  return [input, handler, reset] as const;
}
