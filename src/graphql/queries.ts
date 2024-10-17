import { gql } from '@apollo/client';

// Query to get a list of Pokémon
export const GET_POKEMONS = gql`
  query getPokemons($limit: Int!) {
    pokemon_v2_pokemon(limit: $limit) {
      id
      name
      base_experience
      height
      weight
      pokemon_v2_pokemonabilities {
        ability: pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        front_default
      }
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
  query getPokemonDetails($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      base_experience
      height
      weight
      pokemon_v2_pokemonabilities {
        ability: pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;
