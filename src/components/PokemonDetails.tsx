import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_DETAILS } from "../graphql/queries";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaFire,
  FaLeaf,
  FaBolt,
  FaWater,
  FaGhost,
  FaSkullCrossbones,
} from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";
import { Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  RadarController,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import Loading from "./Loading";

// Register necessary Chart.js components
ChartJS.register(
  BarElement,
  RadarController,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface RootState {
  theme: {
    darkMode: boolean;
  };
}

const PokemonDetails: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { id: parseInt(id!) },
  });

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  const pokemon = data?.pokemon_v2_pokemon_by_pk;

  if (!pokemon) {
    return <p className="text-red-500">Pokémon not found.</p>;
  }

  // Prepare chart data
  const chartData = {
    labels: [
      "HP",
      "Attack",
      "Defense",
      "Special Attack",
      "Special Defense",
      "Speed",
    ],
    datasets: [
      {
        label: `${pokemon.name}'s Stats`,
        data: pokemon.pokemon_v2_pokemonstats.map(
          (stat: { base_stat: number }) => stat.base_stat
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const radarData = {
    labels: [
      "HP",
      "Attack",
      "Defense",
      "Special Attack",
      "Special Defense",
      "Speed",
    ],
    datasets: [
      {
        label: `${pokemon.name}'s Performance`,
        data: pokemon.pokemon_v2_pokemonstats.map(
          (stat: { base_stat: number }) => stat.base_stat
        ),
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
      },
    ],
  };

  const typeIconMap: {
    [key in
      | "fire"
      | "grass"
      | "electric"
      | "water"
      | "ghost"
      | "poison"]: JSX.Element;
  } = {
    fire: <FaFire className="text-red-500" />,
    grass: <FaLeaf className="text-green-500" />,
    electric: <FaBolt className="text-yellow-500" />,
    water: <FaWater className="text-blue-500" />,
    ghost: <FaGhost className="text-purple-500" />,
    poison: <FaSkullCrossbones className="text-purple-500" />,
  };

  const spriteUrl =
    pokemon.pokemon_v2_pokemonsprites[0]?.sprites.other["official-artwork"]
      .front_default;

  return (
    <motion.section
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="flex items-center justify-between mb-6">
        <button
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft className="h-5 w-5 mr-1" />
          Back to Home
        </button>
        <ThemeToggle />
      </header>

      <article className="flex flex-col items-center mb-8">
        <h2 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h2>
        <img
          src={spriteUrl}
          alt={pokemon.name}
          className="w-48 h-48 rounded-full border-4 border-blue-500 shadow-lg mb-4 transition-transform duration-300 hover:scale-105"
        />
      </article>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section
          className={`bg-gray-200 ${
            darkMode ? "dark:bg-gray-800" : ""
          } p-6 rounded-lg shadow-lg`}
        >
          <h3 className="text-xl font-semibold mb-4 text-center">
            Performance Stats
          </h3>
          <Bar data={chartData} />
        </section>

        <section
          className={`bg-gray-200 ${
            darkMode ? "dark:bg-gray-800" : ""
          } p-6 rounded-lg shadow-lg`}
        >
          <h3 className="text-xl font-semibold mb-4 text-center">
            Stat Overview
          </h3>
          <Radar data={radarData} />
        </section>
      </section>

      {/* Types Section */}
      <section
        className={`${
          darkMode ? "bg-gray-800" : "bg-gray-200"
        } p-6 rounded-lg shadow-lg mt-6`}
      >
        <h3 className="text-2xl font-semibold mb-4">Types:</h3>
        <ul className="flex space-x-4">
          {pokemon.pokemon_v2_pokemontypes.map(
            (type: { pokemon_v2_type: { name: string } }) => (
              <li
                key={type.pokemon_v2_type.name}
                className="flex items-center space-x-2 text-lg"
              >
                {
                  typeIconMap[
                    type.pokemon_v2_type.name as
                      | "fire"
                      | "grass"
                      | "electric"
                      | "water"
                      | "ghost"
                      | "poison"
                  ]
                }{" "}
                <span>{type.pokemon_v2_type.name}</span>
              </li>
            )
          )}
        </ul>
      </section>
    </motion.section>
  );
};

export default PokemonDetails;
