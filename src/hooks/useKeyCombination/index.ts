import { useState, useEffect } from 'react';

const areKeysPressed = (combination = [], keysPressed: Set<any>) => {
  const required = new Set(combination);
  if (required.size !== keysPressed.size) {
    return false;
  }
  for (let elem of Array.from(keysPressed)) {
    required.delete(elem);
  }
  return required.size === 0;
};

/**
 * @param combination  the key combination to monitor
 * @param callback  the callback function when the combination is matched.
 * @param delay  optional delay for removing key detection on key up.
 */
export const useKeyCombination = (
  combination: string[],
  callback: () => void,
  delay = 0,
) => {
  const [keysPressed, setKeyPressed] = useState(new Set([]));
  const [combiMatched, setComboMatched] = useState(false);

  const downHandler = ({ key }) => {
    const updatedKeys = keysPressed.add(key);
    setKeyPressed(updatedKeys);
    setComboMatched(areKeysPressed(combination, updatedKeys));
  };

  const upHandler = ({ key }) => {
    setTimeout(() => {
      keysPressed.delete(key);
      setKeyPressed(keysPressed);
      setComboMatched(areKeysPressed(combination, keysPressed));
    }, delay);
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  useEffect(() => {
    if (combiMatched) {
      callback();
    }
  }, [combiMatched]);

  return combiMatched;
};
