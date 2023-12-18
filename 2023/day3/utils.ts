export async function readMatrix(path: string): Promise<string[][]> {
  const matrix: string[][] = [];
  const inputText = await Deno.readTextFile(path);
  const inputList = inputText.trim().split("\n");

  for (const input of inputList) {
    const cellValue = input.split("");
    matrix.push(cellValue.map((v) => (v === "." ? "" : v)));
  }

  return matrix;
}
