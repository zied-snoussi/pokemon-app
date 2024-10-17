import { gql } from '@apollo/client';

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
        sprites
      }
    }
  }
`;
