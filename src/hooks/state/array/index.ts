import { useState } from 'react';

export function useArray<T>(
  initial: T[] = [],
): [
  T[],
  {
    add(value: T): void;
    remove(value: T): void;
    toggle(value: T): void;
    removeBy(value: T, key: string): void;
    toggleBy(value: T, key: string): void;
  },
] {
  const [state, setState] = useState(initial);

  const add = (value: T) => setState([...state, value]);

  const toggle = (value: T) => {
    let newState = state;

    if (['string', 'number'].includes(typeof value)) {
      const elExists = newState.find((s) => s === value);

      if (elExists) {
        return setState([...newState.filter((s) => s !== value)]);
      }
    } else {
      throw Error('Cannot handle that specific type, maybe you need toggleBy?');
    }

    return setState([...newState, value]);
  };

  const toggleBy = (value: T, key: string) => {
    let newState = state;

    if (typeof value === 'object') {
      const elExists = newState.find((s) => s[key] === value[key]);

      if (elExists) {
        return setState([...newState.filter((s) => s[key] !== value[key])]);
      }
    } else {
      throw Error('Cannot handle non-objects, maybe you need toggle?');
    }

    return setState([...newState, value]);
  };

  const remove = (value: T) => {
    let newState = state;

    if (['string', 'number'].includes(typeof value)) {
      const elExists = newState.find((s) => s === value);

      if (elExists) {
        return setState([...newState.filter((s) => s !== value)]);
      }
    } else {
      throw Error('Cannot handle that specific type, maybe you need removeBy?');
    }
  };

  const removeBy = (value: T, key: string) => {
    let newState = state;

    if (typeof value === 'object') {
      const elExists = newState.find((s) => s[key] === value[key]);

      if (elExists) {
        return setState([...newState.filter((s) => s[key] !== value[key])]);
      }
    } else {
      throw Error('Cannot handle non-objects, maybe you need remove?');
    }
  };

  const handlers = {
    add,
    remove,
    removeBy,
    toggle,
    toggleBy,
  };

  return [state, handlers];
}
