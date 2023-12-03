import { readFileSync } from "fs";

function expandNumber(x, line) {
  let firstX = x;
  while (firstX >= 0 && line[firstX].match(/\d/)) {
    firstX--;
  }

  return parseInt(line.substring(firstX).match(/\d+/)[0]);
}

function part1() {
  const lines = readFileSync("./day03/input1.txt", "utf-8").split("\n");

  function findCellsToExpand(x, y) {
    const result = [];

    const collectResult = (y) => {
      const linePart = lines[y].substring(x - 1, x + 2);

      return [...linePart.matchAll(/\d+/g)].map((match) => ({
        x: x + match.index - 1,
        y,
      }));
    };

    if (y > 0) result.push(...collectResult(y - 1));
    result.push(...collectResult(y));
    if (y + 1 < lines.length) result.push(...collectResult(y + 1));

    return result;
  }

  const cellsToExpand = [];
  lines.forEach((line, y) => {
    for (let match of line.matchAll(/[^0-9.]/g)) {
      cellsToExpand.push(...findCellsToExpand(match.index, y));
    }
  });

  return cellsToExpand.reduce(
    (acc, coords) => acc + expandNumber(coords.x, lines[coords.y]),
    0
  );
}

function part2() {
  const lines = readFileSync("./day03/input2.txt", "utf-8").split("\n");

  function findCellsToExpand(x, y) {
    const result = [];

    const collectResult = (y) => {
      const linePart = lines[y].substring(x - 1, x + 2);

      return [...linePart.matchAll(/\d+/g)].map((match) => ({
        x: x + match.index - 1,
        y,
      }));
    };

    if (y > 0) result.push(...collectResult(y - 1));
    result.push(...collectResult(y));
    if (y + 1 < lines.length) result.push(...collectResult(y + 1));

    return result;
  }

  let result = 0;
  lines.forEach((line, y) => {
    for (let match of line.matchAll(/\*/g)) {
      const cellsToExpand = findCellsToExpand(match.index, y);

      if (cellsToExpand.length === 2) {
        result += cellsToExpand
          .map((coords) => expandNumber(coords.x, lines[coords.y]))
          .reduce((acc, value) => acc * value, 1);
      }
    }
  });

  return result;
}

function main() {
  // console.log(part1());
  console.log(part2());
}

main();
