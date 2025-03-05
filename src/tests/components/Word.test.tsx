import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Word from "../../components/Word";
import { Word as WordType } from "../../types";
import { ThemeProvider } from "@mui/material";
import theme from "../../theme";

vi.mock("../../hooks/useVoiceStore", () => ({
  useVoiceStore: vi.fn(() => ({
    selectedVoice: { name: "Mock Voice" },
  })),
}));

vi.mock("../../components/WordTooltipContent", () => ({
  default: ({ word }: { word: WordType }) => (
    <div data-testid="word-tooltip">Tooltip for {word.text}</div>
  ),
}));

Object.defineProperty(window, "SpeechSynthesisUtterance", {
  value: vi.fn().mockImplementation((text: string) => ({
    text,
    voice: null,
  })),
  writable: true,
});

const mockSpeak = vi.fn();
Object.defineProperty(window, "speechSynthesis", {
  value: { speak: mockSpeak },
  writable: true,
});

describe("Word", () => {
  const renderWord = (wordProps: WordType) => {
    render(
      <ThemeProvider theme={theme}>
        <Word word={wordProps} />
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders basic word", () => {
    renderWord({ text: "test", shouldPronounce: false });
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  describe("Pronunciation behavior", () => {
    it("renders clickable word when shouldPronounce is true", () => {
      renderWord({ text: "test", shouldPronounce: true });
      const word = screen.getByText("test");
      expect(word).toHaveStyle({ cursor: "pointer" });
    });

    it("speaks word when clicked and shouldPronounce is true", () => {
      renderWord({ text: "test", shouldPronounce: true });
      fireEvent.click(screen.getByText("test"));
      expect(mockSpeak).toHaveBeenCalled();
    });

    it("uses phoneticOverride when provided", () => {
      renderWord({
        text: "wind",
        shouldPronounce: true,
        phoneticOverride: "wined",
      });
      fireEvent.click(screen.getByText("wind"));
      expect(mockSpeak).toHaveBeenCalledWith(
        expect.objectContaining({ text: "wined" }),
      );
    });

    it("does not speak when shouldPronounce is false", () => {
      renderWord({ text: "test", shouldPronounce: false });
      fireEvent.click(screen.getByText("test"));
      expect(mockSpeak).not.toHaveBeenCalled();
    });
  });

  it("applies phonemic respelling class when provided", () => {
    renderWord({
      text: "test",
      shouldPronounce: true,
      phonemicRespelling: "ˈtest",
    });
    expect(screen.getByText("test")).toHaveClass("has-phonemic-respelling");
  });

  it("does not apply phonemic respelling class when not provided", () => {
    renderWord({ text: "test", shouldPronounce: true });
    expect(screen.getByText("test")).not.toHaveClass("has-phonemic-respelling");
  });

  it("applies standalone letter class when a pronunciation word is a standalone letter", () => {
    renderWord({ text: "z", shouldPronounce: true, standaloneLetter: true });
    expect(screen.getByText("z")).toHaveClass("is-standalone-letter");
  });

  it("applies standalone letter class when a non-pronunciation word is a standalone letter", () => {
    renderWord({ text: "z", shouldPronounce: false, standaloneLetter: true });
    expect(screen.getByText("z")).toHaveClass("is-standalone-letter");
  });

  describe("Punctuation", () => {
    it("renders leading punctuation", () => {
      renderWord({
        text: "test",
        shouldPronounce: false,
        leadingPunctuation: '"',
      });
      expect(screen.getByText('"')).toBeInTheDocument();
      expect(screen.getByText("test")).toBeInTheDocument();
    });

    it("renders trailing punctuation", () => {
      renderWord({
        text: "test",
        shouldPronounce: false,
        trailingPunctuation: ",",
      });
      expect(screen.getByText("test")).toBeInTheDocument();
      expect(screen.getByText(",")).toBeInTheDocument();
    });
  });

  describe("Tooltip", () => {
    it("renders tooltip for pronounceable words", () => {
      renderWord({ text: "test", shouldPronounce: true });
      expect(screen.getByTestId("word-tooltip")).toBeInTheDocument();
    });

    it("does not render tooltip for non-pronounceable words", () => {
      renderWord({ text: "test", shouldPronounce: false });
      expect(screen.queryByTestId("word-tooltip")).not.toBeInTheDocument();
    });
  });
});
