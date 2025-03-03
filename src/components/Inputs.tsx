import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  useColorScheme,
} from "@mui/material";
import VoiceSelect from "./VoiceSelect";

const Inputs = () => {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }
  return (
    <Paper
      sx={{ padding: "1em", borderRadius: "10px" }}
      data-testid="inputs-container"
    >
      <Stack spacing={2}>
        <FormControl fullWidth>
          <Box>
            <FormLabel
              id="theme-toggle"
              sx={{
                "&.Mui-focused": {
                  color: "text.primary",
                },
              }}
            >
              Theme
            </FormLabel>
            <RadioGroup
              aria-labelledby="theme-toggle"
              row
              value={mode}
              onChange={(event) =>
                setMode(event.target.value as "system" | "light" | "dark")
              }
            >
              <FormControlLabel
                value="system"
                control={<Radio />}
                label="System"
              />
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            </RadioGroup>
          </Box>
        </FormControl>
        <VoiceSelect />
      </Stack>
    </Paper>
  );
};

export default Inputs;
