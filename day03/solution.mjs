import { readFileSync } from "fs";

function part1() {
  //   const data = `467..114..
  // ...*......
  // ..35..633.
  // ......#...
  // 617*......
  // .....+.58.
  // ..592.....
  // ......755.
  // ...$.*....
  // .664.598..`;
  const data = readFileSync("./day03/input1.txt", "utf-8");
  const lines = data.split("\n");

  function expandNumber(x, line) {
    let firstX = x;
    while (firstX >= 0 && line[firstX].match(/\d/)) {
      firstX--;
    }

    return parseInt(line.substring(firstX).match(/\d+/)[0]);
  }

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
    const symbolMatches = line.matchAll(/[^0-9.]/g);
    for (let match of symbolMatches) {
      cellsToExpand.push(...findCellsToExpand(match.index, y));
    }
  });

  const result = cellsToExpand.reduce((acc, coords) => {
    return acc + expandNumber(coords.x, lines[coords.y]);
  }, 0);
  console.log({ result });
}

function main() {
  part1();
}

main();
