import { useState } from 'react';

export const useToggle = (
  initialValue: boolean
): [boolean, () => void, () => void, () => void] => {
  const [booleanValue, setBooleanValue] = useState(initialValue);

  const toggleValue = () => {
    setBooleanValue(!booleanValue);
  };

  const setToTrue = () => {
    setBooleanValue(true);
  };

  const setToFalse = () => {
    setBooleanValue(false);
  };

  return [booleanValue, toggleValue, setToTrue, setToFalse];
};
