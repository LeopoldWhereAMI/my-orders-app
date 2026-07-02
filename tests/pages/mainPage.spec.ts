import {
  test,
  _electron as electron,
  ElectronApplication,
  Page,
} from "@playwright/test";
import { createOrder } from "../helpers/orders.helper";
import { checkOrderExists } from "../helpers/checks.helper";
import { MainPage } from "../models/MainPage";
import { elements } from "../config/elements.config";

let app: ElectronApplication;
let page: Page;
let mainPage: MainPage;

test.describe("Тесты главной страницы", () => {
  test.beforeEach(async () => {
    app = await electron.launch({
      args: ["."],
      env: {
        E2E_TEST: "true",
        DISPLAY: ":99",
      },
    });

    page = await app.firstWindow();

    mainPage = new MainPage(page);

    await page.evaluate(() => localStorage.clear());

    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(500);
  });

  test.afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  test("Проверка отображения элементов главной страницы", async () => {
    for (const { locator, name } of elements) {
      await test.step(`Проверка элемента: ${name}`, async () => {
        await mainPage.checkElementVisability(locator);
      });
    }
  });

  test("проверка добавления заказа", async () => {
    await createOrder(page);
    await checkOrderExists(page, "1", "бензобур");
  });

  test("Поиск заказа", async () => {
    const id = Date.now().toString();
    await createOrder(page, id, "бензобур");
    await mainPage.checkOrdersSearch();
  });

  test("Удаление заказа", async () => {
    await createOrder(page);
    await mainPage.checkOrdersDelete();
  });

  test("проверка счётчика заказов", async () => {
    await mainPage.checkOrdersCount();
  });
});
