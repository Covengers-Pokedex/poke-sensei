import Image from 'next/image';
import MonsterBallImage from '@/images/items/monster-ball.png';

interface ModalTabContentProps {
  pokemonData: any;
  tabActive: string;
}

export default function ModalTabContent({ pokemonData, tabActive }: ModalTabContentProps) {
  return (
    <div className="flex flex-col justify-between w-full h-[180px] sm:h-[150px] bg-black bg-opacity-50 rounded-b-2xl px-3 py-2 text-sm sm:text-base text-white">
      {tabActive === 'info' && (
        <>
          <p className="break-keep">{pokemonData?.flavor}</p>
          <div>
            <ul className="flex items-center gap-3 text-xs sm:text-base">
              <li>분류 - {pokemonData?.genus}</li>
              <li>신장 - {pokemonData?.height}m</li>
              <li>무게 - {pokemonData?.weight}kg</li>
            </ul>
          </div>
        </>
      )}
      {tabActive === 'evolution' && (
        <ul className="h-full flex justify-center items-center gap-5 md:gap-14">
          {pokemonData?.evolutionList.map((evolution: any) => {
            return (
              <li key={evolution.pokemonName} className="relative w-32">
                <span className="relative flex flex-col justify-center items-center pb-4 z-10">
                  <Image src={evolution.pokemonImage} width={70} height={60} alt="포켓몬 이미지" />
                </span>
                <Image
                  src={MonsterBallImage}
                  width={400}
                  height={400}
                  alt="포켓몬 이미지"
                  className="absolute w-[300px] top-[50%] translate-y-[-50%] opacity-80"
                />
              </li>
            );
          })}
        </ul>
      )}
      {tabActive === 'ability' && (
        <ul>
          {pokemonData?.abilityList.map((ability: any) => {
            return (
              <li key={ability.name} className="break-keep mb-1">
                {ability.name} - {ability.flavor}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
