import { fireEvent } from '@testing-library/dom';
import { act, renderHook } from '@testing-library/react-hooks';
import { useHasScreenWidth } from './useHasScreenWidth';

describe('[hooks] useHasScreenWidth', () => {
  it('should return false when screen width is wider than max width', () => {
    globalThis.innerWidth = 1024;
    const { result } = renderHook(() => useHasScreenWidth(0, 1023));
    expect(result.current).toBeFalsy();
  });

  it('should return true when screen width is narrower then max width', () => {
    globalThis.innerWidth = 1024;
    const { result } = renderHook(() => useHasScreenWidth(0, 1025));
    expect(result.current).toBeTruthy();
  });

  it('should return false when screen width is narrower than min width', () => {
    globalThis.innerWidth = 212;
    const { result } = renderHook(() => useHasScreenWidth(213));
    expect(result.current).toBeFalsy();
  });

  it('should return true when screen width is wider than min width', () => {
    globalThis.innerWidth = 212;
    const { result } = renderHook(() => useHasScreenWidth(211));
    expect(result.current).toBeTruthy();
  });

  it('should return true when screen width is within range', () => {
    globalThis.innerWidth = 212;
    const { result } = renderHook(() => useHasScreenWidth(212, 212));
    expect(result.current).toBeTruthy();
  });

  it('should update when the window resizes', () => {
    globalThis.innerWidth = 212;
    const { result } = renderHook(() => useHasScreenWidth(211));
    expect(result.current).toBeTruthy();

    act(() => {
      globalThis.innerWidth = 210;
      fireEvent(window, new Event('resize'));
    });

    expect(result.current).toBeFalsy();
  });
});
