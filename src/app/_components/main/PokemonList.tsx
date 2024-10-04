import Image from 'next/image';
import esanghe from '@/images/pokemon/esanghe.jpg';
import monsterBall from '@/images/items/poke-ball.webp';
export default function PokemonList() {
  const mockData = [
    { id: 1, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 2, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 3, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 4, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 5, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 6, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 7, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 8, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 9, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 10, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 11, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 12, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 13, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 14, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 15, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 16, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 17, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 18, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 19, name: '이상해씨', types: ['풀', '독'], image: esanghe },
    { id: 20, name: '이상해씨', types: ['풀', '독'], image: esanghe },
  ];
  ``;
  return (
    <div className="grid gap-4 justify-items-center grid-cols-[repeat(auto-fit,minmax(210px,1fr))]  pt-[40%]">
      {mockData.map(pokemon => (
        <div
          key={pokemon.id}
          className="flex transition-all ease-in duration-200 hover:scale-110 bg-white rounded-xl shadow-md flex-col border relative w-[210px] h-[210px]  p-4 items-center justify-between"
        >
          <span className="absolute top-1 text-xs opacity-30 ">No.{pokemon.id}</span>
          <span className="flex pt-1.5 justify-center w-full">{pokemon.name}</span>

          <button className="w-[30px] h-[30px] absolute top-[21px] right-2">
            <Image className="opacity-50" src={monsterBall} alt="즐겨찾기" fill />
          </button>

          <Image src={pokemon.image} alt="포켓몬 이미지" width={50} height={50} />
          <div className="flex w-full gap-2 flex-nowrap ">
            {pokemon.types.map(type => (
              <span className="w-full border py-1 text-sm rounded-lg flex justify-center" key={type}>
                {type}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
