import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import WordTooltipContent from "../../components/WordTooltipContent";
import { Word } from "../../types";

describe("WordTooltipContent", () => {
  const mockWord: Word = {
    text: "test",
    shouldPronounce: false,
    leadingPunctuation: '"',
    trailingPunctuation: '",',
  };

  it("renders without crashing", () => {
    render(<WordTooltipContent word={mockWord} />);
    expect(screen.getByTestId("word-tooltip-content")).toBeInTheDocument();
  });

  it("renders dictionary link button with correct text and icon", () => {
    render(<WordTooltipContent word={mockWord} />);

    const viewInDictionaryButton = screen.getByRole("button", {
      name: "View In Dictionary",
    });
    expect(viewInDictionaryButton).toBeInTheDocument();

    const menuBookIcon = within(viewInDictionaryButton).getByTestId(
      "MenuBookIcon",
    );
    expect(menuBookIcon).toBeInTheDocument();
  });

  it("uses word.text for dictionary link when linkTextOverride is not provided", () => {
    render(<WordTooltipContent word={mockWord} />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://www.merriam-webster.com/dictionary/test",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("uses word.linkTextOverride for dictionary link when linkTextOverride is provided", () => {
    render(
      <WordTooltipContent
        word={{ ...mockWord, linkTextOverride: "override" }}
      />,
    );
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://www.merriam-webster.com/dictionary/override",
    );
  });

  it("properly encodes special characters in link URL", () => {
    render(<WordTooltipContent word={{ ...mockWord, text: "test word" }} />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://www.merriam-webster.com/dictionary/test%20word",
    );
  });

  it("renders phonemic respelling when provided", () => {
    render(
      <WordTooltipContent
        word={{ ...mockWord, phonemicRespelling: "ˈtest" }}
      />,
    );

    const phonemicOverride = screen.getByText("ˈtest");
    expect(phonemicOverride).toBeInTheDocument();
  });
});
