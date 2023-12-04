import { readFileSync } from "fs";

function part1() {
  const data = readFileSync("./day04/input1.txt", "utf-8");
  const lines = data.split("\n");

  const result = lines.reduce((acc, line) => {
    const [_, numbers] = line.split(":");
    const [winning, selected] = numbers.split("|").map((part) => {
      const matches = part.matchAll(/\d+/g);

      return [...matches].map((match) => parseInt(match[0]));
    });

    const intersection = selected.filter((x) => new Set([...winning]).has(x));
    const points = intersection.reduce((acc, _, i) => {
      if (i < 2) return acc + 1;
      return acc + (2**(i - 1));
    }, 0);

    return acc + points;
  }, 0);

  return result;
}

async function main() {
  console.log(part1());
}

main();
