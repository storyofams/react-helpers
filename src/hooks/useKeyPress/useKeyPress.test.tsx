import { act, renderHook } from '@testing-library/react-hooks';
import { useKeyPress } from './useKeyPress';

const targetKey = 'a';

const map: Record<string, any> = {};

beforeEach(() => {
  window.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });
});

describe('[hooks] useKeyPress', () => {
  it('should be defined', () => {
    expect(useKeyPress).toBeDefined();
  });

  it('should return true if the targetKey is pressed', () => {
    const hook = renderHook(useKeyPress, {
      initialProps: targetKey,
    });

    expect(hook.result.current).toBeFalsy();
    act(() => {
      map.keydown({ key: targetKey });
    });

    expect(hook.result.current).toBeTruthy();
  });
  it('should return true if the targetKey is pressed and not released', () => {
    const hook = renderHook(useKeyPress, {
      initialProps: targetKey,
    });

    expect(hook.result.current).toBeFalsy();

    act(() => {
      map.keydown({ key: targetKey });
      map.keyup({ key: 'b' });
    });

    expect(hook.result.current).toBeTruthy();
  });
  it('should return false if the targetKey is pressed and released', () => {
    const hook = renderHook(useKeyPress, {
      initialProps: targetKey,
    });

    act(() => {
      map.keydown({ key: targetKey });
    });

    expect(hook.result.current).toBeTruthy();

    act(() => {
      map.keyup({ key: targetKey });
    });
    expect(hook.result.current).toBeFalsy();
  });
  it('should return false if the targetKey is not the key pressed', () => {
    const hook = renderHook(useKeyPress, {
      initialProps: targetKey,
    });

    act(() => {
      map.keydown({ key: 'b' });
    });

    expect(hook.result.current).toBeFalsy();
  });
});
