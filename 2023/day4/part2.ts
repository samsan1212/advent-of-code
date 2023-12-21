import { getCards } from "./utils.ts";

const inputFilepath = new URL("./input.txt", import.meta.url).pathname;

const cardMap = await getCards(inputFilepath);

const cardResultMap = new Map<number, { matchedCount: number }>();

cardMap.forEach((card, cardId) => {
  const matchedNumber: number[] = [];
  const { winningNumberList, numberInputList } = card;
  for (const input of numberInputList) {
    if (winningNumberList.has(input)) {
      matchedNumber.push(input);
    }
  }

  cardResultMap.set(cardId, { matchedCount: matchedNumber.length });
});

const cardInstanceMap = new Map(
  Array(cardMap.size)
    .fill(1)
    .map((i, index) => [index + 1, i])
);

cardMap.forEach((_card, cardId) => {
  countAllInstanceNested(cardId);
});

let totalNumberOfCards = 0;
cardInstanceMap.forEach((instanceCount) => {
  totalNumberOfCards += instanceCount;
});

console.log(totalNumberOfCards);

function countAllInstanceNested(id: number) {
  const { matchedCount = 0 } = cardResultMap.get(id) ?? {};

  if (matchedCount === 0) {
    return;
  }

  for (let i = 0; i < matchedCount; i++) {
    const nextId = id + i + 1;
    const nextCardInstance = cardInstanceMap.get(nextId) ?? 0;
    cardInstanceMap.set(nextId, nextCardInstance + 1);
    countAllInstanceNested(nextId);
  }
}
