import { renderHook } from '@testing-library/react-hooks';
import { useIsMobile } from './useIsMobile';

jest.mock('theme-ui', () => ({
  useThemeUI() {
    return {
      theme: {
        breakpoints: {
          mobile: 769,
        },
      },
    };
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('[hooks] useIsMobile', () => {
  it('should return false for device is mobile on desktop window.innerwidth', () => {
    global.innerWidth = 1024;
    const { result } = renderHook(useIsMobile);
    expect(result.current).toBeFalsy();
  });

  it('should return true for device is mobile on mobile window.innerwidth', () => {
    global.innerWidth = 414;
    const { result } = renderHook(useIsMobile);
    expect(result.current).toBeTruthy();
  });
});
