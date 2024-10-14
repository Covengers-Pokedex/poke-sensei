import classNames from 'classnames';
import Image from 'next/image';

interface ModalImageProps {
  pokemonData: any;
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  shiny: boolean;
}

export default function ModalImage({ pokemonData, number, setNumber, shiny }: ModalImageProps) {
  const pokemonImage = shiny ? pokemonData?.shiny : pokemonData?.image;
  return (
    <>
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
      <div className="relative flex justify-center">
        <Image
          src={pokemonImage || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png`}
          width={150}
          height={150}
          className="w-[100px] md:w-[150px]"
          alt={pokemonData?.name ? `${pokemonData.name} 이미지` : '포켓몬 이미지'}
        />
      </div>
    </>
  );
}
