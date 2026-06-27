import { render, screen } from "@testing-library/react";
import { OrderContext } from "../../Context/OrderContext";
import { describe, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { OrdersList } from "./OrdersList";

describe("render OrdersList component", () => {
  test("renders search input and list container", () => {
    render(<OrdersList />);

    expect(screen.getByTestId("order-list")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Поиск заказа.../i)).toBeInTheDocument();
  });

  // Рендер списка
  test("renders orders", () => {
    const mockOrders = [
      { id: "1", orderCount: "1", toolName: "test", date: "" },
      { id: "2", orderCount: "2", toolName: "test2", date: "" },
    ];

    render(
      <OrderContext.Provider value={{ orders: mockOrders }}>
        <OrdersList />
      </OrderContext.Provider>,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  //SearchInput работает
  test("input on searchInput", async () => {
    const user = userEvent.setup();
    const mockOrders = [
      { id: "1", orderCount: "1", toolName: "test", date: "" },
      { id: "2", orderCount: "2", toolName: "test2", date: "" },
    ];

    render(
      <OrderContext.Provider value={{ orders: mockOrders }}>
        <OrdersList />
      </OrderContext.Provider>,
    );

    const searchInput = screen.getByPlaceholderText(/Поиск заказа.../i);

    await user.type(searchInput, "2");

    expect(screen.queryByText("test")).not.toBeInTheDocument();
    expect(screen.getByText("test2")).toBeInTheDocument();
  });
});
