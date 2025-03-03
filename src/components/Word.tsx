import { Word as WordType } from "../types";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import WordTooltipContent from "./WordTooltipContent";
import { useVoiceStore } from "../hooks/useVoiceStore";

type WordProps = {
  word: WordType;
};

const Word = ({ word }: WordProps) => {
  const theme = useTheme();
  const { selectedVoice } = useVoiceStore();
  const synth = window.speechSynthesis;

  const onWordClick = (event: React.MouseEvent) => {
    event.preventDefault();

    if (word.shouldPronounce) {
      const wordToUtter = new SpeechSynthesisUtterance(
        word.phoneticOverride ?? word.text,
      );
      wordToUtter.voice = selectedVoice;
      synth.speak(wordToUtter);
    }
  };

  return (
    <Box sx={{ display: "inline" }} data-testid="word">
      {word.leadingPunctuation && (
        <Typography sx={{ display: "inline" }}>
          {word.leadingPunctuation}
        </Typography>
      )}
      {word.shouldPronounce ? (
        <Tooltip
          title={<WordTooltipContent word={word} />}
          arrow
          placement="top"
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor:
                  theme.palette.mode === "light" ? "grey.300" : "grey.800",
              },
            },
            popper: {
              sx: {
                "& .MuiTooltip-arrow": {
                  color:
                    theme.palette.mode === "light" ? "grey.300" : "grey.800",
                },
              },
            },
          }}
        >
          <Typography
            component="span"
            sx={{
              display: "inline-block",
              color: "primary.main",
              fontWeight: "bold",
              cursor: "pointer",
              fontStyle: word.standaloneLetter ? "italic" : undefined,
              "&:hover": {
                color: "primary.dark",
                textDecoration: "underline",
              },
              borderBottom: word.phonemicRespelling
                ? "2px dotted #ff4444"
                : undefined,
            }}
            onClick={onWordClick}
          >
            {word.text}
          </Typography>
        </Tooltip>
      ) : (
        <Typography
          component="span"
          sx={{
            display: "inline",
            fontStyle: word.standaloneLetter ? "italic" : undefined,
          }}
          onClick={onWordClick}
        >
          {word.text}
        </Typography>
      )}
      {word.trailingPunctuation && (
        <Typography sx={{ display: "inline" }}>
          {word.trailingPunctuation}
        </Typography>
      )}
    </Box>
  );
};

export default Word;
