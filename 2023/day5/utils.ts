import MaterialMap from "./material_map.ts";

const inputList: string[] = [];

export async function getMaterialMap(filepath: string, key: string) {
  const input = await getInput(filepath);

  const materialInput = input.find((line) => line.startsWith(key));

  if (!materialInput) {
    throw new Error(`Cannot find material input for ${key}`);
  }

  const [_, rawDataStr = ""] = materialInput.split(":");
  const rawData: [string, string, number][] = rawDataStr
    .trim()
    .split("\n")
    .map((line) => {
      const [dest, source, rangeLegth] = line.trim().split(" ");
      return [dest.trim(), source.trim(), parseInt(rangeLegth.trim())];
    });

  const rangeList = rawData.map(([dest, source, rangeLength]) => ({
    destRangeStart: parseInt(dest),
    sourceRangeStart: parseInt(source),
    rangeLength,
  }));

  return new MaterialMap(rangeList);
}

export async function getInput(filepath: string) {
  if (inputList.length === 0) {
    const file = await Deno.open(filepath, { read: true });
    const decoder = new TextDecoder("utf-8");

    let text = "";
    for await (const chunk of file.readable) {
      text += decoder.decode(chunk);
    }

    inputList.push(...text.split("\n\n"));
  }

  return inputList;
}
