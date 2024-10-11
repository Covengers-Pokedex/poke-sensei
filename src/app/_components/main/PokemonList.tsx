import { PokemonInfo } from '@/lib/api/type';
import { InfiniteData } from '@tanstack/react-query';
import Image from 'next/image';
import monsterBall from '@/images/items/poke-ball.webp';
import koreanTypeToColor from '@/utils/koreanTypeToColor';
import { MutableRefObject } from 'react';
interface PokemonLIstProps {
  pokemonData: InfiniteData<PokemonInfo[] | undefined, unknown> | undefined;
  targetRef?: MutableRefObject<HTMLDivElement | null>;
}

export default function PokemonList({ pokemonData, targetRef }: PokemonLIstProps) {
  return (
    <>
      {pokemonData?.pages.map(pokemonList =>
        pokemonList?.map(pokemon => (
          <div
            key={pokemon.id}
            className="flex transition-all ease-in duration-200 hover:scale-110 bg-white rounded-xl shadow-md flex-col border relative min-w-[210px] w-full max-w-[322.5px] h-full min-h-[210px] p-4 items-center justify-between"
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
                  style={{ backgroundColor: `${koreanTypeToColor(type.name)}` }}
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
      {targetRef && <div ref={targetRef}> </div>}
    </>
  );
}
