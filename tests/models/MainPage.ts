import { expect, Locator, Page } from "@playwright/test";
import { ElementConfig, elements } from "../config/elements.config";
import { createOrder } from "../helpers/orders.helper";

export class MainPage {
  readonly page: Page;
  readonly elements: ElementConfig[];

  constructor(page: Page) {
    this.page = page;
    this.elements = elements;
  }

  async openMainPage() {
    await this.page.goto("http://localhost:5173/");
  }

  async checkElementVisability(locator: (page: Page) => Locator) {
    await expect(locator(this.page)).toBeVisible();
  }

  async checkOrdersSearch() {
    await this.page.getByRole("textbox", { name: "Поиск заказа" }).fill("1");
    await expect(this.page.getByTestId("order-item")).toHaveCount(1);
  }

  async checkOrdersDelete() {
    await this.page.getByRole("button", { name: "Удалить заказ" }).click();
    await expect(this.page.getByTestId("order-item")).toHaveCount(0);
  }

  async checkOrdersCount() {
    await this.page.getByTestId("header-image").click();
    await expect(this.page.getByTestId("orders-count")).toContainText("0");
    await createOrder(this.page);
    await expect(this.page.getByTestId("orders-count")).toContainText("1");
  }
}
