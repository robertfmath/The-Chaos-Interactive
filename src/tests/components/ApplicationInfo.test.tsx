import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import ApplicationInfo from "../../components/ApplicationInfo";

describe("ApplicationInfo", () => {
  beforeEach(() => {
    render(<ApplicationInfo />);
  });

  it("renders without crashing", () => {
    expect(screen.getByTestId("application-info")).toBeInTheDocument();
  });

  it("renders introduction section", () => {
    const introductionSection = screen.getByTestId("introduction");
    expect(introductionSection).toBeInTheDocument();

    expect(
      within(introductionSection).getByText("The Chaos"),
    ).toBeInTheDocument();
    expect(
      within(introductionSection).getByText(/by Gerard Nolst Trenité/),
    ).toBeInTheDocument();
    expect(
      within(introductionSection).getByText(/In this interactive version/),
    ).toBeInTheDocument();
  });

  it("contains link to more information", () => {
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("here");
    expect(link).toHaveAttribute(
      "href",
      "https://ncf.idallen.com/english.html",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders notes section", () => {
    const notesSection = screen.getByTestId("notes");
    expect(notesSection).toBeInTheDocument();

    expect(within(notesSection).getByText(/A few notes/)).toBeInTheDocument();
    const individualNotes = within(notesSection).getAllByRole("listitem");
    expect(individualNotes.length).toBeGreaterThan(1);
  });
});
