import { useRef, useEffect } from 'react';

export const useTitle = (title: string, resetAfter?: boolean) => {
  let docTitle;

  if (typeof window !== 'undefined') {
    docTitle = document.title;
  }
  const beforeTitle = useRef<string>(docTitle);

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
