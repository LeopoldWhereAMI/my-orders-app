import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";
import { OrderContext } from "../../Context/OrderContext";

describe("Header", () => {
  // Компонент Header отрендерился и на экране есть текст “Срочные заказы”
  test("renders header component", () => {
    const setActive = vi.fn();
    render(<Header setActive={setActive} />);

    expect(screen.getByText(/срочные заказы/i)).toBeInTheDocument();
  });

  // При клике на кнопку вызывается функция setActive с аргументом "addOrder"
  test("click on add-order button", () => {
    const setActive = vi.fn();
    render(<Header setActive={setActive} />);
    const addOrderButton = screen.getByTestId("add-order-button");

    fireEvent.click(addOrderButton);
    expect(setActive).toHaveBeenCalledWith("addOrder");
  });

  // После клика по картинке в UI появляется число 1
  test("click on image", async () => {
    const setActive = vi.fn();
    const mockOrders = [
      { id: 1, orderCount: "1", toolName: "test-tool", date: "01.01.2026" },
    ];
    const mockContextValue = {
      orders: mockOrders,
      ordersHistory: [],
      setOrders: vi.fn(),
      addOrder: vi.fn(),
      deleteOrder: vi.fn(),
      clearHistory: vi.fn(),
    };

    const user = userEvent.setup();

    render(
      <OrderContext.Provider value={mockContextValue}>
        <Header setActive={setActive} />
      </OrderContext.Provider>,
    );
    const headerImage = screen.getByAltText("header-img");

    expect(screen.queryByText(/срочных заказов/i)).not.toBeInTheDocument();
    await user.click(headerImage);
    expect(screen.getByText(/срочных заказов/i)).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
