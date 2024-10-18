import { Dispatch, SetStateAction } from "react";

/**
 * Interface representing a Pokémon sprite.
 */
interface Sprite {
  sprites: {
    front_default: string;
  };
}

/**
 * Interface representing a Pokémon type.
 */
interface Type {
  pokemon_v2_type: {
    name: string;
  };
  type_id: number;
}

/**
 * Interface representing a Pokémon stat.
 */
interface Stat {
  pokemon_v2_stat: {
    name: string;
  };
  base_stat: number;
  stat_id: number;
}

/**
 * Interface representing a Pokémon.
 */
export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  pokemon_v2_pokemonsprites: Sprite[];
  pokemon_v2_pokemontypes: Type[];
  pokemon_v2_pokemonstats: Stat[];
}

/**
 * Interface representing the theme state.
 */
export interface ThemeState {
  darkMode: boolean;
}

/**
 * Interface representing the root state.
 */
export interface RootState {
  theme: ThemeState;
}

/**
 * Props for the PokemonItem component.
 */
export interface PokemonItemProps {
  pokemon: Pokemon;
  darkMode: boolean;
  onSelect: (pokemon: Pokemon) => void; // Callback function to handle selection
}

/**
 * Props for the PokemonModal component.
 */
export interface PokemonModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
  darkMode: boolean;
}

/**
 * Props for the SortDropdown component.
 */
export interface SortDropdownProps {
  sortCriteria: string;
  onChange: Dispatch<SetStateAction<string>>;
  darkMode: boolean;
}

/**
 * Props for the StatFilter component.
 */
export interface StatFilterProps {
  value: number;
  onChange: Dispatch<SetStateAction<{ stat: string; value: number }>>;
  darkMode: boolean;
}

/**
 * Props for the TypeDropdown component.
 */
export interface TypeDropdownProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  darkMode: boolean;
}

/**
 * Props for the PokemonGrid component.
 */
export interface PokemonGridProps {
  pokemons: Pokemon[];
  darkMode: boolean;
  onSelectPokemon: (pokemon: Pokemon) => void;
}

/**
 * Props for the Pagination component.
 */
export interface PaginationProps {
  totalPokemons: number;
  pokemonsPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  darkMode: boolean;
}

/**
 * Props for the ErrorComponent.
 */
export interface ErrorComponentProps {
  message: string;
  darkMode: boolean;
}

/**
 * Props for the SearchInput component.
 */
export interface SearchInputProps {
    searchTerm: string;
    onSearch: Dispatch<SetStateAction<string>>;
    darkMode: boolean;
}
  
/**
 * Props for the PokemonTypes component.
 */
export interface PokemonTypesProps {
    types: { pokemon_v2_type: { name: string } }[];
    darkMode: boolean;
}
  
/**
 * Props for the PokemonStats component.
 */
export interface PokemonStatsProps {
    name: string;
    stats: { base_stat: number }[];
    darkMode: boolean;
}
  
/**
 * Props for the PokemonHeader component.
 */
export interface PokemonHeaderProps {
    name: string;
    spriteUrl: string;
    darkMode: boolean;
  }