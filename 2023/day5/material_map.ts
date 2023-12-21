export default class MaterialMap {
  #rangeList: {
    destRangeStart: number;
    sourceRangeStart: number;
    rangeLength: number;
  }[];

  constructor(
    rangeList: {
      destRangeStart: number;
      sourceRangeStart: number;
      rangeLength: number;
    }[]
  ) {
    this.#rangeList = rangeList;
  }

  get(sourceId = 0) {
    for (const range of this.#rangeList) {
      const { rangeLength, sourceRangeStart, destRangeStart } = range;
      if (
        sourceRangeStart <= sourceId &&
        sourceId < sourceRangeStart + rangeLength
      ) {
        return sourceId - sourceRangeStart + destRangeStart;
      }
    }

    // i.e. no match
    return sourceId;
  }

  valueOf() {
    return JSON.stringify(this.#rangeList, null, 2);
  }
}
