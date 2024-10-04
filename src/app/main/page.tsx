import PokemonList from '../_components/main/PokemonList';
export default function MainPage() {
  return (
    <div className="max-w-[1200px] m-10 xl:m-auto mt-20 rounded-xl px-5 xl:px-10 min-h-[100vh] bg-gray-200">
      <PokemonList />
    </div>
  );
}
