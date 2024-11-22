import Image from 'next/image';
import pokeBall from '@/images/items/poke-ball.webp';
import { Tooltip } from 'react-tooltip';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { localeText } from '@/constants/localeText';

interface MonsterBallProps {
  onClick: () => void;
}

export default function MonsterBall({ onClick }: MonsterBallProps) {
  const { language } = useLanguageStore();
  return (
    <>
      <div
        onClick={onClick}
        id="monsterBall"
        className="h-[65px] w-[65px] flex justify-center items-center rounded-full animate-wobbleHorBottom hover:animate-none"
      >
        <Image className="active:pointer-events-none " src={pokeBall} alt="몬스터볼 이미지" height={60} width={60} />
      </div>
      <Tooltip anchorSelect="#monsterBall" place="top">
        {localeText[language].draggableTooltip}
      </Tooltip>
    </>
  );
}
