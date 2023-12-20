import { readMatrix } from "./utils.ts";

const inputFilepath = new URL("./sample.txt", import.meta.url).pathname;

const matrix = await readMatrix(inputFilepath);

const partNumberList: number[] = [];
const gearCoordinateMap = new Map<string, [number, number][]>();

for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
  const row = matrix[rowIndex];
  for (let colIndex = 0; colIndex < row.length; colIndex++) {
    const cell = row[colIndex];
    if (cell === "*") {
      gearCoordinateMap.set([rowIndex, colIndex].join(","), []);
    }
  }
}

console.log([...gearCoordinateMap.keys()]);

for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
  const row = matrix[rowIndex];

  let count = 0;
  const numberCoordinateMap: [number, number][][] = [];
  for (let colIndex = 0; colIndex < row.length; colIndex++) {
    const cell = row[colIndex];
    if (!/\d/g.test(cell)) {
      if (
        numberCoordinateMap.length > 0 &&
        count + 1 === numberCoordinateMap.length
      ) {
        count += 1;
      }
      // skip when cell is not a number
      continue;
    }

    const coor = numberCoordinateMap[count] ?? [];
    coor.push([rowIndex, colIndex]);
    numberCoordinateMap[count] = coor;
  }

  for (const numberCoordinate of numberCoordinateMap) {
    if (isPartNumber(matrix, numberCoordinate)) {
      const partNumberString = numberCoordinate
        .map(([rowIndex, colIndex]) => matrix[rowIndex][colIndex])
        .join("");
      partNumberList.push(parseInt(partNumberString));
    }
  }
}

let sum = 0;
for (const partNumber of partNumberList) {
  sum += partNumber;
}
console.log(sum);

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
  const topLeft = getCellValue(matrix, rowIndex - 1, colIndex - 1);
  const top = getCellValue(matrix, rowIndex - 1, colIndex);
  const topRight = getCellValue(matrix, rowIndex - 1, colIndex + 1);
  const left = getCellValue(matrix, rowIndex, colIndex - 1);
  const right = getCellValue(matrix, rowIndex, colIndex + 1);
  const bottomLeft = getCellValue(matrix, rowIndex + 1, colIndex - 1);
  const bottom = getCellValue(matrix, rowIndex + 1, colIndex);
  const bottomRight = getCellValue(matrix, rowIndex + 1, colIndex + 1);
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

function getCellValue(matrix: string[][], rowIndex: number, colIndex: number) {
  const matrixSize = matrix.length;
  if (
    rowIndex < 0 ||
    colIndex < 0 ||
    rowIndex >= matrixSize ||
    colIndex >= matrixSize
  )
    return "";
  return matrix[rowIndex][colIndex];
}
