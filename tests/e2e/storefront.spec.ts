import { expect, test } from "@playwright/test";

test("storefront loads and renders products", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Nova Market/);

  const productCards = page.locator('#shop article');
  await expect(productCards).toHaveCount(6);

  const firstCard = productCards.first();
  await expect(firstCard).toContainText(/£\d+\.\d+/);
  await expect(firstCard).toContainText(/★/);
});
