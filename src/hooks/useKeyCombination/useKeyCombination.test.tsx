import { act, renderHook } from '@testing-library/react-hooks';
import { useKeyCombination } from '~hooks';

const targetCombination = ['a', 'b'];
const callBack = jest.fn();

const map: Record<string, any> = {};

beforeEach(() => {
  window.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });
});

describe('[hooks] useKeyCombination', () => {
  it('should be defined', () => {
    expect(useKeyCombination).toBeDefined();
  });

  it('should return false if the targetCombination was not detected', async () => {
    const hook = renderHook(
      ({ combination, callBack }) => useKeyCombination(combination, callBack),
      {
        initialProps: { combination: targetCombination, callBack },
      },
    );
    await act(async () => {
      map.keydown({ key: targetCombination[0] });
      map.keyup({ key: targetCombination[0] });
    });

    expect(hook.result.current).toBeFalsy();
  });

  it('should return true if the targetCombination is detected', () => {
    const hook = renderHook(
      ({ combination, callBack }) => useKeyCombination(combination, callBack),
      {
        initialProps: { combination: targetCombination, callBack },
      },
    );
    act(() => {
      map.keydown({ key: targetCombination[0] });
      map.keydown({ key: targetCombination[1] });
    });
    expect(hook.result.current).toBeTruthy();
  });

  it('should return false if the targetCombination was detected but has been released', async () => {
    const hook = renderHook(
      ({ combination, callBack }) =>
        useKeyCombination(combination, callBack, 10),
      {
        initialProps: { combination: targetCombination, callBack },
      },
    );
    setTimeout(() => {
      act(() => {
        map.keydown({ key: targetCombination[0] });
        map.keydown({ key: targetCombination[1] });
        map.keyup({ key: targetCombination[0] });
        map.keyup({ key: targetCombination[1] });
      });
    }, 20);

    expect(hook.result.current).toBeFalsy();
  });

  it('should call the callback prop if the targetCombination is detected', () => {
    const hook = renderHook(
      ({ combination, callBack }) => useKeyCombination(combination, callBack),
      {
        initialProps: { combination: targetCombination, callBack },
      },
    );
    act(() => {
      map.keydown({ key: targetCombination[0] });
      map.keydown({ key: targetCombination[1] });
    });
    expect(hook.result.current).toBeTruthy();
    expect(callBack).toBeCalled();
  });
});
