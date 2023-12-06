import { readFileSync } from "fs";

function calculateDistance(time, speed) {
  const remainingTime = time - speed;
  return remainingTime * speed;
}

function canBeatDistace(options) {
  const { time, speed, distance } = options;

  return calculateDistance(time, speed) > distance;
}

function part1() {
  const data = readFileSync("./day06/input1.txt", "utf-8").split("\n");

//   const times = [...data[0].matchAll(/\d+/g)].map((match) =>
//     parseInt(match[0])
//   );
//   const distances = [...data[1].matchAll(/\d+/g)].map((match) =>
//     parseInt(match[0])
//   );
  const times = [...data[0].replace(/\s/g, "").matchAll(/\d+/g)].map((match) =>
    parseInt(match[0])
  );
  const distances = [...data[1].replace(/\s/g, "") .matchAll(/\d+/g)].map((match) =>
    parseInt(match[0])
  );

  console.log(times, distances);

  return times.reduce((acc, time, i) => {
    const distance = distances[i];

    let numWays = 0;
    for (let speed = 1; speed < time; speed++) {
      if (canBeatDistace({ time, speed, distance })) {
        numWays++;
      }
    }

    return acc * numWays;
  }, 1);
}

function main() {
  console.log(part1());
}

main();
