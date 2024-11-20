import classNames from 'classnames';
import Image from 'next/image';
import monsterBall from '@/images/items/poke-ball.webp';
import { useToastAction } from '@/stores/actions/useToastAction';
import { MouseEvent, useEffect, useState } from 'react';
import party from 'party-js';

interface PokePickerProps {
  id: number;
  name: string;
}

const getPokebox = () => {
  const storage = localStorage.getItem('pokebox');
  return storage ? (JSON.parse(storage) as number[]) : null;
};

export default function PokePicker({ id, name }: PokePickerProps) {
  const { addToast } = useToastAction();
  const [isPicked, setIsPicked] = useState<boolean>(false);

  const handlePickerClick = (event: MouseEvent<HTMLButtonElement>) => {
    const pokebox = getPokebox();
    if (pokebox) {
      if (isPicked) {
        localStorage.setItem('pokebox', JSON.stringify(pokebox.filter(v => v !== id)));
        addToast({ type: 'error', message: `바이바이, ${name}!` });
        setIsPicked(false);
      } else {
        localStorage.setItem('pokebox', JSON.stringify([...pokebox, id]));
        party.sparkles(event.target as HTMLButtonElement, {
          count: 20,
          speed: 80,
          size: party.variation.range(0.8, 1.2),
        });
        addToast({ type: 'success', message: `${name}이(가) 포켓박스에 추가되었다!` });
        setIsPicked(true);
      }
    }
  };

  useEffect(() => {
    const pokebox = getPokebox();
    if (pokebox) {
      const isPickedPokemon = pokebox.find(v => v === id);
      if (isPickedPokemon) {
        setIsPicked(true);
      } else {
        setIsPicked(false);
      }
    } else {
      localStorage.setItem('pokebox', JSON.stringify([]));
    }
  }, [isPicked]);

  return (
    <button
      onClick={handlePickerClick}
      className={classNames(
        'w-[30px] h-[30px] absolute top-[21px] right-2 hover:animate-wobbleNoneOpacity',
        isPicked ? 'opacity-100' : 'opacity-50',
      )}
    >
      <Image src={monsterBall} alt="즐겨찾기" width={30} height={30} />
    </button>
  );
}
