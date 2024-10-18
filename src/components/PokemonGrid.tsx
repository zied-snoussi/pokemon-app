import React, { Suspense, memo } from "react";
import Loading from "./Loading";
import PokemonItem from "./PokemonItem";
import { PokemonGridProps } from "../types";

/**
 * PokemonGrid component to display a grid of Pokémon items.
 *
 * @param {PokemonGridProps} props - The props for the component.
 * @returns {JSX.Element} The rendered PokemonGrid component.
 */
const PokemonGrid: React.FC<PokemonGridProps> = memo(
  ({ pokemons, darkMode, onSelectPokemon }) => {
    return (
      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokemons.map((pokemon) => (
            <PokemonItem
              key={pokemon.id}
              pokemon={pokemon}
              darkMode={darkMode}
              onSelect={() => onSelectPokemon(pokemon)}
            />
          ))}
        </div>
      </Suspense>
    );
  }
);

export default PokemonGrid;
