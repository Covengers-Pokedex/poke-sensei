import Image from 'next/image';
import PokePicker from '../../main/PokePicker';

export default function FavoritePokemon({
  name,
  image,
  id,
  onHandleRefreshData,
}: {
  name: string;
  image: string;
  id: number;
  onHandleRefreshData: (id: number) => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] relative">
        <Image src={image} className="object-contain py-5" fill sizes="100vw, 100vw" alt="포켓몬 이미지" />
      </div>
      <div className="flex items-center mt-2">
        <h3 className="outline-text text-sm sm:text-base md:text-lg">{name}</h3>
        <div className="flex items-center favorite-modal-important" onClick={() => onHandleRefreshData(Number(id))}>
          <PokePicker id={id} name={name} />
        </div>
      </div>
    </div>
  );
}
