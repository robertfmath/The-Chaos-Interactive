import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { Line as LineType } from "../types";

vi.mock("../components/Navbar", () => ({
  default: () => <div data-testid="mock-navbar">Navbar</div>,
}));

vi.mock("../components/ApplicationInfo", () => ({
  default: () => <div data-testid="mock-application-info">ApplicationInfo</div>,
}));

vi.mock("../components/Inputs", () => ({
  default: () => <div data-testid="mock-inputs">Inputs</div>,
}));

vi.mock("../components/Stanza", () => ({
  default: ({ lines }: { lines: LineType[] }) => (
    <div data-testid="mock-stanza">
      {lines
        .map((line) => line.words.map((word) => word.text).join(" "))
        .join(" ")}
    </div>
  ),
}));

vi.mock("../components/PoemDataSkeleton", () => ({
  default: () => <div data-testid="mock-poem-skeleton">Loading...</div>,
}));

describe("App", () => {
  const mockStanzas = [
    {
      stanzaNumber: 1,
      lines: [
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
      ],
    },
    {
      stanzaNumber: 2,
      lines: [
        {
          lineNumber: 1,
          words: [
            { text: "Fifth", shouldPronounce: false },
            { text: "line", shouldPronounce: false },
          ],
        },
        {
          lineNumber: 2,
          words: [
            { text: "Sixth", shouldPronounce: false },
            { text: "line", shouldPronounce: false },
          ],
        },
        {
          lineNumber: 3,
          words: [
            { text: "Seventh", shouldPronounce: false },
            { text: "line", shouldPronounce: false },
          ],
        },
        {
          lineNumber: 4,
          words: [
            { text: "Eighth", shouldPronounce: false },
            { text: "line", shouldPronounce: false },
          ],
        },
      ],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    window.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockStanzas),
    });
  });

  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByTestId("mock-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("mock-application-info")).toBeInTheDocument();
    expect(screen.getByTestId("mock-inputs")).toBeInTheDocument();
  });

  it("shows loading skeleton initially", () => {
    render(<App />);
    expect(screen.getByTestId("mock-poem-skeleton")).toBeInTheDocument();
  });

  it("fetches and displays poem data successfully", async () => {
    window.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockStanzas),
    });

    render(<App />);

    expect(screen.getByTestId("mock-poem-skeleton")).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.queryByTestId("mock-poem-skeleton"),
      ).not.toBeInTheDocument();
    });

    const stanzas = screen.getAllByTestId("mock-stanza");
    expect(stanzas).toHaveLength(2);
    expect(stanzas[0]).toHaveTextContent(
      "First line Second line Third line Fourth line",
    );
    expect(stanzas[1]).toHaveTextContent(
      "Fifth line Sixth line Seventh line Eighth line",
    );
  });

  it("handles fetch error gracefully", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    window.fetch = vi.fn().mockRejectedValue(new Error("Fetch failed"));
    render(<App />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error loading poem JSON:",
        new Error("Fetch failed"),
      );
    });

    expect(screen.getByTestId("mock-poem-skeleton")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-stanza")).not.toBeInTheDocument();
  });
});
