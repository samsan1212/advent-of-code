export async function getInput(filepath: string) {
  const inputFile = await Deno.open(filepath, { read: true });
  const chunkList: string[] = [];

  for await (const chunk of inputFile.readable) {
    chunkList.push(new TextDecoder().decode(chunk));
  }

  const inputList = chunkList.join("").split("\n");

  return inputList;
}
