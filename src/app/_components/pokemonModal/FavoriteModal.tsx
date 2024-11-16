import { useLanguageStore } from '@/stores/useLanguageStore';
import FavoritePokemon from './components/FavoritePokemon';
import ModalTitle from './components/ModalTitle';

interface FavoriteModalProps {
  turnOffToggle: () => void;
}

export default function FavoriteModal({ turnOffToggle }: FavoriteModalProps) {
  const { language } = useLanguageStore();
  return (
    <div className="w-screen max-w-[90%] sm:max-w-[500px] md:max-w-[700px] h-[75vh] bg-[#F0F0F0] rounded-2xl mx-auto p-2 md:p-4">
      <div className="h-full bg-[#A8D8A8] rounded-2xl overflow-y-auto">
        <ModalTitle
          modalTitle={language === 'ko' ? '즐겨찾기' : 'Favorite'}
          onTurnOffToggle={turnOffToggle}
          language={language}
        />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 p-4 gap-2 sm:gap-3">
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
