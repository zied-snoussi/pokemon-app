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
      <header>
        <div className="flex flex-col items-center mb-8">
          <img
            src="/pokemon-icon.svg"
            alt="Pokémon Icon representing the Pokémon list application"
            className="w-16 h-16"
          />
          <h1 className="text-4xl font-bold text-center">Pokémon List</h1>
        </div>
      </header>
      <div
        className={`max-w-6xl mx-auto shadow-lg p-2 md:p-8 rounded-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <PokemonList />
      </div>
      <footer className={`text-center mt-8 ${darkMode ? "text-gray-300" : ""}`}>
        <p>
          Made with{" "}
          <span role="img" aria-label="Heart">
            ❤️
          </span>{" "}
          by{" "}
          <a
            href="https://github.com/zied-snoussi"
            target="_blank"
            rel="noopener noreferrer"
            className={`${darkMode ? "text-blue-400" : "text-blue-600"}`}
          >
            Zied SNOUSSI
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
