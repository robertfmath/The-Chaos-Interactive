import Word from "./Word";
import type { Word as WordType } from "../types";
import { Box } from "@mui/material";

type LineProps = {
  words: WordType[];
};

const Line = ({ words }: LineProps) => {
  return (
    <>
      {words.map((word, index) => (
        <Box sx={{ display: "inline" }} key={index} data-testid="line">
          <Word word={word} key={index} />
          {index < words.length - 1 && !word.noSpace && " "}
        </Box>
      ))}
    </>
  );
};

export default Line;
