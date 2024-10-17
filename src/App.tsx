import { useSelector } from "react-redux";
import "./App.css";
import PokemonList from "./components/PokemonList";

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
          : "bg-gradient-to-r from-gray-100 to-gray-400 text-gray-800"
      } min-h-screen p-4`}
    >
      <h1 className="text-4xl font-bold text-center mb-8">Pokémon List</h1>
      <div
        className={`max-w-6xl mx-auto shadow-lg p-2 md:p-8 rounded-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <PokemonList />
      </div>
    </div>
  );
}

export default App;
