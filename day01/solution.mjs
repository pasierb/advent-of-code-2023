import { readFileSync } from "fs";

const wordToNumberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const regexp = new RegExp(`${Object.keys(wordToNumberMap).join("|")}|\\d`, "g");
console.log(regexp);

function main() {
  const data = readFileSync("./day01/input2.txt", "utf-8");
  //   const data = `1abc2
  // pqr3stu8vwx
  // a1b2c3d4e5f
  // treb7uchet`;
//   const data = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`;

  const result = data.split("\n").reduce((acc, line) => {
    const items = [...line.matchAll(regexp)].map((match) => { 
      return (wordToNumberMap[match[0]] || match[0]).toString();
    });
    return parseInt(items.at(0) + items.at(-1)) + acc;
  }, 0);

  console.log(result);
}

main();
