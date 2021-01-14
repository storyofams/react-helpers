import React, { createRef } from 'react';
import { intersectionObserver } from '@shopify/jest-dom-mocks';
import { renderHook } from '@testing-library/react-hooks';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { useIntersection } from './useIntersection';

beforeEach(() => {
  intersectionObserver.mock();
  const IO = IntersectionObserver;
  jest.spyOn(IO.prototype, 'disconnect');
  jest.spyOn(global as any, 'IntersectionObserver');
  IntersectionObserver.prototype = IO.prototype;
});

afterEach(() => {
  intersectionObserver.restore();
});

describe('[hooks] useIntersectionObserver', () => {
  const container = document.createElement('div');
  let targetRef;

  it('should setup an IntersectionObserver targeting the ref element and using the options provided', () => {
    act(() => {
      targetRef = createRef();
      render(<div ref={targetRef} />, container);
    });

    expect(intersectionObserver.observers).toHaveLength(0);
    const observerOptions = { root: null, threshold: 0.8 };

    renderHook(() => useIntersection(targetRef, observerOptions));

    expect(intersectionObserver.observers).toHaveLength(1);
    expect(intersectionObserver.observers[0].target).toEqual(targetRef.current);
    expect(intersectionObserver.observers[0].options).toEqual(observerOptions);
  });

  it('should return null if a ref without a current value is provided', () => {
    targetRef = createRef();

    const { result } = renderHook(() =>
      useIntersection(targetRef, { root: null, threshold: 1 }),
    );
    expect(result.current).toBe(null);
  });

  it('should return the first IntersectionObserverEntry when the IntersectionObserver registers an intersection', () => {
    act(() => {
      targetRef = createRef();
      render(<div ref={targetRef} />, container);
    });

    const { result } = renderHook(() =>
      useIntersection(targetRef, { root: container, threshold: 0.8 }),
    );

    const mockIntersectionObserverEntry = {
      boundingClientRect: targetRef.current.getBoundingClientRect(),
      intersectionRatio: 0.81,
      intersectionRect: container.getBoundingClientRect(),
      isIntersecting: true,
      rootBounds: container.getBoundingClientRect(),
      target: targetRef.current,
      time: 300,
    };

    TestRenderer.act(() => {
      intersectionObserver.simulate(mockIntersectionObserverEntry);
    });

    expect(result.current).toEqual(mockIntersectionObserverEntry);
  });
});
