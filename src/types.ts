export type Word = {
  text: string;
  shouldPronounce: boolean;
  phoneticOverride?: string;
  noSpace?: boolean;
  leadingPunctuation?: string;
  trailingPunctuation?: string;
  linkText?: string;
  phonemicRespelling?: string;
  standaloneLetter?: boolean;
};

export type Line = {
  lineNumber: number;
  words: Word[];
};

export type Stanza = {
  stanzaNumber: number;
  lines: Line[];
};

export type Poem = Stanza[];
