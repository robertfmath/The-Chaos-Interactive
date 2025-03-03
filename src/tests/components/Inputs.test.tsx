import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Inputs from "../../components/Inputs";
import { ThemeProvider } from "@mui/material";
import theme from "../../theme";

vi.mock("../../components/VoiceSelect", () => ({
  default: () => <div role="combobox" aria-label="Voice Selection" />,
}));

describe("Inputs", () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Inputs />
      </ThemeProvider>,
    );
  });

  it("renders without crashing", () => {
    expect(screen.getByTestId("inputs-container")).toBeInTheDocument();
  });

  it("renders theme selection controls", () => {
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getByLabelText("Theme")).toBeInTheDocument();

    const radioButtons = screen.getAllByRole("radio");
    expect(radioButtons).toHaveLength(3);

    expect(screen.getByLabelText("System")).toBeInTheDocument();
    expect(screen.getByLabelText("Light")).toBeInTheDocument();
    expect(screen.getByLabelText("Dark")).toBeInTheDocument();
  });

  it("allows switching between themes", () => {
    const lightRadio = screen.getByLabelText("Light");
    const darkRadio = screen.getByLabelText("Dark");

    fireEvent.click(lightRadio);
    expect(lightRadio).toBeChecked();
    expect(darkRadio).not.toBeChecked();

    fireEvent.click(darkRadio);
    expect(darkRadio).toBeChecked();
    expect(lightRadio).not.toBeChecked();
  });

  it("renders voice selection component", () => {
    expect(
      screen.getByRole("combobox", { name: "Voice Selection" }),
    ).toBeInTheDocument();
  });
});
