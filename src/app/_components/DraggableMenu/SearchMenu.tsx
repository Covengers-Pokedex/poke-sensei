import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface SearchMenuProps {
  isOpenMenu: boolean;
}

export default function SearchMenu({ isOpenMenu }: SearchMenuProps) {
  const [isVisible, setIsVisible] = useState(isOpenMenu);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpenMenu) {
      // 오픈은 isOpenMenu과 같이 작동한다.
      setIsVisible(true);
    } else {
      // 바로 hidden이 되면 닫히는 애니메이션을 보여줄 수 없으므로,
      // isOpenMenu가 false가 되면 애니메이션 시간동안 메뉴의 닫힘을 딜레이한다.
      timer = setTimeout(() => setIsVisible(false), 500);
    }

    return () => clearTimeout(timer); // 중복 타이머 세팅으로 의도치않은 에러를 막기 위한 클린업 함수
  }, [isOpenMenu]);

  return (
    <div
      className={classNames(
        'w-72 border rounded-md p-3',
        isOpenMenu ? 'visible animate-scaleInVerCenter' : 'animate-scaleOutVerCenter',
        !isVisible && 'hidden',
      )}
    >
      <div className={'flex flex-col items-center'}>
        <h4>어떤 포켓몬을 찾아볼까요?</h4>
      </div>
    </div>
  );
}
