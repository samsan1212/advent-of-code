const inputFilePath = new URL("input.txt", import.meta.url).pathname;
const inputFileText = await Deno.readTextFile(inputFilePath);
const inputList = inputFileText.trim().split("\n");

let sum = 0;
for (const input of inputList) {
  const [_gameStr, resultStr] = input.split(":");

  const maxCube: Record<string, number> = {
    red: 0,
    green: 0,
    blue: 0,
  };
  resultStr
    .split(";")
    .map((v) => v.trim())
    .map((v) => v.split(","))
    .map((v) =>
      v.reduce((obj, x) => {
        const [quantityStr, color] = x.trim().split(" ");
        const quantity = parseInt(quantityStr);
        return { ...obj, [color]: quantity };
      }, {} as Record<string, number>)
    )
    .forEach((set) => {
      Object.keys(set).forEach((color) => {
        const quantity = set[color];
        if (quantity > maxCube[color]) {
          maxCube[color] = quantity;
        }
      });
    });

  let result = 1;
  Object.keys(maxCube).forEach((color) => {
    result *= maxCube[color];
  });

  sum += result;
}

console.log(sum);
