import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useVoiceStore } from "../hooks/useVoiceStore";

const VoiceSelect = () => {
  const { selectedVoice, setSelectedVoice } = useVoiceStore();
  const [isUsingGoogleUsEnglishVoice, setIsUsingGoogleUsEnglishVoice] =
    useState<boolean | null>(null);
  const [voiceOptions, setVoiceOptions] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceWarning, setVoiceWarning] = useState<string | null>(null);

  const noGoogleUsEnglishVoiceWarningMessage = `
  This application was validated with the Google US English voice, which your browser 
  does not support. Pronunciations may or may not be accurate in the dialect of the voice 
  that is selected.
  `;

  const notUsingGoogleUsEnglishVoiceWarningMessage = `
  You are no longer using the Google US English voice. Pronunciations may or may not 
  be accurate in the dialect of the voice you have selected.
  `;

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      
      const uniqueVoices = availableVoices.filter((voice, index, self) => 
        index === self.findIndex((v) => v.name === voice.name)
      );

      setVoiceOptions(uniqueVoices);

      if (!selectedVoice && availableVoices.length > 0) {
        const googleUsEnglishVoice = availableVoices.find(
          (voice) => voice.name === "Google US English",
        );

        if (!googleUsEnglishVoice) {
          setVoiceWarning(noGoogleUsEnglishVoiceWarningMessage);
        }

        setIsUsingGoogleUsEnglishVoice(googleUsEnglishVoice !== undefined);

        setSelectedVoice(googleUsEnglishVoice ?? availableVoices[0]);
      }
    };

    loadVoices();

    if ("onvoiceschanged" in synth) {
      synth.onvoiceschanged = loadVoices;
    }
  }, [
    selectedVoice,
    setSelectedVoice,
    setVoiceWarning,
    noGoogleUsEnglishVoiceWarningMessage,
  ]);

  const handleVoiceChange = (event: SelectChangeEvent) => {
    const newVoice = voiceOptions.find(
      (voice) => voice.name === event.target.value,
    );
    if (newVoice) {
      setSelectedVoice(newVoice);
      const isNewVoiceGoogleUsEnglish = newVoice.name === "Google US English";

      if (!isNewVoiceGoogleUsEnglish) {
        setVoiceWarning(notUsingGoogleUsEnglishVoiceWarningMessage);
      }

      setIsUsingGoogleUsEnglishVoice(isNewVoiceGoogleUsEnglish);
    }
  };

  return (
    <Box data-testid="voice-select-container">
      <FormControl fullWidth>
        <InputLabel id="voice-select-label">Voice</InputLabel>
        <Select
          labelId="voice-select-label"
          label="Voice"
          value={selectedVoice ? selectedVoice.name : ""}
          onChange={handleVoiceChange}
          MenuProps={{
            disableScrollLock: true,
          }}
        >
          {voiceOptions.length > 0 ? (
            voiceOptions.map((voiceOption) => (
              <MenuItem value={voiceOption.name} key={voiceOption.name}>
                {voiceOption.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No voices available</MenuItem>
          )}
        </Select>
      </FormControl>

      {!isUsingGoogleUsEnglishVoice && (
        <Alert
          severity="warning"
          sx={{ borderRadius: "10px", marginTop: "10px" }}
          data-testid="voice-warning"
        >
          {voiceWarning}
        </Alert>
      )}
    </Box>
  );
};

export default VoiceSelect;
