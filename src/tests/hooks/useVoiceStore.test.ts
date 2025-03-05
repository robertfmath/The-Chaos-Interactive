import { describe, it, expect, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import { useVoiceStore } from "../../hooks/useVoiceStore";

describe("useVoiceStore", () => {
  beforeEach(() => {
    act(() => {
      useVoiceStore.setState({ selectedVoice: null });
    });
  });

  it("should initialize with null selectedVoice", () => {
    const state = useVoiceStore.getState();
    expect(state.selectedVoice).toBeNull();
  });

  it("should set selected voice", () => {
    const mockVoice = {
      name: "Test Voice",
      lang: "en-US",
      default: true,
      localService: true,
      voiceURI: "Test Voice",
    } as SpeechSynthesisVoice;

    act(() => {
      useVoiceStore.getState().setSelectedVoice(mockVoice);
    });

    const state = useVoiceStore.getState();
    expect(state.selectedVoice).toBe(mockVoice);
  });

  it("should update selected voice when changed", () => {
    const mockVoice1 = {
      name: "Test Voice 1",
      lang: "en-US",
      default: true,
      localService: true,
      voiceURI: "Test Voice 1",
    } as SpeechSynthesisVoice;

    const mockVoice2 = {
      name: "Test Voice 2",
      lang: "en-GB",
      default: false,
      localService: true,
      voiceURI: "Test Voice 2",
    } as SpeechSynthesisVoice;

    act(() => {
      useVoiceStore.getState().setSelectedVoice(mockVoice1);
    });
    expect(useVoiceStore.getState().selectedVoice).toBe(mockVoice1);

    act(() => {
      useVoiceStore.getState().setSelectedVoice(mockVoice2);
    });
    expect(useVoiceStore.getState().selectedVoice).toBe(mockVoice2);
  });

  it("should maintain state after multiple updates", () => {
    const mockVoice = {
      name: "Test Voice",
      lang: "en-US",
      default: true,
      localService: true,
      voiceURI: "Test Voice",
    } as SpeechSynthesisVoice;

    act(() => {
      useVoiceStore.getState().setSelectedVoice(mockVoice);
    });

    const state1 = useVoiceStore.getState();
    expect(state1.selectedVoice).toBe(mockVoice);

    act(() => {
      useVoiceStore.getState().setSelectedVoice(mockVoice);
    });

    const state2 = useVoiceStore.getState();
    expect(state2.selectedVoice).toBe(mockVoice);
  });
});
