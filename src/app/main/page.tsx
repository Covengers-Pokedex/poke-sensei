import PokemonList from '../_components/main/PokemonList';
export default function MainPage() {
  return (
    <div className="max-w-[1200px] m-auto mt-20 rounded-xl px-10 min-h-[100vh] bg-gray-200">
      <PokemonList />
    </div>
  );
}
