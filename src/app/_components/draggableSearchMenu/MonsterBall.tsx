import Image from 'next/image';
import pokeBall from '@/images/items/poke-ball.webp';

export default function MonsterBall() {
  return (
    <div className={'h-10 w-10 flex justify-center items-center border rounded-md shadow-md bg-white'}>
      <Image className={'pointer-events-none'} src={pokeBall} alt={'몬스터볼 이미지'} height={30} width={30} />
    </div>
  );
}
