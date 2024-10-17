import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query getPokemons($limit: Int!) {
    pokemons(limit: $limit) {
      results {
        name
        image
        stats {
          hp
          attack
          defense
          speed
        }
        types {
          type {
            name
          }
        }
      }
    }
  }
`;
