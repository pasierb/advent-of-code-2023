import { readFileSync } from "fs";

function main() {
  const data = readFileSync("./day05/input1.txt", "utf-8");

  const lines = data.split("\n");
  lines.push("");

  const levels = [];
  let entries = [];

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];

    if (line.length === 0) {
      entries.sort((a, b) => a.src - b.src);
      levels.push([...entries]);
      entries = [];
      continue;
    }

    if (line.endsWith(" map:")) {
      continue;
    }

    const [dest, src, range] = [...line.matchAll(/\d+/g)].map((match) =>
      parseInt(match[0])
    );
    entries.push({ dest, src, range });
  }

  let result = Infinity;
  let seeds = [...lines[0].matchAll(/\d+/g)].map((match) => parseInt(match[0]));
  const visited = {};

  for (let i = 0; i < seeds.length; i += 2) {
    for (let j = 0; j < seeds[i + 1]; j++) {
      let seed = seeds[i] + j;
      let value = seed;

      if (visited[seed]) continue;
      visited[seed] = true;

      for (let level of levels) {
        for (let entry of level) {
          if (entry.src <= value && entry.src + entry.range > value) {
            value = entry.dest + (value - entry.src);
            break;
          }
        }
      }

      result = Math.min(result, value);
    }
  }

  return result;
}

main();
