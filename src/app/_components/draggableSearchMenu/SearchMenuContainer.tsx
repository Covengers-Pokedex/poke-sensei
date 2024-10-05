import classNames from 'classnames';
import SearchMenuContent from './SearchMenuContent';
import Image from 'next/image';
import defaultPokemonImage from '@/images/pokemon/pikachu.gif';
import { useHidden } from '@/hooks/useHidden';

interface SearchMenuContainerProps {
  isOpenMenu: boolean;
  onCloseMenuClick: () => void;
}

export default function SearchMenuContainer({ isOpenMenu, onCloseMenuClick }: SearchMenuContainerProps) {
  const { isHidden } = useHidden(isOpenMenu);

  return (
    <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-full flex justify-center pointer-events-auto">
      <div
        className={classNames(
          'flex gap-4 flex-col items-center',
          isOpenMenu ? 'visible animate-fadeInBottom' : 'animate-fadeOutBottom',
          isHidden && 'hidden',
        )}
      >
        <button onClick={onCloseMenuClick} className="absolute right-1 top-0">
          x
        </button>
        <Image src={defaultPokemonImage} alt="포켓몬 이미지" height={75} width={75} unoptimized priority />
        <SearchMenuContent />
      </div>
    </div>
  );
}
