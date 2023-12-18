import { getInput } from "../input.ts";

const inputList = await getInput(
  new URL("../input.txt", import.meta.url).pathname
);

let sum = 0;
for (const input of inputList) {
  const matched = findAllNumber(input).map(replaceStrToNumber);
  const firstDigit = matched[0] ?? "";
  const lastDigit = matched[matched.length - 1] ?? "0";
  const value = parseInt(firstDigit + lastDigit);
  sum += value;
}

console.log(sum);

function replaceStrToNumber(txt: string) {
  return txt
    .replace(/one/, "1")
    .replace(/two/, "2")
    .replace(/three/, "3")
    .replace(/four/, "4")
    .replace(/five/, "5")
    .replace(/six/, "6")
    .replace(/seven/, "7")
    .replace(/eight/, "8")
    .replace(/nine/, "9");
}

function findAllNumber(text: string) {
  const numberRegex = /\d/g;
  const numberTextRegex = /(one|two|three|four|five|six|seven|eight|nine)/g;
  const answer: string[] = [];

  let chunk: string[] = [];
  for (const char of text) {
    if (char.match(numberRegex)) {
      answer.push(char);
      chunk = [];
      continue;
    }
    chunk.push(char);
    const line = chunk.join("");
    const matched = line.match(numberTextRegex);
    if (matched) {
      answer.push(matched[0]);
      chunk = [chunk[chunk.length - 1]];
    }
  }

  return answer;
}
