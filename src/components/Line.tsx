import Word from "./Word";
import type { Word as WordType } from "../types";
import { Box } from "@mui/material";

type LineProps = {
  words: WordType[];
};

const Line = ({ words }: LineProps) => {
  return (
    <Box data-testid="line">
      {words.map((word, index) => (
        <Box sx={{ display: "inline" }} key={index}>
          <Word word={word} key={index} />
          {index < words.length - 1 && !word.noSpace && " "}
        </Box>
      ))}
    </Box>
  );
};

export default Line;
