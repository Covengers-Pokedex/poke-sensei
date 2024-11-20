export type Pokebox = number[];

export interface PokeboxStore {
  pokebox: Pokebox;
  checkIsPicked: (id: number) => boolean;
  action: {
    addPokemon: (id: number) => void;
    removePokemon: (id: number) => void;
  };
}
