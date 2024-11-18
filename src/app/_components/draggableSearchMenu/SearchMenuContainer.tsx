import classNames from 'classnames';
import Image from 'next/image';
import defaultPokemonImage from '@/images/pokemon/pikachu.gif';
import { useHidden } from '@/hooks/useHidden';
import BackDrop from '../modal/BackDrop';
import SearchMenuContent from './SearchMenuContent';
import { ReactNode } from 'react';

interface SearchMenuContainerProps {
  isOpenMenu: boolean;
  onCloseMenuClick: () => void;
  children: ReactNode;
}

export default function SearchMenuContainer({ isOpenMenu, onCloseMenuClick, children }: SearchMenuContainerProps) {
  const { isHidden } = useHidden(isOpenMenu);

  return (
    <>
      {!isHidden && (
        <div className="pointer-events-auto">
          <BackDrop
            className={classNames(isOpenMenu ? 'animate-backdropFadeIn' : 'animate-backdropFadeOut')}
            closeModal={onCloseMenuClick}
            backdropBgColor="#000000"
          />
          <div className="absolute left-1/2 top-1/4 -translate-x-1/2 modal-z-index">
            <div
              className={classNames(
                'flex gap-4 flex-col items-center',
                isOpenMenu ? 'animate-fadeInBottom' : 'animate-fadeOutBottom',
              )}
            >
              <button
                onClick={onCloseMenuClick}
                // x가 픽셀 느낌을 위해 아이콘이 아니라 단순 소문자다보니 문자가 아래로 치우쳐 있어 글자의 중앙 정렬을 수동으로 정렬함
                className="absolute right-0 top-0 font-black bg-white pb-[4px] pl-[10px] pr-[8px] rounded-full"
              >
                x
              </button>
              <Image src={defaultPokemonImage} alt="포켓몬 이미지" height={75} width={75} unoptimized priority />
              <SearchMenuContent searchMenuOff={onCloseMenuClick}>{children}</SearchMenuContent>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
