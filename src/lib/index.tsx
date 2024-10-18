import { BsThreeDots } from "react-icons/bs";
import {
  FaFire,
  FaWater,
  FaLeaf,
  FaBolt,
  FaGhost,
  FaDragon,
  FaBug,
  FaFistRaised,
  FaSkullCrossbones,
  FaSun,
  FaMoon,
  FaFilter,
  FaSnowflake,
  FaShieldAlt,
  FaGlobe,
  FaMagic,
  FaFeather,
  FaMountain,
  FaCircle,
  FaBrain,
} from "react-icons/fa";

// Define a common class for icons
const iconClass = "mr-1";

// Define the type icons with a common class
export const TYPE_ICONS: { [key: string]: JSX.Element } = {
  fire: <FaFire className={iconClass} />,
  water: <FaWater className={iconClass} />,
  grass: <FaLeaf className={iconClass} />,
  electric: <FaBolt className={iconClass} />,
  ghost: <FaGhost className={iconClass} />,
  dragon: <FaDragon className={iconClass} />,
  bug: <FaBug className={iconClass} />,
  fighting: <FaFistRaised className={iconClass} />,
  poison: <FaSkullCrossbones className={iconClass} />,
  psychic: <FaBrain className={iconClass} />,
  normal: <FaCircle className={iconClass} />,
  rock: <FaMountain className={iconClass} />,
  flying: <FaFeather className={iconClass} />,
  fairy: <FaMagic className={iconClass} />,
  ground: <FaGlobe className={iconClass} />,
  steel: <FaShieldAlt className={iconClass} />,
  ice: <FaSnowflake className={iconClass} />,
};

// Define the Pokémon types with icons
export const TYPES_POKEMON = [
  { value: "", label: "All Types" },
  { value: "fire", label: "Fire", icon: TYPE_ICONS.fire },
  { value: "water", label: "Water", icon: TYPE_ICONS.water },
  { value: "grass", label: "Grass", icon: TYPE_ICONS.grass },
  { value: "electric", label: "Electric", icon: TYPE_ICONS.electric },
  { value: "ghost", label: "Ghost", icon: TYPE_ICONS.ghost },
  { value: "dragon", label: "Dragon", icon: TYPE_ICONS.dragon },
  { value: "bug", label: "Bug", icon: TYPE_ICONS.bug },
  { value: "fighting", label: "Fighting", icon: TYPE_ICONS.fighting },
  { value: "poison", label: "Poison", icon: TYPE_ICONS.poison },
  { value: "psychic", label: "Psychic", icon: TYPE_ICONS.psychic },
  { value: "normal", label: "Normal", icon: TYPE_ICONS.normal },
  { value: "rock", label: "Rock", icon: TYPE_ICONS.rock },
  { value: "flying", label: "Flying", icon: TYPE_ICONS.flying },
  { value: "fairy", label: "Fairy", icon: TYPE_ICONS.fairy },
  { value: "ground", label: "Ground", icon: TYPE_ICONS.ground },
  { value: "steel", label: "Steel", icon: TYPE_ICONS.steel },
  { value: "ice", label: "Ice", icon: TYPE_ICONS.ice },
];

// Define the sort options
export const SORT_OPTIONS = [
  { value: "name", label: "Sort by Name" },
  { value: "hp", label: "Sort by HP" },
  { value: "attack", label: "Sort by Attack" },
  { value: "defense", label: "Sort by Defense" },
  { value: "special-attack", label: "Sort by Special Attack" },
  { value: "special-defense", label: "Sort by Special Defense" },
  { value: "speed", label: "Sort by Speed" },
];

// Define the theme icons
export const SUN_ICON = <FaSun className="w-6 h-6 text-yellow-400" />;
export const MOON_ICON = <FaMoon className="w-6 h-6 text-gray-800" />;

// Define other icons
export const FILTER_ICON = <FaFilter className="text-gray-500 h-4 w-4" />;
export const THREE_DOTS_ICON = <BsThreeDots className="text-gray-500" />;
