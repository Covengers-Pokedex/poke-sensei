'use client';
import DraggableMenuTrigger from './_components/draggableSearchMenu/DraggableMenuTrigger';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getPokemonRandomImage } from '@/lib/api/api';

interface Pokemon {
  name: string | null;
  image: string;
  hint: string | null;
}

export default function Landing() {
  const FILTER_ON = 'filter brightness-0';
  const FILTER_OUT = 'filter brightness-100';
  const [randomPokemon, setRandomPokemon] = useState<Pokemon>({ name: '', image: '', hint: '' });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchRandomPokemon = async () => {
      try {
        const { pokemonName, pokemonRandomImage, pokemonHint } = await getPokemonRandomImage();
        console.log(pokemonName, pokemonRandomImage, pokemonHint);
        setIsLoading(false);
        setRandomPokemon({ name: pokemonName, image: pokemonRandomImage, hint: pokemonHint });
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
    };
    fetchRandomPokemon();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching Pokémon data</div>;
  }
  return (
    <div>
      <DraggableMenuTrigger />
      <div className="flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full min-h-[500px] pt-14 pb-10 max-w-[1200px] rounded-3xl bg-[#F2F4F6] border-4 border-[#ffffff]">
        <div className="absolute w-full top-[-30px]">
          <h1 className="title-line text-6xl text-center text-[#F9DC42]">오늘의 포켓몬은 뭘까요?</h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            className={`${FILTER_ON} mb-5`}
            src={
              isLoading && !randomPokemon.image
                ? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png'
                : randomPokemon.image
            }
            width={250}
            height={250}
            alt="포켓몬 이미지"
          />
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="text-l">{isLoading ? '포켓몬을 데려오고 있어요!' : randomPokemon.hint}</p>
            <input
              type="text"
              placeholder="포켓몬을 맞춰보세요!"
              className="w-80 h-10 p-3 border-2 border-[#C5C5C5] rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
