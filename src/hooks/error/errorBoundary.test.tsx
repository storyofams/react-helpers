import React, { useState } from 'react';

import { renderHook } from '@testing-library/react-hooks';
import TestRenderer from 'react-test-renderer';

import { useErrorBoundary } from '~hooks/error';
import { render, screen, fireEvent } from '~lib/test-utils';

import { UseErrorBoundaryOptions } from './index';

const { act } = TestRenderer;

const ExplosionErrorMessage = '💥';
const Boom = () => {
  throw Error(ExplosionErrorMessage);
};

const Bomb = (opts: UseErrorBoundaryOptions) => {
  const [showBoom, setShowBoom] = useState(false);
  const { ErrorBoundary, didCatch, error } = useErrorBoundary(opts);

  return (
    <>
      {didCatch ? <span data-testid="did-catch">got em</span> : null}
      {error ? <span data-testid="error">{error?.message}</span> : null}
      <ErrorBoundary>
        <button data-testid="boom-btn" onClick={() => setShowBoom(true)}>
          boom
        </button>
        {showBoom ? <Boom /> : null}
      </ErrorBoundary>
    </>
  );
};

let consoleSpy: jest.SpyInstance | null = null;

beforeEach(() => {
  consoleSpy = jest.spyOn(console, 'error').mockImplementation();
});

afterEach(() => {
  consoleSpy?.mockRestore();
  jest.restoreAllMocks();
});

describe('[hooks](state) useArray string[]', () => {
  it('should render with default state', () => {
    const { result } = renderHook(() => useErrorBoundary());

    expect(result.current.error).toBe(undefined);
    expect(result.current.didCatch).toBe(false);
    expect(result.current.ErrorBoundary).toBeDefined();
  });

  it('should catch errors', async () => {
    const onDidCatch = jest.fn();

    render(<Bomb onDidCatch={onDidCatch} />);

    act(() => fireEvent.click(screen.getByTestId('boom-btn')));

    screen.debug();

    // // Hook should provide didCatch and error
    // expect(screen.getByText('got em')).toHaveTextContent();
    // expect(screen.getByTestId('error-message')).toHaveTextContent(
    //   ExplosionErrorMessage,
    // );
    expect(onDidCatch).toBeCalledTimes(1);
    // React and testing-library calls console.error when a boundary catches
    expect(console.error).toHaveBeenCalledTimes(2);
  });
});
