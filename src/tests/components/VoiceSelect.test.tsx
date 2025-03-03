import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import VoiceSelect from "../../components/VoiceSelect";
import { useVoiceStore } from "../../hooks/useVoiceStore";

const mockGetVoices = vi.fn();
const mockSpeechSynthesis = {
  getVoices: mockGetVoices,
  onvoiceschanged: null as ((this: SpeechSynthesis, ev: Event) => void) | null,
};

const mockGoogleVoice = {
  name: "Google US English",
  lang: "en-US",
} as SpeechSynthesisVoice;

const mockOtherVoice = {
  name: "Other Voice",
  lang: "en-GB",
} as SpeechSynthesisVoice;

describe.skip("VoiceSelect", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useVoiceStore.getState().setSelectedVoice(null);

    Object.defineProperty(window, "speechSynthesis", {
      value: mockSpeechSynthesis,
      writable: true,
    });
  });

  it("renders without crashing", () => {
    mockGetVoices.mockReturnValue([]);
    render(<VoiceSelect />);
    expect(screen.getByTestId("voice-select-container")).toBeInTheDocument();
  });

  it('displays "No voices available" when no voices are present', () => {
    mockGetVoices.mockReturnValue([]);

    render(<VoiceSelect />);

    const selectElement = screen.getByLabelText("Voice");
    fireEvent.mouseDown(selectElement);

    expect(screen.getByText("No voices available")).toBeInTheDocument();
  });

  it("automatically selects Google US English voice when available", () => {
    mockGetVoices.mockReturnValue([mockGoogleVoice, mockOtherVoice]);
    render(<VoiceSelect />);

    expect(useVoiceStore.getState().selectedVoice).toBe(mockGoogleVoice);
    expect(screen.queryByTestId("voice-warning")).not.toBeInTheDocument();
  });

  it("shows warning when Google US English voice is not available", () => {
    mockGetVoices.mockReturnValue([mockOtherVoice]);
    render(<VoiceSelect />);

    expect(screen.getByTestId("voice-warning")).toBeInTheDocument();
    expect(useVoiceStore.getState().selectedVoice).toBe(mockOtherVoice);
  });

  it("shows warning when switching from Google voice to another voice", () => {
    mockGetVoices.mockReturnValue([mockGoogleVoice, mockOtherVoice]);
    render(<VoiceSelect />);

    expect(screen.queryByTestId("voice-warning")).not.toBeInTheDocument();

    const select = screen.getByLabelText("Voice");
    fireEvent.change(select, { target: { value: mockOtherVoice.name } });

    expect(screen.getByTestId("voice-warning")).toBeInTheDocument();
  });

  it("populates select with available voices", () => {
    const voices = [mockGoogleVoice, mockOtherVoice];
    mockGetVoices.mockReturnValue(voices);
    render(<VoiceSelect />);

    voices.forEach((voice) => {
      expect(screen.getByText(voice.name)).toBeInTheDocument();
    });
  });

  it("handles voice change correctly", () => {
    mockGetVoices.mockReturnValue([mockGoogleVoice, mockOtherVoice]);
    render(<VoiceSelect />);

    const select = screen.getByLabelText("Voice");
    fireEvent.change(select, { target: { value: mockOtherVoice.name } });

    expect(useVoiceStore.getState().selectedVoice).toBe(mockOtherVoice);
  });

  it("recognizes alternative Google US English voice names", () => {
    const alternativeGoogleVoice = {
      name: "en-US-Standard-C",
      lang: "en-US",
    } as SpeechSynthesisVoice;

    mockGetVoices.mockReturnValue([alternativeGoogleVoice, mockOtherVoice]);
    render(<VoiceSelect />);

    expect(useVoiceStore.getState().selectedVoice).toBe(alternativeGoogleVoice);
    expect(screen.queryByTestId("voice-warning")).not.toBeInTheDocument();
  });

  //   it("handles onvoiceschanged event", () => {
  //     mockGetVoices.mockReturnValue([]);
  //     render(<VoiceSelect />);

  //     mockGetVoices.mockReturnValue([mockGoogleVoice]);
  //     if (mockSpeechSynthesis.onvoiceschanged) {
  //       mockSpeechSynthesis.onvoiceschanged(new Event("voiceschanged"));
  //     }

  //     expect(mockGetVoices).toHaveBeenCalledTimes(2);
  //   });
});
