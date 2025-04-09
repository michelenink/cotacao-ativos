import { render, screen } from "@testing-library/react";
import Button from "~/components/Shared/Button/Button";

describe("Button Component", () => {
  it("should render button with text", () => {
    render(<Button>Entrar</Button>);
    expect(screen.getByText("Entrar")).toBeInTheDocument();
  });

  it("should apply the correct styles", () => {
    render(<Button variant='primary'>Entrar</Button>);
    const button = screen.getByText("Entrar");
    expect(button).toHaveClass("primary");
  });
});
