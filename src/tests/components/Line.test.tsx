import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Line from "../../components/Line";
import { Word as WordType } from "../../types";

vi.mock("../../components/Word", () => ({
  default: ({ word }: { word: WordType }) => (
    <span data-testid="mocked-word">{word.text}</span>
  ),
}));

describe("Line", () => {
  const mockWords = [
    {
      text: "Hello",
      shouldPronounce: false,
      noSpace: false,
    },
    {
      text: "world",
      shouldPronounce: true,
      noSpace: false,
    },
  ];

  it("renders without crashing", () => {
    render(<Line words={mockWords} />);
    expect(screen.getByTestId("line")).toBeInTheDocument();
  });

  it("renders correct number of words", () => {
    render(<Line words={mockWords} />);
    const words = screen.getAllByTestId("mocked-word");
    expect(words).toHaveLength(2);
  });

  it("adds spaces between words by default", () => {
    render(<Line words={mockWords} />);
    const lineElement = screen.getByTestId("line");
    expect(lineElement.textContent).toBe("Hello world");
  });

  it("respects noSpace property", () => {
    const wordsWithNoSpace = [
      {
        text: "Hello",
        shouldPronounce: false,
        noSpace: true,
      },
      {
        text: "world",
        shouldPronounce: true,
        noSpace: false,
      },
    ];

    render(<Line words={wordsWithNoSpace} />);
    const lineElement = screen.getByTestId("line");
    expect(lineElement.textContent).toBe("Helloworld");
  });

  it("handles empty words array", () => {
    render(<Line words={[]} />);
    expect(screen.getByTestId("line")).toBeInTheDocument();
    expect(screen.queryByTestId("mocked-word")).not.toBeInTheDocument();
  });

  it("handles single word", () => {
    const singleWord = [
      {
        text: "Hello",
        shouldPronounce: false,
        noSpace: false,
      },
    ];

    render(<Line words={singleWord} />);
    expect(screen.getAllByTestId("mocked-word")).toHaveLength(1);
    expect(screen.getByTestId("line").textContent).toBe("Hello");
  });

  it("renders words with complex properties", () => {
    const complexWords = [
      {
        text: "Hello",
        shouldPronounce: true,
        leadingPunctuation: '"',
        trailingPunctuation: ",",
        noSpace: false,
      },
      {
        text: "world",
        shouldPronounce: true,
        phoneticOverride: "wərld",
        noSpace: false,
      },
    ];

    render(<Line words={complexWords} />);
    const words = screen.getAllByTestId("mocked-word");
    expect(words).toHaveLength(2);
  });

  it("does not add space after last word", () => {
    render(<Line words={mockWords} />);
    const lineElement = screen.getByTestId("line");
    expect(lineElement.textContent?.endsWith(" ")).toBe(false);
  });
});
