import { renderHook } from '@testing-library/react-hooks';
import TestRenderer from 'react-test-renderer';

import { useBoolean } from '~hooks/state';

const { act } = TestRenderer;

describe('[hooks](state) useBoolean', () => {
  it('should render with default state', () => {
    const { result } = renderHook(useBoolean);
    const [state, handlers] = result.current;

    expect(state).toBe(false);
    expect(typeof handlers.set).toBe('function');
    expect(typeof handlers.toggle).toBe('function');
    expect(typeof handlers.on).toBe('function');
    expect(typeof handlers.off).toBe('function');
  });

  it('should render with initial state specified', () => {
    const { result } = renderHook(useBoolean, {
      initialProps: true,
    });
    const [state] = result.current;

    expect(state).toBe(true);
  });

  it('should toggle the state', () => {
    const { result } = renderHook(useBoolean, {
      initialProps: true,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { toggle }] = result.current;

    act(toggle);

    const [state] = result.current;

    expect(state).toBe(false);
  });

  it('should set the state to false', () => {
    const { result } = renderHook(useBoolean, {
      initialProps: true,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { off }] = result.current;

    act(off);

    const [state] = result.current;

    expect(state).toBe(false);
  });

  it('should set the state to true', () => {
    const { result } = renderHook(useBoolean, {
      initialProps: false,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { on }] = result.current;

    act(on);

    const [state] = result.current;

    expect(state).toBe(true);
  });

  it('should set the state', () => {
    const { result } = renderHook(useBoolean, {
      initialProps: false,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { set }] = result.current;

    act(() => {
      set(true);
    });

    const [state] = result.current;

    expect(state).toBe(true);
  });
});
