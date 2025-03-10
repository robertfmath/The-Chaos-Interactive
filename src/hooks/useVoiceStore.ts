import { create } from "zustand";

type VoiceStore = {
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;
};

export const useVoiceStore = create<VoiceStore>((set) => ({
  selectedVoice: null,
  setSelectedVoice: (voice) => set({ selectedVoice: voice }),
}));
