import { test } from "@playwright/test";
import { createOrder } from "../helpers/orders.helper";
import { checkOrderExists } from "../helpers/checks.helper";
import { MainPage } from "../models/MainPage";
import { elements } from "../config/elements.config";

let mainPage: MainPage;

test.describe("Тесты главной страницы", () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test("Проверка отображения элементов главной страницы", async () => {
    for (const { locator, name } of elements) {
      await test.step(`Проверка элемента: ${name}`, async () => {
        await mainPage.checkElementVisability(locator);
      });
    }
  });

  test("проверка добавления заказа", async ({ page }) => {
    await createOrder(page);
    await checkOrderExists(page, "1", "бензобур");
  });

  test("Поиск заказа", async ({ page }) => {
    await createOrder(page);
    await mainPage.checkOrdersSearch();
  });

  test("Удаление заказа", async ({ page }) => {
    await createOrder(page);
    await mainPage.checkOrdersDelete();
  });

  test("проверка счётчика заказов", async () => {
    await mainPage.checkOrdersCount();
  });
});
