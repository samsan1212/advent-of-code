import { getInput } from "../input.ts";

const inputList = await getInput(
  new URL("../input.txt", import.meta.url).pathname
);

let sum = 0;
for (const input of inputList) {
  const matched: string[] = input.match(/\d/g) ?? [];
  const firstDigit = matched[0] ?? "";
  const lastDigit = matched[matched.length - 1] ?? "0";
  const value = parseInt(firstDigit + lastDigit);
  sum += value;
}

console.log(sum);

export default sum;
