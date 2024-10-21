import React, { memo } from "react";
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
import { PokemonStatsProps } from "../../types";

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

/**
 * PokemonStats component to display the stats of a Pokémon.
 *
 * @param {PokemonStatsProps} props - The props for the component.
 * @returns {JSX.Element} The rendered PokemonStats component.
 */
const PokemonStats: React.FC<PokemonStatsProps> = memo(
  ({ name, stats, darkMode }) => {
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
          label: `${name}'s Stats`,
          data: stats.map((stat) => stat.base_stat),
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
          label: `${name}'s Performance`,
          data: stats.map((stat) => stat.base_stat),
          backgroundColor: "rgba(255, 99, 132, 0.3)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          pointBorderColor: "#fff",
        },
      ],
    };

    return (
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
    );
  }
);

export default PokemonStats;
