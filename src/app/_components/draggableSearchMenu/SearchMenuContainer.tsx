import classNames from 'classnames';
import SearchMenuContent from './SearchMenuContent';
import Image from 'next/image';
import defaultPokemonImage from '@/images/pokemon/pikachu.gif';
import { useHidden } from '@/hooks/useHidden';
import BackDrop from '../modal/BackDrop';

interface SearchMenuContainerProps {
  isOpenMenu: boolean;
  onCloseMenuClick: () => void;
}

export default function SearchMenuContainer({ isOpenMenu, onCloseMenuClick }: SearchMenuContainerProps) {
  const { isHidden } = useHidden(isOpenMenu);

  return (
    <>
      {!isHidden && (
        <div className="pointer-events-auto">
          <BackDrop closeModal={onCloseMenuClick} backdropBgColor="#000000" />
          <div className="absolute left-1/2 top-1/4 -translate-x-1/2 modal-z-index">
            <div
              className={classNames(
                'flex gap-4 flex-col items-center',
                isOpenMenu ? 'animate-fadeInBottom' : 'animate-fadeOutBottom',
                isHidden && 'hidden',
              )}
            >
              <button onClick={onCloseMenuClick} className="absolute right-1 top-0 font-black">
                x
              </button>
              <Image src={defaultPokemonImage} alt="포켓몬 이미지" height={75} width={75} unoptimized priority />
              <SearchMenuContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
