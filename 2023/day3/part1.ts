import { readMatrix } from "./utils.ts";

const inputFilepath = new URL("./sample.txt", import.meta.url).pathname;

const matrix = await readMatrix(inputFilepath);

const partNumberList: number[] = [];

for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
  const row = matrix[rowIndex];

  let count = 0;
  const numberCoordinateMap = new Map<number, [number, number][]>();
  for (let colIndex = 0; colIndex < row.length; colIndex++) {
    const cell = row[colIndex];
    if (!/\d/g.test(cell)) {
      if (
        numberCoordinateMap.size > 0 &&
        count + 1 === numberCoordinateMap.size
      ) {
        count++;
      }
      // skip when cell is not a number
      continue;
    }

    const coor = numberCoordinateMap.get(count) ?? [];
    coor.push([rowIndex, colIndex]);
    numberCoordinateMap.set(count, coor);
  }

  console.log(numberCoordinateMap);
}

function isPartNumber(
  matrix: string[][],
  numberCoordinate: [number, number][]
) {
  const symbolRegex = /(\!|\@|\#|\$|\%|\^|\&|\*|\-|\+|\=|\\|\/)/g;

  for (const [rowIndex, colIndex] of numberCoordinate) {
    const {
      topLeft,
      top,
      topRight,
      left,
      right,
      bottomLeft,
      bottom,
      bottomRight,
    } = getSurroundingValueOfCell(matrix, rowIndex, colIndex);

    if (
      symbolRegex.test(topLeft) ||
      symbolRegex.test(top) ||
      symbolRegex.test(topRight) ||
      symbolRegex.test(left) ||
      symbolRegex.test(right) ||
      symbolRegex.test(bottomLeft) ||
      symbolRegex.test(bottom) ||
      symbolRegex.test(bottomRight)
    ) {
      return true;
    }
  }

  return false;
}

function getSurroundingValueOfCell(
  matrix: string[][],
  rowIndex: number,
  colIndex: number
) {
  const topLeft = matrix[rowIndex - 1][colIndex - 1];
  const top = matrix[rowIndex - 1][colIndex];
  const topRight = matrix[rowIndex - 1][colIndex + 1];
  const left = matrix[rowIndex][colIndex - 1];
  const right = matrix[rowIndex][colIndex + 1];
  const bottomLeft = matrix[rowIndex + 1][colIndex - 1];
  const bottom = matrix[rowIndex + 1][colIndex];
  const bottomRight = matrix[rowIndex + 1][colIndex + 1];
  return {
    topLeft,
    top,
    topRight,
    left,
    right,
    bottomLeft,
    bottom,
    bottomRight,
  };
}
