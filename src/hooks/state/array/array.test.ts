import { renderHook } from '@testing-library/react-hooks';
import TestRenderer from 'react-test-renderer';

import { useArray } from '~hooks/state';

const { act } = TestRenderer;

const stringArray = ['A', 'B', 'C', 'D', 'E'];
const numbersArray = [0, 1, 2, 3, 4];
const objectsArray = [
  { id: 0, label: 'label', value: 0 },
  { id: 1, label: 'label', value: 1 },
  { id: 2, label: 'label', value: 2 },
  { id: 3, label: 'label', value: 3 },
  { id: 4, label: 'label', value: 4 },
];

describe('[hooks](state) useArray string[]', () => {
  it('should render with default state', () => {
    const { result } = renderHook(() => useArray<string>(stringArray));
    const [state, handlers] = result.current;

    expect(state).toHaveLength(5);
    expect(typeof handlers.add).toBe('function');
    expect(typeof handlers.remove).toBe('function');
    expect(typeof handlers.toggle).toBe('function');
  });

  it('should add an item', () => {
    const { result } = renderHook(() => useArray<string>(stringArray));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { add }] = result.current;

    act(() => add('F'));

    expect(result.current[0]).toHaveLength(6);
  });

  it('should remove an item', () => {
    const { result } = renderHook(() => useArray<string>(stringArray));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { remove }] = result.current;

    act(() => remove(stringArray[1]));

    expect(result.current[0]).toHaveLength(4);
  });

  it('should not remove an item if it does not exist', () => {
    const { result } = renderHook(() => useArray<string>(stringArray));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { remove }] = result.current;

    act(() => remove('DOES_NOT_EXIST'));

    expect(result.current[0]).toHaveLength(5);
  });

  it('should toggle an item', () => {
    const { result } = renderHook(() => useArray<string>(stringArray));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { toggle }] = result.current;

    act(() => toggle(stringArray[1]));

    expect(result.current[0]).toHaveLength(4);

    act(() => result.current[1].toggle(stringArray[1]));

    expect(result.current[0]).toHaveLength(5);
  });

  it('should throw an error when toggling', () => {
    const { result } = renderHook(() => useArray<string>(stringArray));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { toggle }] = result.current;

    // @ts-ignore
    expect(() => act(() => toggle({}))).toThrow(
      /cannot handle that specific type, maybe you need toggleby?/i,
    );
  });

  it('should throw an error when removing', () => {
    const { result } = renderHook(() => useArray<string>(stringArray));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { remove }] = result.current;

    // @ts-ignore
    expect(() => act(() => remove({}))).toThrow(
      /cannot handle that specific type, maybe you need removeby?/i,
    );
  });
});

describe('[hooks](state) useArray number[]', () => {
  it('should render with default state', () => {
    const { result } = renderHook(() => useArray<number>(numbersArray));
    const [state, handlers] = result.current;

    expect(state).toHaveLength(5);
    expect(typeof handlers.add).toBe('function');
    expect(typeof handlers.remove).toBe('function');
    expect(typeof handlers.toggle).toBe('function');
  });

  it('should add an item', () => {
    const { result } = renderHook(() => useArray<number>(numbersArray));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { add }] = result.current;

    act(() => add(5));

    expect(result.current[0]).toHaveLength(6);
  });

  it('should remove an item', () => {
    const { result } = renderHook(() => useArray<number>(numbersArray));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { remove }] = result.current;

    act(() => remove(numbersArray[1]));

    expect(result.current[0]).toHaveLength(4);
  });

  it('should not remove an item if it does not exist ', () => {
    const { result } = renderHook(() => useArray<number>(numbersArray));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { remove }] = result.current;

    act(() => remove(99999));

    expect(result.current[0]).toHaveLength(5);
  });

  it('should toggle an item', () => {
    const { result } = renderHook(() => useArray<number>(numbersArray));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { toggle }] = result.current;

    act(() => toggle(numbersArray[1]));

    expect(result.current[0]).toHaveLength(4);

    act(() => result.current[1].toggle(numbersArray[1]));

    expect(result.current[0]).toHaveLength(5);
  });

  it('should throw an error for toggling', () => {
    const { result } = renderHook(() => useArray<string>(stringArray));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { toggle }] = result.current;

    // @ts-ignore
    expect(() => act(() => toggle({}))).toThrow(
      /cannot handle that specific type, maybe you need toggleby?/i,
    );
  });

  it('should throw an error for removing', () => {
    const { result } = renderHook(() => useArray<string>(stringArray));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { remove }] = result.current;

    // @ts-ignore
    expect(() => act(() => remove({}))).toThrow(
      /cannot handle that specific type, maybe you need removeby?/i,
    );
  });
});

describe('[hooks](state) useArray {}[]', () => {
  it('should render with default state', () => {
    const { result } = renderHook(() =>
      useArray<{ id: number; label: string; value: number }>(objectsArray),
    );
    const [state, handlers] = result.current;

    expect(state).toHaveLength(5);
    expect(typeof handlers.add).toBe('function');
    expect(typeof handlers.remove).toBe('function');
    expect(typeof handlers.toggle).toBe('function');
  });

  it('should add an item', () => {
    const { result } = renderHook(() =>
      useArray<{ id: number; label: string; value: number }>(objectsArray),
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { add }] = result.current;

    act(() => add({ id: 5, value: 5, label: 'five' }));

    expect(result.current[0]).toHaveLength(6);
  });

  it('should remove an item', () => {
    const { result } = renderHook(() =>
      useArray<{ id: number; label: string; value: number }>(objectsArray),
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { removeBy }] = result.current;

    act(() => removeBy(objectsArray[1], 'id'));

    expect(result.current[0]).toHaveLength(4);
  });

  it('should not remove an item if it does not exist', () => {
    const { result } = renderHook(() =>
      useArray<{ id: number; label: string; value: number }>(objectsArray),
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { removeBy }] = result.current;

    act(() => removeBy({ id: 99999, label: 'label', value: 1 }, 'id'));

    expect(result.current[0]).toHaveLength(5);
  });

  it('should toggle an item', () => {
    const { result } = renderHook(() =>
      useArray<{ id: number; label: string; value: number }>(objectsArray),
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { toggleBy }] = result.current;

    act(() => toggleBy(objectsArray[0], 'id'));

    expect(result.current[0]).toHaveLength(4);

    act(() => result.current[1].toggleBy(objectsArray[0], 'id'));

    expect(result.current[0]).toHaveLength(5);
  });

  it('should throw an error for toggling', () => {
    const { result } = renderHook(() => useArray<string>(stringArray));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { toggleBy }] = result.current;

    // @ts-ignore
    expect(() => act(() => toggleBy(''))).toThrow(
      /cannot handle non-objects, maybe you need toggle?/i,
    );
  });

  it('should throw an error for removing', () => {
    const { result } = renderHook(() => useArray<string>(stringArray));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { removeBy }] = result.current;

    // @ts-ignore
    expect(() => act(() => removeBy(''))).toThrow(
      /cannot handle non-objects, maybe you need remove?/i,
    );
  });
});
