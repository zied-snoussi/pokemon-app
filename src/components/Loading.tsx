// src/components/Loading.tsx
import React from "react";
import { useSelector } from "react-redux";

interface RootState {
  theme: {
    darkMode: boolean;
  };
}

const Loading: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div
      className={`flex flex-col justify-center items-center h-screen w-full transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Spinning Pokéball */}
      <div className="relative w-24 h-24 animate-spin">
        <div
          className={`absolute inset-0 w-full h-full rounded-full border-t-4 ${
            darkMode ? "border-red-500" : "border-red-600"
          }`}
        ></div>
        <div
          className={`absolute inset-0 w-full h-full rounded-full border-b-4 ${
            darkMode ? "border-white" : "border-gray-100"
          }`}
        ></div>
        <div
          className={`absolute inset-0 w-12 h-12 m-auto bg-gray-700 rounded-full border-2 ${
            darkMode ? "border-gray-200" : "border-gray-400"
          }`}
        ></div>
      </div>

      {/* Loading Text */}
      <p className="mt-8 text-lg font-semibold tracking-wide">
        Catching Pokémon...
      </p>
    </div>
  );
};

export default Loading;
