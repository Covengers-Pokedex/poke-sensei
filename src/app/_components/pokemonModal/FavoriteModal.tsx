import FavoritePokemon from './components/FavoritePokemon';
import ModalTitle from './components/ModalTitle';

interface FavoriteModalProps {
  turnOffToggle: () => void;
}

export default function FavoriteModal({ turnOffToggle }: FavoriteModalProps) {
  return (
    <div className="relative w-full max-w-[95%] sm:max-w-[500px] md:max-w-[700px] h-[75vh] bg-[#F0F0F0] rounded-2xl mx-auto p-2 md:p-4">
      <div className="h-full bg-[#A8D8A8] rounded-2xl overflow-y-auto">
        <ModalTitle modalTitle="즐겨찾기" onTurnOffToggle={turnOffToggle} />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 p-4 gap-2 sm:gap-3">
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
          <FavoritePokemon />
        </div>
      </div>
    </div>
  );
}
