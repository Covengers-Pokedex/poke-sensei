'use client';
import Image from 'next/image';
import monsterBall from '@/images/items/poke-ball.webp';
import matchTypeToColor from '@/utils/matchTypeToColor';
import useInfiniteScroll from '@/hooks/useInfinityScroll';
import usePokemonList from '@/hooks/usePokemonList';
import RandomPokemonLoading from '../loading/RandomPokemonLoading';
import { useState } from 'react';
import { useToggle } from '@/hooks/useToggle';
import ModalFrame from '../modal/ModalFrame';
import PokemonModal from '../pokemonModal/PokemonModal';

export default function PokemonList() {
  const { pokemonData, fetchNextPage, hasMore, isFetchingNextPage } = usePokemonList();
  const [pokemonId, setPokemonId] = useState<number>(0);
  const { toggleValue, switchToggle, turnOffToggle } = useToggle();

  const handlePokemonClick = (e: React.MouseEvent<HTMLDivElement>, pokemonId: number) => {
    // 몬스터볼(즐겨찾기) 클릭했을떄는 모달이 안뜨도록 적용
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    switchToggle();
    setPokemonId(pokemonId);
  };

  const { targetRef, saveScrollPosition } = useInfiniteScroll(() => {
    fetchNextPage();
    saveScrollPosition();
  }, hasMore);

  return (
    <div className="grid gap-4 pb-10 justify-items-center grid-cols-[repeat(auto-fit,minmax(210px,1fr))] pt-10">
      <ModalFrame isOpenModal={toggleValue} closeModal={turnOffToggle} backdropBgColor="#000000">
        <PokemonModal turnOffToggle={turnOffToggle} pokemonNumber={pokemonId} />
      </ModalFrame>
      {isFetchingNextPage && (
        <div className="backdrop modal-z-index bg-[rgba(168,216,168,0.9)]">
          <RandomPokemonLoading />
        </div>
      )}
      {pokemonData?.pages.map(pokemonList =>
        pokemonList.map(pokemon => (
          <div
            key={pokemon.id}
            className="flex transition-all ease-in duration-200 hover:scale-110 bg-white rounded-xl shadow-md flex-col border relative min-w-[210px] w-full max-w-[322.5px] h-full min-h-[210px] p-4 items-center justify-between cursor-pointer"
            onClick={e => {
              handlePokemonClick(e, pokemon.id);
            }}
          >
            <span className="absolute top-1 text-xs opacity-30">No.{pokemon.id}</span>
            <span className="flex pt-1.5 justify-center w-full">{pokemon.name}</span>

            <button className="w-[30px] h-[30px] absolute top-[21px] right-2">
              <Image className="opacity-50" src={monsterBall} alt="즐겨찾기" fill />
            </button>

            <Image src={pokemon.image} alt="포켓몬 이미지" width={50} height={50} />

            <div className="flex w-full gap-2 flex-nowrap">
              {pokemon.typeList.map(type => (
                <span
                  style={{ backgroundColor: `${matchTypeToColor(type.name)}` }}
                  className="w-full text-white py-1 opacity-80 shadow-lg text-sm rounded-lg flex justify-center"
                  key={type.name}
                >
                  {type.name}
                </span>
              ))}
            </div>
          </div>
        )),
      )}
      <div ref={targetRef}> </div>
    </div>
  );
}
