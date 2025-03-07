import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VoiceSelect from "../../components/VoiceSelect";
import { useVoiceStore } from "../../hooks/useVoiceStore";

const mockGetVoices = vi.fn();
const mockSpeechSynthesis = {
  getVoices: mockGetVoices,
  onvoiceschanged: null as unknown as () => void | null,
};

const mockGoogleUSEnglishVoice = {
  name: "Google US English",
  lang: "en-US",
} as SpeechSynthesisVoice;

const mockiOSVoice = {
  name: "Samantha",
  lang: "en-US",
} as SpeechSynthesisVoice;

const mockDefaultVoice = {
  name: "Default Voice",
  lang: "en-US",
  default: true,
} as SpeechSynthesisVoice;

const mockOtherVoice = {
  name: "Other Voice",
  lang: "en-GB",
} as SpeechSynthesisVoice;

const mockSecondOtherVoice = {
  name: "Second Other Voice",
  lang: "en-GB",
} as SpeechSynthesisVoice;

describe("VoiceSelect", () => {
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

  it('displays "No voices available" when no voices are present', async () => {
    const user = userEvent.setup();
    mockGetVoices.mockReturnValue([]);

    render(<VoiceSelect />);

    const selectElement = screen.getByLabelText("Voice");
    await user.click(selectElement);

    expect(screen.getByText("No voices available")).toBeInTheDocument();
  });

  it("automatically selects Google US English voice when available", () => {
    mockGetVoices.mockReturnValue([
      mockOtherVoice,
      mockSecondOtherVoice,
      mockiOSVoice,
      mockGoogleUSEnglishVoice,
      mockDefaultVoice,
    ]);
    render(<VoiceSelect />);

    expect(useVoiceStore.getState().selectedVoice).toBe(
      mockGoogleUSEnglishVoice,
    );
    expect(screen.queryByTestId("voice-warning")).not.toBeInTheDocument();
  });

  it("selects iOS voice (Samantha) when available and Google US English is not", () => {
    mockGetVoices.mockReturnValue([
      mockSecondOtherVoice,
      mockOtherVoice,
      mockDefaultVoice,
      mockiOSVoice,
    ]);
    render(<VoiceSelect />);

    expect(useVoiceStore.getState().selectedVoice).toBe(mockiOSVoice);
    expect(screen.queryByTestId("voice-warning")).toBeInTheDocument();
  });

  it("selects default voice when available and Google US English and Samantha are not", () => {
    mockGetVoices.mockReturnValue([
      mockOtherVoice,
      mockDefaultVoice,
      mockSecondOtherVoice,
    ]);
    render(<VoiceSelect />);

    expect(useVoiceStore.getState().selectedVoice).toBe(mockDefaultVoice);
    expect(screen.queryByTestId("voice-warning")).toBeInTheDocument();
  });

  it("selects first voice in list if Google US English, iOS voice, and default voice are not available", () => {
    mockGetVoices.mockReturnValue([mockOtherVoice, mockSecondOtherVoice]);
    render(<VoiceSelect />);

    expect(useVoiceStore.getState().selectedVoice).toBe(mockOtherVoice);
    expect(screen.queryByTestId("voice-warning")).toBeInTheDocument();
  });

  it("shows warning when Google US English voice is not available", () => {
    mockGetVoices.mockReturnValue([mockOtherVoice]);
    render(<VoiceSelect />);

    expect(useVoiceStore.getState().selectedVoice).toBe(mockOtherVoice);

    expect(screen.getByTestId("voice-warning")).toBeInTheDocument();
    expect(screen.getByText(/browser does not support/)).toBeInTheDocument();
  });

  it("shows warning when switching from Google voice to another voice", async () => {
    const user = userEvent.setup();
    mockGetVoices.mockReturnValue([mockGoogleUSEnglishVoice, mockOtherVoice]);
    render(<VoiceSelect />);

    expect(screen.queryByTestId("voice-warning")).not.toBeInTheDocument();

    const select = screen.getByLabelText("Voice");
    await user.click(select);

    const otherVoice = screen.getByRole("option", { name: "Other Voice" });
    await user.click(otherVoice);
    expect(screen.getByTestId("voice-warning")).toBeInTheDocument();
    expect(screen.getByText(/You are no longer using/)).toBeInTheDocument();
  });

  it("handles voice change correctly", async () => {
    const user = userEvent.setup();
    mockGetVoices.mockReturnValue([mockGoogleUSEnglishVoice, mockOtherVoice]);
    render(<VoiceSelect />);

    const select = screen.getByLabelText("Voice");
    await user.click(select);

    const otherVoice = screen.getByRole("option", { name: "Other Voice" });
    await user.click(otherVoice);
    expect(useVoiceStore.getState().selectedVoice).toBe(mockOtherVoice);
  });

  it("populates select with available voices", async () => {
    const user = userEvent.setup();
    const voices = [mockGoogleUSEnglishVoice, mockOtherVoice];
    mockGetVoices.mockReturnValue(voices);

    render(<VoiceSelect />);

    const select = screen.getByLabelText("Voice");
    await user.click(select);

    voices.forEach((voice) => {
      expect(
        screen.getByRole("option", { name: voice.name }),
      ).toBeInTheDocument();
    });
  });

  it("deduplicates voices with the same name", async () => {
    const user = userEvent.setup();
    const duplicateVoice = {
      name: "Other Voice", // Same name as mockOtherVoice
      lang: "en-ZA",
    } as SpeechSynthesisVoice;

    mockGetVoices.mockReturnValue([
      mockGoogleUSEnglishVoice,
      mockOtherVoice,
      duplicateVoice,
    ]);

    render(<VoiceSelect />);

    const select = screen.getByLabelText("Voice");
    await user.click(select);

    const otherVoiceOptions = screen.getAllByRole("option", {
      name: "Other Voice",
    });
    expect(otherVoiceOptions).toHaveLength(1);

    const allOptions = screen.getAllByRole("option");
    expect(allOptions).toHaveLength(2);
  });

  it("does not refetch voices when a voice is already selected", () => {
    mockGetVoices.mockReturnValue([mockGoogleUSEnglishVoice, mockOtherVoice]);
    const { rerender } = render(<VoiceSelect />);

    mockGetVoices.mockClear();

    rerender(<VoiceSelect />);

    expect(mockGetVoices).not.toHaveBeenCalled();
  });
});
