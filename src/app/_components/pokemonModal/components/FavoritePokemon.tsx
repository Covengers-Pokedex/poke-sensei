import pokemonImage from '@/images/pokemon/pikachu.gif';
import monsterBall from '@/images/items/poke-ball.webp';
import Image from 'next/image';

export default function FavoritePokemon() {
  return (
    <div className="flex flex-col items-center">
      <Image src={pokemonImage} width={80} height={80} alt="포켓몬 이미지" />
      <div className="flex items-center mt-2">
        <h3 className="outline-text text-sm sm:text-base md:text-lg">피카츄</h3>
        <button>
          <Image className="opacity-100" width={30} height={30} src={monsterBall} alt="즐겨찾기" />
        </button>
      </div>
    </div>
  );
}
