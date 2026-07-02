import { render, screen } from "@testing-library/react";
import { AddOrderForm } from "./AddOrderForm";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { OrderContext } from "../../Context/OrderContext";
import { InputContext } from "../../Context/InputContext";

test("user fills form and submits order", async () => {
  const user = userEvent.setup();
  const addOrder = vi.fn();

  const mockOrderContext = {
    orders: [],
    ordersHistory: [],
    setOrders: vi.fn(),
    addOrder,
    deleteOrder: vi.fn(),
    clearHistory: vi.fn(),
  };

  const mockInputContext = {
    orderCount: "",
    toolName: "",
    setOrderCount: vi.fn(),
    setToolName: vi.fn(),
  };

  render(
    <OrderContext.Provider value={mockOrderContext}>
      <InputContext.Provider value={mockInputContext}>
        <AddOrderForm />
      </InputContext.Provider>
    </OrderContext.Provider>,
  );

  await user.type(screen.getByLabelText("№ заказа"), "1");
  await user.type(screen.getByLabelText("Тип инструмента"), "test");

  await user.click(screen.getByRole("button", { name: /Сохранить/i }));

  expect(addOrder).toHaveBeenCalledTimes(1);
});
