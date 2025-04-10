import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card Component", () => {
  it("renders a card with currency information", () => {
    render(
      <Card
        title='Dollar'
        value={5.45}
        variation={1.23}
        buy={5.42}
        sell={5.47}
        isCurrency={true}
      />
    );

    expect(screen.getByText("Dollar")).toBeInTheDocument();

    expect(screen.getByText("Compra: R$ 5.42")).toBeInTheDocument();
    expect(screen.getByText("Venda: R$ 5.47")).toBeInTheDocument();
  });
});
