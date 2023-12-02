import { readFileSync } from "fs";

const maxCubesPerColor = {
  red: 12,
  green: 13,
  blue: 14,
};
const maxCubes = 14;

// Part 1
function isValidGame(input) {
  const [gameIdPart, cubesPart] = input.substring(5).split(":");
  const gameId = parseInt(gameIdPart);

  for (let match of cubesPart.matchAll(/\d{2}/g)) {
    const cubeCount = parseInt(match[0]);

    if (cubeCount > maxCubes) return 0;

    const cubeColor = cubesPart.substring(match.index + 2).match(/[a-z]+/)[0];

    if (cubeCount > maxCubesPerColor[cubeColor]) return 0;
  }

  return gameId;
}

// Part 2
function computeMaxCubesPerColor(input) {
  const cubesPart = input.substring(input.indexOf(":") + 1);

  const cubeCounts = {
    red: 0,
    green: 0,
    blue: 0,
  };

  Object.keys(cubeCounts).forEach((color) => {
    const regexp = new RegExp(`\\d+ ${color}`, "g");
    const matches = [...cubesPart.matchAll(regexp)];

    cubeCounts[color] = Math.max(
      ...matches.map((match) => parseInt(match[0].split(" ")[0]))
    );
  });

  return cubeCounts;
}

function main() {
  const data = readFileSync("./day02/input1.txt", "utf-8");
  //   const data = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  // Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  // Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  // Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  // Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
//   const data = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

  const result = data.split("\n").reduce((acc, line) => {
    // Part 1
    return acc + isValidGame(line);
    
    // Part 2
    const cubeCounts = computeMaxCubesPerColor(line);
    return acc + Object.values(cubeCounts).reduce((acc, count) => acc * count, 1);
  }, 0);

  console.log({ result });
}

main();
