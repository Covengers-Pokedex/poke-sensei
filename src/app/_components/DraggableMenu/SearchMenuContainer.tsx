import classNames from 'classnames';
import { useEffect, useState } from 'react';
import SearchMenuContent from './SearchMenuContent';
import Image from 'next/image';
import defaultPokemonImage from '@/images/pokemon/pikachu.png';

interface SearchMenuContainerProps {
  isOpenMenu: boolean;
}

export default function SearchMenuContainer({ isOpenMenu }: SearchMenuContainerProps) {
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
    <div className={'absolute-center w-full flex justify-center'}>
      <div
        className={classNames(
          'flex gap-4 flex-col md:flex-row',
          isOpenMenu ? 'visible animate-slideInEllipticBottomBck' : 'animate-slideOutEllipticBottomFwd',
          !isVisible && 'invisible',
        )}
      >
        <Image
          className={'m-auto h-[150px] w-[150px] md:h-[375px] md:w-[375px]'}
          src={defaultPokemonImage}
          alt={'포켓몬 이미지'}
          height={375}
          width={375}
        />
        <SearchMenuContent />
      </div>
    </div>
  );
}
