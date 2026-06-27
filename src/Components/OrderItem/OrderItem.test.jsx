import { render, screen } from "@testing-library/react";
import { OrderItem } from "./OrderItem";
import { OrderContext } from "../../Context/OrderContext";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("renders OrderItem component ", () => {
  test("render UI", () => {
    const mockOrder = {
      id: "",
      orderCount: "",
      toolName: "",
      date: "",
    };

    render(<OrderItem order={mockOrder} />);

    expect(screen.getByTestId("order-item")).toBeInTheDocument();
  });

  test("click on deleteButton", async () => {
    const user = userEvent.setup();

    const mockOrder = {
      id: "",
      orderCount: "",
      toolName: "",
      date: "",
    };

    const deleteOrder = vi.fn();

    const mockOrderContextValue = {
      orders: [],
      ordersHistory: [],
      setOrders: vi.fn(),
      addOrder: vi.fn(),
      deleteOrder,
      clearHistory: vi.fn(),
    };

    render(
      <OrderContext.Provider value={mockOrderContextValue}>
        <OrderItem order={mockOrder} />
      </OrderContext.Provider>,
    );

    const deleteButton = screen.getByRole("button", { name: /удалить заказ/i });

    await user.click(deleteButton);

    expect(deleteOrder).toHaveBeenCalledTimes(1);
  });
});
