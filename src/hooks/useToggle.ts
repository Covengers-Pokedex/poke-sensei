import { useState } from 'react';

export const useToggle = () => {
  const [toggleValue, setToggle] = useState(false);

  const switchToggle = () => {
    setToggle(prevState => !prevState);
  };

  const turnOnToggle = () => {
    setToggle(true);
  };

  const turnOffToggle = () => {
    setToggle(false);
  };

  return {
    toggleValue,
    switchToggle,
    turnOnToggle,
    turnOffToggle,
  };
};
