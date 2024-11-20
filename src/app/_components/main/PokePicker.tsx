import classNames from 'classnames';
import Image from 'next/image';
import monsterBall from '@/images/items/poke-ball.webp';
import { usePokebox } from '@/stores/usePokebox';
import { useToastAction } from '@/stores/actions/useToastAction';
import { MouseEvent } from 'react';
import party from 'party-js';
import { localeText } from '@/constants/localeText';
import { useLanguageStore } from '@/stores/useLanguageStore';

interface PokePickerProps {
  id: number;
  name: string;
}

export default function PokePicker({ id, name }: PokePickerProps) {
  const { language } = useLanguageStore();
  const { addToast } = useToastAction();
  const {
    checkIsPicked,
    action: { addPokemon, removePokemon },
  } = usePokebox();
  const isPicked = checkIsPicked(id);

  const handlePickerClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isPicked) {
      addToast({ type: 'error', message: `${localeText[language].dropPokemon} ${name}!` });
      removePokemon(id);
    } else {
      party.sparkles(event.target as HTMLButtonElement, {
        count: 20,
        speed: 80,
        size: party.variation.range(0.8, 1.2),
      });
      addToast({ type: 'success', message: `${name}${localeText[language].pickPokemon}` });
      addPokemon(id);
    }
  };

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
