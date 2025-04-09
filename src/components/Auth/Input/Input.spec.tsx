import { render, screen } from "@testing-library/react";
import Input from "~/components/Auth/Input/Input";

describe("Input Component", () => {
  it("should render input with correct label", () => {
    render(<Input label='Email' value='' onChange={() => {}} />);
    const inputLabel = screen.getByText("Email");
    expect(inputLabel).toBeInTheDocument();
  });
});
