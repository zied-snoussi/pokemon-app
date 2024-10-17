// src/components/PokemonDetails.tsx
import React from "react";
import { useParams } from "react-router-dom";

// interface Pokemon {
//   id: number;
//   name: string;
//   base_experience: number;
//   height: number;
//   weight: number;
//   abilities: Array<{ ability: { name: string; url: string } }>;
//   sprites: { front_default: string };
//   types: Array<{ type: { name: string; url: string } }>;
// }

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch Pokémon details based on ID
  // For demo purposes, we'll assume you already have the logic to fetch details here.

  return (
    <div>
      <h1>Pokémon Details</h1>
      <p>ID: {id}</p>
    </div>
  );
};

export default PokemonDetails;
