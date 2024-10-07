import { useState } from 'react';

export const useToggle = () => {
  const [toggleValue, setToggle] = useState(false);

  const switchToggle = () => {
    setToggle(prevState => !prevState);
  };

  // 대부분의 경우 스위치 함수면 충분하겠지만,
  // 외부 API 응답에 따라 토글을 특정 상태로 설정해야 하는 경우 등 반드시 열림과 닫힘을 구분해야 하는 경우에 사용한다.
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
