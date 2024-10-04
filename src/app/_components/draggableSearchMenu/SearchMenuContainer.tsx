import classNames from 'classnames';
import { useEffect, useState } from 'react';
import SearchMenuContent from './SearchMenuContent';
import Image from 'next/image';
import defaultPokemonImage from '@/images/pokemon/pikachu-live.gif';

interface SearchMenuContainerProps {
  isOpenMenu: boolean;
  onCloseMenuClick: () => void;
}

export default function SearchMenuContainer({ isOpenMenu, onCloseMenuClick }: SearchMenuContainerProps) {
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
    <div className={'absolute left-1/2 top-1/4 -translate-x-1/2 w-full flex justify-center pointer-events-auto'}>
      <div
        className={classNames(
          'flex gap-4 flex-col items-center',
          isOpenMenu ? 'visible animate-slideInEllipticBottomBck' : 'animate-slideOutEllipticBottomFwd',
          !isVisible && 'hidden',
        )}
      >
        <button onClick={onCloseMenuClick} className={'absolute right-1 top-0'}>
          x
        </button>
        <Image src={defaultPokemonImage} alt={'포켓몬 이미지'} height={75} width={75} unoptimized priority />
        <SearchMenuContent />
      </div>
    </div>
  );
}
