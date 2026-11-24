import {
  test,
  _electron as electron,
  ElectronApplication,
  Page,
} from "@playwright/test";
import os from "os";
import fs from "fs";
import path from "path";
import { createOrder } from "../helpers/orders.helper";
import { checkOrderExists } from "../helpers/checks.helper";
import { MainPage } from "../models/MainPage";
import { elements } from "../config/elements.config";

let app: ElectronApplication;
let page: Page;
let mainPage: MainPage;
let userDataDir: string;

test.describe("Тесты главной страницы", () => {
  test.beforeEach(async () => {
    // создаём пустую временную папку для профиля Electron
    userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "orders-e2e-"));

    app = await electron.launch({
      args: [
        ".",
        `--user-data-dir=${userDataDir}`, // у каждого теста свой профиль
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
      ],
      env: {
        ...process.env,
        E2E_TEST: "true",
        DISPLAY: process.env.DISPLAY ?? ":99",
      },
    });

    page = await app.firstWindow();
    mainPage = new MainPage(page);
    await page.waitForSelector('[data-testid="header-image"]', {
      timeout: 15000,
    });
  });

  test.afterEach(async () => {
    await app?.close();
    // удаляем временный профиль после теста
    fs.rmSync(userDataDir, { recursive: true, force: true });
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
