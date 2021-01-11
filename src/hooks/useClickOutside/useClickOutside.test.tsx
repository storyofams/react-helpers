import React from 'react';
import { useRef } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useOnClickOutside } from '.';

describe('[hooks] useClickOutside', () => {
  it('should call handler when clicked outside', () => {
    const mockFn = jest.fn();

    const TestComponent = () => {
      const ref = useRef(null);
      useOnClickOutside(ref, mockFn);

      return (
        <div>
          <div ref={ref} data-testid="inside"></div>
          <div data-testid="outside"></div>
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);

    const insideEl = getByTestId('inside');
    const outsideEl = getByTestId('outside');

    fireEvent.mouseDown(insideEl);
    expect(mockFn).toHaveBeenCalledTimes(0);

    fireEvent.mouseDown(outsideEl);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should cleanup after unmount', () => {
    jest.spyOn(document, 'removeEventListener').mockImplementation();
    const TestComponent = () => {
      const ref = useRef(null);
      useOnClickOutside(ref, () => null);
      return <div ref={ref} />;
    };

    render(<TestComponent />).unmount();
    expect(document.removeEventListener).toBeCalledWith(
      'mousedown',
      expect.any(Function),
    );
    expect(document.removeEventListener).toBeCalledWith(
      'touchstart',
      expect.any(Function),
    );
  });
});
