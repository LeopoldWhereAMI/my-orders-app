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
        DISPLAY: process.env.DISPLAY ?? ":99",
      },
    });
    console.log("2. Electron launched");

    app
      .process()
      .stdout?.on("data", (d) => console.log("[main stdout]", d.toString()));
    app
      .process()
      .stderr?.on("data", (d) => console.log("[main stderr]", d.toString()));

    page = await app.firstWindow(); // ← оставили только один вызов
    console.log("3. Got firstWindow");

    // Логи страницы (renderer process)
    page.on("console", (msg) =>
      console.log(`[renderer:${msg.type()}]`, msg.text()),
    );
    page.on("pageerror", (err) => console.log("[pageerror]", err));
    page.on("crash", () => console.log("[PAGE CRASHED]"));
    app.on("close", () => console.log("[ELECTRON APP CLOSED]"));

    mainPage = new MainPage(page);
    console.log("4. MainPage created");

    await page.waitForLoadState("domcontentloaded");
    console.log("5. DOM loaded");

    await page.evaluate(() => {
      try {
        localStorage.clear();
      } catch (e) {
        console.log("localStorage clear skipped:", e);
      }
    });
    console.log("6. localStorage cleared");

    // Ждём реальной готовности приложения, а не фиксированную паузу
    await page.waitForSelector('[data-testid="header-image"]', {
      timeout: 15000,
    });
    console.log("7. App is ready (header-image visible)");
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
