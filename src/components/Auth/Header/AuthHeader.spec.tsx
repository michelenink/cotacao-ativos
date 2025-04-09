import { render, screen } from "@testing-library/react";
import AuthHeader from "~/components/Auth/Header/AuthHeader";

describe("AuthHeader Component", () => {
  it("should render title correctly", () => {
    render(
      <AuthHeader title='Seja bem-vindo!' subtitle='Faça login para acessar' />
    );

    const title = screen.getByText("Seja bem-vindo!");
    expect(title).toBeInTheDocument();
  });

  it("should render subtitle correctly", () => {
    render(
      <AuthHeader title='Seja bem-vindo!' subtitle='Faça login para acessar' />
    );

    const subtitle = screen.getByText("Faça login para acessar");
    expect(subtitle).toBeInTheDocument();
  });
});
