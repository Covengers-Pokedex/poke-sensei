'use client';

import useInfiniteScroll from '@/hooks/useInfinityScroll';
import usePokemonList from '@/hooks/useInfinityPokemons';
import SearchSection from './SearchSection';
import usePokemonTypeList from '@/hooks/useInfinityTypePokemons';
import PokemonList from './PokemonList';

export default function PokedexMain() {
  const { allPokemonData, fetchAllPokemonNextPage, hasMore } = usePokemonList();
  const {
    activedTypeNum,
    handleTypeButton,
    handleResetButton,
    typePokemonData,
    fetchTypePokemonNextPage,
    hasMoreType,
  } = usePokemonTypeList();

  const { targetRef, saveScrollPosition } = useInfiniteScroll(() => {
    saveScrollPosition();
    fetchAllPokemonNextPage();
  }, hasMore);

  const { targetRef: typeTargetRef, saveScrollPosition: typePosition } = useInfiniteScroll(
    () => {
      typePosition();
      fetchTypePokemonNextPage();
    },
    hasMoreType,
    activedTypeNum,
  );
  return (
    <>
      <SearchSection
        activedTypeNum={activedTypeNum}
        handleTypeButton={handleTypeButton}
        handleResetButton={handleResetButton}
      />
      <div className="grid gap-4 pb-10 justify-items-center grid-cols-[repeat(auto-fit,minmax(210px,1fr))] pt-10">
        {activedTypeNum === null ? (
          <PokemonList pokemonData={allPokemonData} targetRef={targetRef} />
        ) : (
          <PokemonList pokemonData={typePokemonData} targetRef={typeTargetRef} />
        )}
      </div>
    </>
  );
}
