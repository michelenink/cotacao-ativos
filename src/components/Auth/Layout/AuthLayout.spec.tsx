import { render, screen } from "@testing-library/react";
import AuthLayout from "~/components/Auth/Layout/AuthLayout";

describe("AuthLayout Component", () => {
  it("should render children correctly", () => {
    render(
      <AuthLayout>
        <div>Test Content</div>
      </AuthLayout>
    );

    const testContent = screen.getByText("Test Content");
    expect(testContent).toBeInTheDocument();
  });
});
