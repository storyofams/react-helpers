import { useEffect, useState } from 'react';

export const useHasScreenWidth = (min: number, max?: number): boolean => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const setScreenWidthHandler = () => setScreenWidth(window.innerWidth);

    setScreenWidthHandler();

    window.addEventListener('resize', setScreenWidthHandler);
    return () => window.removeEventListener('resize', setScreenWidthHandler);
  });

  return min < screenWidth && (max !== undefined ? screenWidth < max : true);
};
