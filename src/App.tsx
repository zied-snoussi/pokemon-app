import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetails from "./pages/PokemonDetails";
import NotFound from "./pages/NotFound";

/**
 * The main App component that sets up the routing for the application.
 *
 * @returns {JSX.Element} The rendered App component.
 */
const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        {/* Route for the Home page */}
        <Route path="/" element={<Home />} />

        {/* Route for the Pokémon details page */}
        <Route path="/pokemon/:id" element={<PokemonDetails />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
