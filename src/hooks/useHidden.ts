import { useEffect, useState } from 'react';

export const useHidden = (isOpen: boolean) => {
  const [isHidden, setIsHidden] = useState(() => !isOpen);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      // 오픈 상태라면 hidden 속성을 해제해야 한다.
      setIsHidden(false);
    } else {
      // 바로 hidden 속성이 추가 되면 닫히는 애니메이션을 보여줄 수 없으므로,
      // isOpen이 false가 되면 애니메이션 시간동안 hidden 속성의 추가를 딜레이한다.
      timer = setTimeout(() => setIsHidden(true), 500);
    }

    return () => clearTimeout(timer); // 중복 타이머 세팅으로 의도치않은 에러를 막기 위한 클린업 함수
  }, [isOpen]);

  return { isHidden };
};
