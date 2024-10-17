import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonDetails from "./components/PokemonDetails";
import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
