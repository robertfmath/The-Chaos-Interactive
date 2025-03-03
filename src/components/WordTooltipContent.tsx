import { Box, Link, Button, Typography } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Word as WordType } from "../types";

type WordTooltipContentProps = {
  word: WordType;
};

const WordTooltipContent = ({ word }: WordTooltipContentProps) => {
  return (
    <Box data-testid="word-tooltip-content">
      {word.phonemicRespelling && (
        <Typography sx={{ textAlign: "center", color: "text.primary" }}>
          {word.phonemicRespelling}
        </Typography>
      )}
      <Link
        href={`https://www.merriam-webster.com/dictionary/${encodeURIComponent(word.linkTextOverride ?? word.text)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button endIcon={<MenuBookIcon />} size="medium">
          View In Dictionary
        </Button>
      </Link>
    </Box>
  );
};

export default WordTooltipContent;
