const inputFilePath = new URL("input.txt", import.meta.url).pathname;
const inputFileText = await Deno.readTextFile(inputFilePath);
const inputList = inputFileText.trim().split("\n");

const maxCube: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

let sum = 0;
for (const input of inputList) {
  const [gameStr, resultStr] = input.split(":");
  const game = parseInt(gameStr.replace("Game ", ""));

  const sets = resultStr
    .split(";")
    .map((v) => v.trim())
    .map((v) => v.split(","))
    .map((v) =>
      v.reduce((obj, x) => {
        const [quantityStr, color] = x.trim().split(" ");
        const quantity = parseInt(quantityStr);
        return { ...obj, [color]: quantity };
      }, {} as Record<string, number>)
    );

  let reachMaximum = false;
  for (const set of sets) {
    reachMaximum = Object.keys(set).some((color) => {
      const quantity = set[color];
      return quantity > maxCube[color];
    });
    if (reachMaximum) {
      break;
    }
  }

  if (!reachMaximum) {
    sum += game;
  }
}

console.log(sum);
