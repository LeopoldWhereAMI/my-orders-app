import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, test } from "vitest";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("user creates order", async () => {
    const user = userEvent.setup();

    render(<App />);

    // открыть модалку
    await user.click(screen.getByRole("button", { name: /добавить заказ/i }));

    // найти поля формы
    const orderInput = await screen.findByRole("textbox", {
      name: /№ заказа/i,
    });

    const typeInput = await screen.findByRole("textbox", {
      name: /тип инструмента/i,
    });

    // заполнить
    await user.type(orderInput, "1");
    await user.type(typeInput, "test");

    // сохранить
    await user.click(screen.getByRole("button", { name: /сохранить/i }));

    // ищем список
    const list = screen.getByTestId("order-list");

    // проверяем конкретный заказ ВНУТРИ списка
    expect(within(list).getByText("1")).toBeInTheDocument();
    expect(within(list).getByText(/test/i)).toBeInTheDocument();
  });
});
