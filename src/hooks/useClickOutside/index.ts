import { MutableRefObject, useEffect } from 'react';

export const useOnClickOutside = (
  ref: MutableRefObject<any>,
  handler: (event: globalThis.MouseEvent) => any,
) => {
  useEffect(() => {
    const listener = (event: globalThis.MouseEvent) => {
      if (ref?.current?.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
