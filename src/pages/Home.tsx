import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types";
import { Footer, Header } from "../components/layout";
import { PokemonList } from "../components/pokemon";

/**
 * Home component that serves as the main page of the application.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
const Home: React.FC = (): JSX.Element => {
  // Select the dark mode state from the Redux store
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div
      className={`App ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-gray-100 to-gray-400 text-gray-800"
      } min-h-screen p-4`}
    >
      {/* Render the header component */}
      <Header />

      {/* Main content area */}
      <div
        className={`max-w-6xl mx-auto shadow-lg p-2 md:p-8 rounded-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <PokemonList />
      </div>

      {/* Render the footer component */}
      <Footer />
    </div>
  );
};

export default Home;
