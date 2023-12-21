import { getMaterialMap, getInput } from "./utils.ts";

const inputFilepath = new URL("./input.txt", import.meta.url).pathname;

const seedSet = await getSeedList(inputFilepath);
const seedToSoilMap = await getMaterialMap(inputFilepath, "seed-to-soil");
const soilToFertilizerMap = await getMaterialMap(
  inputFilepath,
  "soil-to-fertilizer"
);
const fertilizerToWaterMap = await getMaterialMap(
  inputFilepath,
  "fertilizer-to-water"
);
const waterToLightMap = await getMaterialMap(inputFilepath, "water-to-light");
const lightToTemperatureMap = await getMaterialMap(
  inputFilepath,
  "light-to-temperature"
);
const temperatureToHumidityMap = await getMaterialMap(
  inputFilepath,
  "temperature-to-humidity"
);
const humidityToLocationMap = await getMaterialMap(
  inputFilepath,
  "humidity-to-location"
);

let lowerLocation = NaN;
seedSet.forEach((seed) => {
  const soil = seedToSoilMap.get(seed);
  const fertilizer = soilToFertilizerMap.get(soil);
  const water = fertilizerToWaterMap.get(fertilizer);
  const light = waterToLightMap.get(water);
  const temperature = lightToTemperatureMap.get(light);
  const humidity = temperatureToHumidityMap.get(temperature);
  const location = humidityToLocationMap.get(humidity);

  lowerLocation = isNaN(lowerLocation)
    ? location
    : Math.min(lowerLocation, location);
});
console.log(lowerLocation);

async function getSeedList(filepath: string) {
  const input = await getInput(filepath);

  const seedInput = input[0].trim().replace(/\n/g, "");
  const seedList = seedInput
    .replace("seeds: ", "")
    .trim()
    .split(" ")
    .map((v) => parseInt(v));

  return new Set(seedList);
}
