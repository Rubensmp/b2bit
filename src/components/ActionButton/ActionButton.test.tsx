import { render, fireEvent, screen } from "@testing-library/react";
import ActionButton from ".";

describe("ActionButton Component", () => {
  test("renders button correctly with text", () => {
    render(<ActionButton text="Submit" />);
    const buttonElement = screen.getByText("Submit");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe("BUTTON");
  });

  test("applies custom width to button", () => {
    render(<ActionButton text="Submit" width="w-[200px]" />);
    const buttonElement = screen.getByText("Submit");
    expect(buttonElement).toHaveClass("w-[200px]");
  });

  test("executes action when clicked", () => {
    const mockAction = jest.fn();
    render(<ActionButton text="Submit" action={mockAction} />);
    const buttonElement = screen.getByText("Submit");
    fireEvent.click(buttonElement);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  test("displays loading indicator when loading is true", () => {
    render(<ActionButton text="Submit" loading />);
    const loadingElement = screen.getByTestId("loadingId");
    expect(loadingElement).toBeInTheDocument();
  });

  test("does not execute action when loading is true", () => {
    const mockAction = jest.fn();
    render(<ActionButton text="Submit" action={mockAction} loading />);
    const buttonElement = screen.getByTestId("actionButtonId");
    fireEvent.click(buttonElement);
    expect(mockAction).not.toHaveBeenCalled();
  });
});
