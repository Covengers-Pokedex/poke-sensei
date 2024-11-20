import { PokeboxStore } from '@/types/pokebox';
import { create } from 'zustand';

const getPokebox = () => {
  if (typeof window === 'undefined') {
    // SSR 방어
    return [];
  }

  const storage = localStorage.getItem('pokebox');

  if (!storage) {
    // 스토리지가 없다면 생성.
    localStorage.setItem('pokebox', JSON.stringify([]));
    return [];
  }

  return JSON.parse(storage) as number[];
};

const initialPokebox = getPokebox();

export const usePokebox = create<PokeboxStore>((set, get) => {
  const updatePokebox = (updatedPokebox: number[]) => {
    localStorage.setItem('pokebox', JSON.stringify(updatedPokebox));
    set({ pokebox: updatedPokebox });
  };

  return {
    pokebox: initialPokebox,
    checkIsPicked: (id: number) => get().pokebox.includes(id),
    action: {
      addPokemon: id => {
        updatePokebox([...get().pokebox, id]);
      },
      removePokemon: id => {
        updatePokebox(get().pokebox.filter(v => v !== id));
      },
    },
  };
});
