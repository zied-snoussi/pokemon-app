import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import PokemonList from "./components/PokemonList";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  interface RootState {
    theme: {
      darkMode: boolean;
    };
  }

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div
      className={`App ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-blue-200 to-blue-400 text-gray-800"
      } min-h-screen p-4`}
    >
      <h1 className="text-4xl font-bold text-center mb-8">Pokémon List</h1>
      <ThemeToggle />
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800">
        <PokemonList />
      </div>
    </div>
  );
}

export default App;
