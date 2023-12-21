import { readMatrix } from "./utils.ts";

const inputFilepath = new URL("./input.txt", import.meta.url).pathname;

const matrix = await readMatrix(inputFilepath);

const gearCoordinateMap = new Map<string, number[]>();

for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
  const row = matrix[rowIndex];
  for (let colIndex = 0; colIndex < row.length; colIndex++) {
    const cell = row[colIndex];
    if (cell === "*") {
      gearCoordinateMap.set([rowIndex, colIndex].join(","), []);
    }
  }
}

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
      checkIfNumberNearToGear(numberCoordinate);
    }
  }
}

let sumOfGearRatio = 0;
gearCoordinateMap.forEach((partNumberList) => {
  if (partNumberList.length !== 2) return;
  const [partNumber1, partNumber2] = partNumberList;
  sumOfGearRatio += partNumber1 * partNumber2;
});
console.log(sumOfGearRatio);

function checkIfNumberNearToGear(numberCoordinate: [number, number][]) {
  const gearCoordinateKeySet = new Set(gearCoordinateMap.keys());
  const matchedGearKeyList = new Set<string>();
  for (const [rowIndex, colIndex] of numberCoordinate) {
    const surroundingCoordinateStrList = [
      [rowIndex - 1, colIndex - 1],
      [rowIndex - 1, colIndex],
      [rowIndex - 1, colIndex + 1],
      [rowIndex, colIndex - 1],
      [rowIndex, colIndex + 1],
      [rowIndex + 1, colIndex - 1],
      [rowIndex + 1, colIndex],
      [rowIndex + 1, colIndex + 1],
    ].map((coor) => coor.join(","));

    const gearCoordinateKeyList = surroundingCoordinateStrList.filter((coor) =>
      gearCoordinateKeySet.has(coor)
    );
    if (gearCoordinateKeyList.length === 0) continue;

    gearCoordinateKeyList.forEach((gearCoordinateKey) => {
      matchedGearKeyList.add(gearCoordinateKey);
    });
  }
  const partNumberString = numberCoordinate
    .map(([rowIndex, colIndex]) => matrix[rowIndex][colIndex])
    .join("");
  const partNumber = parseInt(partNumberString);

  for (const gearCoordinateKey of matchedGearKeyList) {
    const gearCoordinateList = gearCoordinateMap.get(gearCoordinateKey) ?? [];
    gearCoordinateList.push(partNumber);
    gearCoordinateMap.set(gearCoordinateKey, gearCoordinateList);
  }
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
