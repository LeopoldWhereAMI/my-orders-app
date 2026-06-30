import { expect, Page } from "@playwright/test";

export async function checkOrderExists(
  page: Page,
  number: string,
  tool: string,
) {
  const orderItem = page.getByTestId("order-item");
  await expect(orderItem).toBeVisible();
  await expect(orderItem).toContainText(number);
  await expect(orderItem).toContainText(tool);
}
