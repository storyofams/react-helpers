import { useState, useEffect } from 'react';

export const useKeyPress = (targetKey: string): any => {
  const [keyIsPressed, setKeyIsPressed] = useState(false);

  const downHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyIsPressed(true);
    }
  };

  const upHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyIsPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return keyIsPressed;
};
