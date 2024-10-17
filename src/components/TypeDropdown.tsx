import React, { useState } from "react";
import { BiFilter } from "react-icons/bi";
import {
  FaFire,
  FaWater,
  FaLeaf,
  FaBolt,
  FaGhost,
  FaDragon,
  FaBug,
  FaFistRaised,
} from "react-icons/fa";

interface TypeDropdownProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  darkMode: boolean;
}

const TypeDropdown: React.FC<TypeDropdownProps> = ({
  selectedType,
  onTypeChange,
  darkMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const types = [
    { value: "", label: "All Types" },
    { value: "fire", label: "Fire", icon: <FaFire className="text-red-500" /> },
    {
      value: "water",
      label: "Water",
      icon: <FaWater className="text-blue-500" />,
    },
    {
      value: "grass",
      label: "Grass",
      icon: <FaLeaf className="text-green-500" />,
    },
    {
      value: "electric",
      label: "Electric",
      icon: <FaBolt className="text-yellow-500" />,
    },
    {
      value: "ghost",
      label: "Ghost",
      icon: <FaGhost className="text-purple-500" />,
    },
    {
      value: "dragon",
      label: "Dragon",
      icon: <FaDragon className="text-indigo-500" />,
    },
    { value: "bug", label: "Bug", icon: <FaBug className="text-green-700" /> },
    {
      value: "fighting",
      label: "Fighting",
      icon: <FaFistRaised className="text-red-700" />,
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
        className={`flex items-center border p-2 rounded shadow-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-300 ${
          darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
        }`}
      >
        {selectedType === "" ? (
          <>
            <BiFilter className="text-gray-500 h-6 w-6" />
            Filter by Type
          </>
        ) : (
          <div className="flex items-center space-x-2">
            {types.find((type) => type.value === selectedType)?.icon}
            <div>
              {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
            </div>
          </div>
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } ring-1 ring-black ring-opacity-5`}
        >
          <div className="py-1">
            {types.map((type) => (
              <div
                key={type.value}
                onClick={() => {
                  onTypeChange(type.value); // Change selected type
                  setIsOpen(false); // Close dropdown after selection
                }}
                className={`flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 transition ${
                  darkMode
                    ? "text-white hover:bg-gray-700"
                    : "text-gray-800 hover:bg-gray-200"
                }`}
              >
                {type.icon} {/* Display icon */}
                <span className="ml-2">{type.label}</span> {/* Display label */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeDropdown;
