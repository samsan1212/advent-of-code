import { getCards } from "./utils.ts";

const inputFilepath = new URL("./input.txt", import.meta.url).pathname;

const cardMap = await getCards(inputFilepath);

let totalPoints = 0;

cardMap.forEach((card) => {
  const matchedNumber: number[] = [];
  const { winningNumberList, numberInputList } = card;
  for (const input of numberInputList) {
    if (winningNumberList.has(input)) {
      matchedNumber.push(input);
    }
  }

  const points =
    matchedNumber.length === 0
      ? 0
      : matchedNumber.length === 1
      ? 1
      : 2 ** (matchedNumber.length - 1);

  totalPoints += points;
});

console.log(totalPoints);
