import { useState } from 'react';

export function useBoolean(
  initial: boolean = false,
): [
  boolean,
  {
    set(v: boolean): void;
    toggle(): void;
    on(): void;
    off(): void;
  },
] {
  const [state, setState] = useState(initial);

  const handlers = {
    set: (value: boolean) => setState(value),
    toggle: () => setState(!state),
    on: () => setState(true),
    off: () => setState(false),
  };

  return [state, handlers];
}
