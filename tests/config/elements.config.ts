import { Locator, Page } from "@playwright/test";

export interface ElementConfig {
  locator: (page: Page) => Locator;
  name: string;
}

export const elements: ElementConfig[] = [
  {
    locator: (page: Page) => page.getByTestId("header-image"),
    name: "header-image",
  },
  {
    locator: (page: Page) =>
      page.getByRole("heading", { name: "Срочные заказы" }),
    name: "заголовок 'Срочные заказы'",
  },
  {
    locator: (page: Page) => page.getByRole("heading"),
    name: "заголовок h1",
  },
  {
    locator: (page: Page) => page.getByTestId("add-order-button"),
    name: "кнопка 'Добавить заказ'",
  },
  {
    locator: (page: Page) =>
      page.getByRole("button", { name: "История заказов" }),
    name: "кнопка 'История заказов'",
  },
  {
    locator: (page: Page) =>
      page.getByRole("textbox", { name: "Поиск заказа" }),
    name: "поле поиска",
  },
];
