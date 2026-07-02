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
    console.log("0. BEFORE EACH START");

    console.log("1. Launching Electron...");
    app = await electron.launch({
      args: [".", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
      env: {
        ...process.env,
        E2E_TEST: "true",
      },
    });
    console.log("2. Electron launched");

    page = await app.firstWindow();
    console.log("3. Got firstWindow");

    mainPage = new MainPage(page);
    console.log("4. MainPage created");

    await page.evaluate(() => localStorage.clear());
    console.log("5. localStorage cleared");

    await page.waitForLoadState("domcontentloaded");
    console.log("6. DOM loaded");

    await page.waitForTimeout(500);
    console.log("7. WAIT DONE");
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
