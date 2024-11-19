// random element function- might need to be located in /utils/helpers.ts?
export const getRandomElement = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

export const PRESET_COLORS = [
  "scarlet",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "cyan",
  "magenta",
  "forestgreen",
  "teal",
  "indigo",
  "gray",
  "black",
  "lightgray",
  "navy",
  "olive",
  "maroon",
  "silver",
  "gold",
  "aqua",
];

export const PRESET_SHAPES = [
  "circle",
  "square",
  "triangle",
  "pentagon",
  "hexagon",
  "octagon",
  "star",
  "heart",
  "diamond",
  "crescent",
  "arrow",
  "cross",
];
