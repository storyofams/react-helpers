import { useRef, useEffect } from 'react';

const useTitle = (title: string, resetAfter?: boolean) => {
  const beforeTitle = useRef<string>(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (resetAfter) {
        document.title = beforeTitle.current;
      }
    };
  }, []);
};

export default typeof document === 'undefined' ? () => {} : useTitle;
