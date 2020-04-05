import { TUNE_URL } from "../constants/actionTypes";
import he from "he";

export const tuneTypes = {
  jig: {
    key: "3/4",
    tempo: "140"
  },
  reel: {
    key: "4/4",
    tempo: "180"
  },
  "slip jig": {
    key: "9/8",
    tempo: "260"
  },
  hornpipe: {
    key: "4/4",
    tempo: "180"
  },
  polka: {
    key: "2/4",
    tempo: "100"
  },
  slide: {
    key: "12/8",
    tempo: "250"
  },
  waltz: {
    key: "3/4",
    tempo: "160"
  },
  barndance: {
    key: "4/4",
    tempo: "140"
  },
  strathspey: {
    key: "4/4",
    tempo: "140"
  },
  "three-two": {
    key: "3/2",
    tempo: "140"
  },
  mazurka: {
    key: "3/4",
    tempo: "140"
  }
};

export const abcReformatter = (tune, type, name) => {
  if (tune.abc === undefined) {
    return "";
  }

  const tuneType = !!type ? type : tune.type;

  const abc = tune.abc.split("! ").join("\n");
  const start = `X: 1`;
  const tuneName = `T: ${name}`;
  const timeSignature = `M: ${tuneTypes[tuneType].key}`;
  const tuneKey = `K: ${tune.key}`;
  const noteLength = `L: 1/8`;
  const tempo = `Q: ${tuneTypes[tuneType].tempo}`;

  return he.decode(
    [start, tuneName, timeSignature, tempo, noteLength, tuneKey, abc].join("\n")
  );
};

export const printUrl = tuneId => {
  return `${TUNE_URL}${tuneId}/${tuneId}?print=true`;
};
