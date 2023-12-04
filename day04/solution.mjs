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
      return acc + 2 ** (i - 1);
    }, 0);

    return acc + points;
  }, 0);

  return result;
}

function part2() {
  const data = readFileSync("./day04/input2.txt", "utf-8");
  const cards = data.split("\n");

  function calculateCardHits(card) {
    const [_, numbers] = card.split(":");
    const [winning, selected] = numbers.split("|").map((part) => {
      const matches = part.matchAll(/\d+/g);

      return [...matches].map((match) => parseInt(match[0]));
    });

    return selected.filter((x) => new Set([...winning]).has(x)).length;
  }

  function processCard(index, scores = {}) {
    let score = 1; // 1 for the card itself

    // if we already calculated the score for this card, return it
    if (scores[index] === undefined) {
      scores[index] = calculateCardHits(cards[index]);
    }

    // process won cards
    for (let i = 1; i <= scores[index]; i++) {
      score += processCard(index + i, scores);
    }

    return score;
  }

  // process original cards
  return cards.reduce((acc, _, i) => acc + processCard(i), 0);
}

async function main() {
  //   console.log(part1());
  console.log(part2());
}

main();
