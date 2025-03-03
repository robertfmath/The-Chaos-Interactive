import { describe, expect, beforeEach, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Navbar from "../../components/Navbar";

describe("Navbar", () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  it("renders the component", () => {
    const appBar = screen.getByRole("banner");
    expect(appBar).toBeInTheDocument();
  });

  it("renders the title", () => {
    const title = screen.getByRole("heading", {
      name: /the chaos — interactive/i,
    });
    expect(title).toBeInTheDocument();
  });

  it("renders a button with a GitHub icon", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    const githubIcon = within(button).getByTestId("GitHubIcon");
    expect(githubIcon).toBeInTheDocument();
  });

  it("renders a link to the GitHub repository", () => {
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://www.github.com/robertfmath/The-Chaos-Interactive",
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
  });
});
