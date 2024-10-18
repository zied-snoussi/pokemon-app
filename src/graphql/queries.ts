import { gql } from '@apollo/client';

// Query to get a list of Pokémon
export const GET_POKEMONS = gql`
query getPokemons($limit: Int!) {
  pokemon_v2_pokemon(limit: $limit) {
    id
    base_experience
    height
    is_default
    name
    order
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
      type_id
    }
    pokemon_v2_pokemonstats {
      pokemon_v2_stat {
        name
      }
      base_stat
      stat_id
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
      is_default
      order
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
        type_id
      }
      pokemon_v2_pokemonstats {
        pokemon_v2_stat {
          name
        }
        base_stat
        stat_id
      }
    }
  }
`;
