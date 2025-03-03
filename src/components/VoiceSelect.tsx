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
  Your browser does not support the Google US English voice. 
  As a result, pronunciations in this application may be inaccurate compared to the dialect of your selected voice.
  `;

  const notUsingGoogleUsEnglishVoiceWarningMessage = `
  You are no longer using the Google US English voice. The pronunciations in this application 
      may now be inaccurate relative to the dialect of the voice you have chosen.
  `;

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoiceOptions(availableVoices);

      if (!selectedVoice && availableVoices.length > 0) {
        const googleUsEnglishVoice = availableVoices.find(
          (voice) =>
            voice.name === "Google US English" ||
            voice.name === "en-US-Standard-C" ||
            (voice.name.includes("Google") && voice.lang === "en-US"),
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
      const isNewVoiceGoogleUsEnglish =
        newVoice.name === "Google US English" ||
        newVoice.name === "en-US-Standard-C" ||
        (newVoice.name.includes("Google") && newVoice.lang === "en-US");

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
