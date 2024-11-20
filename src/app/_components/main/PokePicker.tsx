import classNames from 'classnames';
import Image from 'next/image';
import monsterBall from '@/images/items/poke-ball.webp';
import { usePokebox } from '@/stores/usePokebox';
import { useToastAction } from '@/stores/actions/useToastAction';

interface PokePickerProps {
  id: number;
  name: string;
}

export default function PokePicker({ id, name }: PokePickerProps) {
  const { addToast } = useToastAction();
  const {
    checkIsPicked,
    action: { addPokemon, removePokemon },
  } = usePokebox();
  const isPicked = checkIsPicked(id);

  const handlePickerClick = () => {
    if (isPicked) {
      addToast({ type: 'error', message: `바이바이, ${name}!` });
      removePokemon(id);
    } else {
      addToast({ type: 'success', message: `${name}이(가) 포켓박스에 추가되었다!` });
      addPokemon(id);
    }
  };

  return (
    <button
      onClick={handlePickerClick}
      className={classNames('w-[30px] h-[30px] absolute top-[21px] right-2', isPicked ? 'opacity-100' : 'opacity-50')}
    >
      <Image src={monsterBall} alt="즐겨찾기" width={30} height={30} />
    </button>
  );
}
