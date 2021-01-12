import { useEffect, useState } from 'react';
import { useThemeUI } from 'theme-ui';

export const useIsMobile = () => {
  const { theme } = useThemeUI();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () =>
      setIsMobile(
        window.innerWidth < Number((theme.breakpoints as any).mobile),
      );

    checkIfMobile();

    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [theme.breakpoints]);

  return isMobile;
};
