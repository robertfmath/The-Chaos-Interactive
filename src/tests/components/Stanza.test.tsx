import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Stanza from "../../components/Stanza";
import { Word as WordType } from "../../types";

vi.mock("../../components/Line", () => ({
  default: ({ words }: { words: WordType[] }) => (
    <div data-testid="mocked-line">
      {words.map((word) => word.text).join(" ")}
    </div>
  ),
}));

describe("Stanza", () => {
  const mockLines = [
    {
      lineNumber: 1,
      words: [
        { text: "First", shouldPronounce: false },
        { text: "line", shouldPronounce: false },
      ],
    },
    {
      lineNumber: 2,
      words: [
        { text: "Second", shouldPronounce: false },
        { text: "line", shouldPronounce: false },
      ],
    },
    {
      lineNumber: 3,
      words: [
        { text: "Third", shouldPronounce: false },
        { text: "line", shouldPronounce: false },
      ],
    },
    {
      lineNumber: 4,
      words: [
        { text: "Fourth", shouldPronounce: false },
        { text: "line", shouldPronounce: false },
      ],
    },
  ];

  it("renders without crashing", () => {
    render(<Stanza lines={mockLines} />);
    expect(screen.getByTestId("stanza")).toBeInTheDocument();
  });

  it("renders correct number of lines", () => {
    render(<Stanza lines={mockLines} />);
    const lines = screen.getAllByTestId("mocked-line");
    expect(lines).toHaveLength(4);
  });

  it("handles empty lines array", () => {
    render(<Stanza lines={[]} />);
    expect(screen.getByTestId("stanza")).toBeInTheDocument();
    expect(screen.queryByTestId("mocked-line")).not.toBeInTheDocument();
  });

  it("handles single line", () => {
    const singleLine = [
      {
        lineNumber: 1,
        words: [
          { text: "Single", shouldPronounce: false },
          { text: "line", shouldPronounce: false },
        ],
      },
    ];

    render(<Stanza lines={singleLine} />);
    expect(screen.getAllByTestId("mocked-line")).toHaveLength(1);
  });
});
