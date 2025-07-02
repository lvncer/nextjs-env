import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders button with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByTestId("button")).toBeInTheDocument();
    expect(screen.getByTestId("button-text")).toHaveTextContent("Click me");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByTestId("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders different variants correctly", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByTestId("button")).toHaveClass("bg-blue-600");

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByTestId("button")).toHaveClass("bg-gray-600");

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByTestId("button")).toHaveClass("bg-red-600");

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByTestId("button")).toHaveClass("bg-transparent");
  });

  it("renders different sizes correctly", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByTestId("button")).toHaveClass("px-3", "py-1.5", "text-sm");

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByTestId("button")).toHaveClass("px-4", "py-2", "text-base");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByTestId("button")).toHaveClass("px-6", "py-3", "text-lg");
  });

  it("shows loading state correctly", () => {
    render(<Button loading>Loading</Button>);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.getByTestId("button")).toBeDisabled();
  });

  it("handles disabled state", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const button = screen.getByTestId("button");
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders full width when specified", () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByTestId("button")).toHaveClass("w-full");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByTestId("button")).toHaveClass("custom-class");
  });

  it("forwards other props to button element", () => {
    render(
      <Button type="submit" id="submit-btn">
        Submit
      </Button>
    );

    const button = screen.getByTestId("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("id", "submit-btn");
  });

  it("prevents click when loading", () => {
    const handleClick = vi.fn();
    render(
      <Button loading onClick={handleClick}>
        Loading
      </Button>
    );

    fireEvent.click(screen.getByTestId("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("has proper accessibility attributes", () => {
    render(<Button>Accessible Button</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("data-testid", "button");
  });
});
