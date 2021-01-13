import { fireEvent } from '@testing-library/dom';
import { act, renderHook } from '@testing-library/react-hooks';
import { closetag } from 'sitemap/dist/lib/sitemap-stream';
import { useHasScreenWidth } from './useHasScreenWidth';

describe('[hooks] useHasScreenWidth', () => {
  it('should return false when screen width is wider than max width', () => {
    global.innerWidth = 1024;
    const { result } = renderHook(() => useHasScreenWidth(0, 1023));
    expect(result.current).toBeFalsy();
  });

  it('should return true when screen width is narrower then max width', () => {
    global.innerWidth = 1024;
    const { result } = renderHook(() => useHasScreenWidth(0, 1025));
    expect(result.current).toBeTruthy();
  });

  it('should return false when screen width is narrower than min width', () => {
    global.innerWidth = 212;
    const { result } = renderHook(() => useHasScreenWidth(213));
    expect(result.current).toBeFalsy();
  });

  it('should return true when screen width is wider than min width', () => {
    global.innerWidth = 212;
    const { result } = renderHook(() => useHasScreenWidth(211));
    expect(result.current).toBeTruthy();
  });

  it('should update when the window resizes', () => {
    global.innerWidth = 212;
    const { result } = renderHook(() => useHasScreenWidth(211));
    expect(result.current).toBeTruthy();

    act(() => {
      global.innerWidth = 210;
      fireEvent(window, new Event('resize'));
    });

    expect(result.current).toBeFalsy();
  });
});
