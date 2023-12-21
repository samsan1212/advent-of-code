export async function getCards(filepath: string) {
  const file = await Deno.open(filepath, { read: true });
  const decoder = new TextDecoder("utf-8");

  let text = "";
  for await (const chunk of file.readable) {
    text += decoder.decode(chunk);
  }

  const cardMap = new Map(
    text
      .split("\n")
      // Extract game ID
      .map((line) => {
        const [key, value] = line.split(":");
        const cardIdStr = (key.match(/\d/g)?.join("") ?? "").trim();
        if (cardIdStr === "") {
          throw new Error("Invalid game id");
        }
        const cardId = parseInt(cardIdStr);

        const [winningNumberStr, numberInputStr] = value.split("|");
        const winningNumberList = new Set(
          winningNumberStr
            .trim()
            .split(" ")
            .filter((v) => v !== "")
            .map((v) => parseInt(v))
        );
        const numberInputList = numberInputStr
          .trim()
          .split(" ")
          .filter((v) => v !== "")
          .map((v) => parseInt(v));
        return [cardId, { winningNumberList, numberInputList }];
      })
  );

  return cardMap;
}
