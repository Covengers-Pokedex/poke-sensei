import Image from 'next/image';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getPokemonInfo } from '@/lib/api/api';
import { PokemonInfo, PokemonTypeWithColor } from '@/lib/api/type';

interface PokemonModalProps {
  turnOffToggle: () => void;
}

export default function PokemonModal({ turnOffToggle }: PokemonModalProps) {
  const [tabActive, setTabActive] = useState<string>('info');
  const [shiny, setShiny] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(1);

  const { data, isLoading, isError } = useQuery<PokemonInfo>({
    queryKey: ['pokemon', number],
    queryFn: async () => {
      const { id, weight, height, name, genus, flavor, typeList, image, shiny, abilityList } = await getPokemonInfo({
        number,
        language: 'ko',
      });
      return { id, weight, height, name, genus, flavor, typeList, image, shiny, abilityList };
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData, // 데이터 요청이 성공할 때까지 이전 데이터를 보여준다.
  });

  const formattedId = data ? String(data.id).padStart(3, '0') : '000';
  const pokemonImage = shiny ? data?.shiny : data?.image;

  useEffect(() => {
    setShiny(false);
    setTabActive('info');
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러...</div>;
  }
  return (
    <div className="relative w-[700px] h-[650px] bg-[#F0F0F0] rounded-2xl p-4">
      {/* 이전 버튼 */}
      <button
        type="button"
        className={classNames(
          'absolute top-[50%] translate-y-[-50%] left-7 w-10 h-10 pr-1 text-lg bg-[#D9D9D9] rounded-full z-10',
          number !== 1 && 'hover:scale-110 hover:bg-white',
        )}
        onClick={() => {
          setNumber(prev => prev - 1);
        }}
        disabled={number === 1}
      >
        〈
      </button>
      {/* 다음 버튼 */}
      <button
        type="button"
        className={classNames(
          'absolute top-[50%] translate-y-[-50%] right-7 w-10 h-10 pl-1 text-lg bg-[#D9D9D9] rounded-full transition-all z-10',
          number !== 1025 && 'hover:scale-110 hover:bg-white',
        )}
        onClick={() => {
          setNumber(prev => prev + 1);
        }}
        disabled={number === 1025}
      >
        〉
      </button>
      <div className="flex flex-col justify-between h-full bg-[#79C9FA] rounded-2xl">
        <div>
          <div className="relative pt-5 mb-5">
            <h2 className="title-line !font-Galmuri9 text-4xl text-center text-[#F9DC42]">
              #{formattedId} {data?.name}
            </h2>
            <button type="button" className="absolute top-5 right-5 text-2xl" onClick={turnOffToggle}>
              x
            </button>
          </div>
          <div className="flex justify-center items-center gap-3">
            {data?.typeList.map((type, index) => {
              const typeColor = PokemonTypeWithColor[type.name as keyof typeof PokemonTypeWithColor];
              return (
                <button
                  type="button"
                  key={index}
                  className="w-28 rounded-md flex justify-center py-1.5 text-white"
                  style={{ backgroundColor: typeColor }}
                >
                  {type.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="relative flex justify-center">
          <Image
            src={pokemonImage || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png`}
            width={150}
            height={150}
            alt={data?.name ? `${data.name} 이미지` : '포켓몬 이미지'}
          />
        </div>
        <div>
          <div className="flex justify-between items-center gap-3">
            <div>
              <button
                type="button"
                onClick={() => {
                  setTabActive('info');
                }}
                className={classNames('w-24 h-8 rounded-t-lg', tabActive === 'info' ? 'bg-[#ffffff]' : 'bg-[#D9D9D9]')}
              >
                정보
              </button>
              <button
                type="button"
                onClick={() => {
                  setTabActive('evolution');
                }}
                className={classNames(
                  'w-24 h-8 rounded-t-lg',
                  tabActive === 'evolution' ? 'bg-[#ffffff]' : 'bg-[#D9D9D9]',
                )}
              >
                진화트리
              </button>
              <button
                type="button"
                onClick={() => {
                  setTabActive('ability');
                }}
                className={classNames(
                  'w-24 h-8 rounded-t-lg',
                  tabActive === 'ability' ? 'bg-[#ffffff]' : 'bg-[#D9D9D9]',
                )}
              >
                특성
              </button>
            </div>
            <button
              type="button"
              className="flex justify-center items-center gap-3 mr-3 outline-text"
              onClick={() => {
                setShiny(!shiny);
              }}
            >
              <span className="relative inline-block w-10 h-5 bg-[#D9D9D9] rounded-xl">
                <span
                  className={classNames(
                    'absolute top-[2px] inline-block w-4 h-4 rounded-full transition-transform duration-300 ease-in-out',
                    shiny ? 'bg-white translate-x-[0px]' : 'bg-[#e6e6e6] translate-x-[-16px]',
                  )}
                />
              </span>
              이로치
            </button>
          </div>
          <div className="flex flex-col justify-between w-full h-[150px] bg-black bg-opacity-50 rounded-b-2xl px-3 py-2 text-white">
            {tabActive === 'info' && (
              <>
                <p className="break-keep">{data?.flavor}</p>
                <div>
                  <ul className="flex items-center gap-3">
                    <li>분류 - {data?.genus}</li>
                    <li>신장 - {data?.height}m</li>
                    <li>무게 - {data?.weight}kg</li>
                  </ul>
                </div>
              </>
            )}
            {tabActive === 'evolution' && <div className="">진화 트리</div>}
            {tabActive === 'ability' && (
              <div className="">
                <ul>
                  {data?.abilityList.map(ability => {
                    return (
                      <li key={ability.name} className="break-keep">
                        {ability.name} - {ability.flavor}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
