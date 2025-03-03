import { Box } from "@mui/material";
import Line from "./Line";
import { Line as LineType } from "../types";

type StanzaProps = {
  lines: LineType[];
};

const Stanza = ({ lines }: StanzaProps) => {
  return (
    <Box sx={{ mb: "2rem" }} data-testid="stanza">
      {lines.map((line, index) => (
        <Box
          key={index}
          sx={{
            py: "0.5rem",
            ml: index === 2 || index === 3 ? "2em" : undefined,
          }}
        >
          <Line words={line.words} />
        </Box>
      ))}
    </Box>
  );
};

export default Stanza;
