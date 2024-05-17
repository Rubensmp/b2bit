import React from "react";
import { render, screen } from "@testing-library/react";
import InputText from ".";
import { useField } from "formik";
import userEvent from "@testing-library/user-event";

jest.mock("formik", () => ({
  useField: jest.fn(),
  FieldHookConfig: jest.fn(),
}));

describe("InputText Component", () => {
  beforeEach(() => {
    (useField as jest.Mock).mockReturnValue([
      { value: "", onChange: jest.fn() },
      { error: "" },
    ]);
  });

  test("renders label correctly", () => {
    render(<InputText label="Username" />);
    const labelElement = screen.getByText("Username");
    expect(labelElement).toBeInTheDocument();
  });

  test("renders input field correctly", () => {
    render(<InputText name="username" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("name", "username");
  });

  test("passes value and onChange prop to input field", () => {
    const handleChange = jest.fn();
    (useField as jest.Mock).mockReturnValueOnce([
      { value: "Test", onChange: handleChange },
      { error: "" },
    ]);
    render(<InputText name="username" />);
    const inputElement = screen.getByRole("textbox");
    userEvent.type(inputElement, "Test");
    expect(inputElement).toHaveValue("Test");
  });

  test("displays error messaqge when error is present", () => {
    (useField as jest.Mock).mockReturnValueOnce([
      { value: "", onChange: jest.fn() },
      { error: "Required" },
    ]);
    render(<InputText label="Username" />);
    const errorElement = screen.getByText("Required");
    expect(errorElement).toBeInTheDocument();
  });

  test("does not display error message when error is not present", () => {
    render(<InputText label="Username" />);
    const errorElement = screen.queryByText("Required");
    expect(errorElement).not.toBeInTheDocument();
  });
});
