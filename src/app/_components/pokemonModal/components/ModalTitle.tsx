import { PokemonTypeWithColor } from '@/lib/api/type';

interface ModalTitleProps {
  pokemonData: any;
  onTurnOffToggle: () => void;
}

export default function ModalTitle({ pokemonData, onTurnOffToggle }: ModalTitleProps) {
  const formattedId = pokemonData ? String(pokemonData.id).padStart(3, '0') : '000';
  return (
    <div>
      <div className="relative pt-5 mb-5">
        <h2 className="title-line !font-Galmuri9 text-center text-[#F9DC42] text-2xl md:text-4xl">
          #{formattedId} {pokemonData?.name}
        </h2>
        <button type="button" className="absolute top-5 right-5 text-2xl" onClick={onTurnOffToggle}>
          x
        </button>
      </div>
      <div className="flex justify-center items-center gap-1 sm:gap-3">
        {pokemonData?.typeList.map((type: any) => {
          const typeColor = PokemonTypeWithColor[type.name as keyof typeof PokemonTypeWithColor];
          return (
            <button
              type="button"
              key={type.name}
              className="w-20 text-sm md:text-base md:w-28 rounded-md flex justify-center py-1.5 text-white"
              style={{ backgroundColor: typeColor }}
            >
              {type.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
