import monsterBall from '@/images/items/poke-ball.webp';
import Image from 'next/image';
import koreanTypeToColor from '@/utils/koreanTypeToColor';
import { LanguageTypes } from '@/types/language';

interface ModalTitleProps {
  pokemonData?: any;
  onTurnOffToggle?: () => void;
  modalTitle?: string;
  language: LanguageTypes;
}

export default function ModalTitle({ pokemonData, onTurnOffToggle, modalTitle, language }: ModalTitleProps) {
  const formattedId = pokemonData ? String(pokemonData.id).padStart(3, '0') : '000';
  return (
    <div>
      <div className="flex items-center justify-center relative pt-5 mb-5">
        <h2 className="title-line !font-Galmuri9 text-center text-[#F9DC42] text-2xl md:text-4xl">
          {modalTitle ? modalTitle : `#${formattedId} ${pokemonData?.name}`}
        </h2>
        {modalTitle === undefined && (
          <button>
            <Image className="opacity-50" width={50} height={50} src={monsterBall} alt="즐겨찾기" />
          </button>
        )}

        <button type="button" className="absolute top-5 right-5 text-2xl" onClick={onTurnOffToggle}>
          x
        </button>
      </div>
      <div className="flex justify-center items-center gap-1 sm:gap-3">
        {pokemonData?.typeList.map((type: any) => {
          return (
            <button
              type="button"
              key={type.name}
              className="w-20 text-sm md:text-base md:w-28 rounded-md flex justify-center py-1.5 text-white"
              style={{ backgroundColor: `${koreanTypeToColor(type.name, language)}` }}
            >
              {type.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
