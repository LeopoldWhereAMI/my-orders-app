import { expect, Page } from "@playwright/test";

export async function createOrder(page: Page, number = "1", type = "бензобур") {
  await page.getByTestId("add-order-button").click();

  await page.getByRole("textbox", { name: "№ заказа" }).fill(number);
  await page.getByRole("textbox", { name: "Тип инструмента" }).fill(type);
  await page.getByRole("button", { name: "Сохранить" }).click();
  await expect(page.getByTestId("order-item")).toBeVisible();
}
