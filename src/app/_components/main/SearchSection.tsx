import { PokemonTypeWithColor } from '@/lib/api/type';
import { color } from 'framer-motion';
export default function SearchSection() {
  return (
    <div className="pt-20">
      <form className="flex w-full">
        <input className="" />
        <button>검색</button>
      </form>
      <div className="grid gap-3 grid-cols-6">
        {Object.entries(PokemonTypeWithColor).map(([type, color]) => (
          <button
            className="rounded-xl opacity-80 flex shadow-2xl justify-center py-1.5 text-white"
            style={{ backgroundColor: `${color}` }}
            key={type}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
