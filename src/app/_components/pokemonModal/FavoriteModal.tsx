import { useLanguageStore } from '@/stores/useLanguageStore';
import FavoritePokemon from './components/FavoritePokemon';
import ModalTitle from './components/ModalTitle';
import { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { getPokemonInfo } from '@/lib/api/api';
import { localeText } from '@/constants/localeText';

interface FavoriteModalProps {
  turnOffToggle: () => void;
}

export default function FavoriteModal({ turnOffToggle }: FavoriteModalProps) {
  const { language } = useLanguageStore();
  const [favoriteNumberList, setFavoriteNumberList] = useState<string[]>([]);

  useEffect(() => {
    const local = localStorage.getItem('pokebox');
    const parsedLocal = local ? JSON.parse(local) : [];
    setFavoriteNumberList(parsedLocal);
  }, []);

  const queryResults = useQueries({
    queries: favoriteNumberList.map(id => ({
      queryKey: ['favoritePokemon', id],
      queryFn: () => getPokemonInfo({ number: id, language: language }),
    })),
  });

  const favoritePokemonList = queryResults.filter(result => result.isSuccess).map(result => result.data);

  const updateFavoritePokemonList = (id: number) => {
    const updatePokemonList = favoriteNumberList.filter(number => Number(number) !== id);
    setFavoriteNumberList(updatePokemonList);
    localStorage.setItem('pokebox', JSON.stringify(updatePokemonList));
  };

  return (
    <div className="w-screen max-w-[90%] sm:max-w-[500px] md:max-w-[700px] h-[75vh] max-h-[700px] bg-[#F0F0F0] rounded-2xl mx-auto p-2 md:p-4">
      <div className="relative h-full bg-[#A8D8A8] rounded-2xl overflow-y-auto">
        <ModalTitle
          modalTitle={localeText[language].modalFavoriteTitle}
          onTurnOffToggle={turnOffToggle}
          language={language}
        />
        {favoritePokemonList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 p-4 gap-2 sm:gap-3">
            {favoritePokemonList.map(favoritePokemon => (
              <FavoritePokemon
                key={favoritePokemon.id}
                name={favoritePokemon.name}
                image={favoritePokemon.image}
                id={favoritePokemon.id}
                onHandleRefreshData={updateFavoritePokemonList}
              />
            ))}
          </div>
        ) : (
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full text-center text-base sm:text-lg">
            {localeText[language].modalNotFavoritePokemon}
          </div>
        )}
      </div>
    </div>
  );
}
