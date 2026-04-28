import { expect, test } from "@playwright/test";

test("three-page bakery loads and supports browsing flow", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Sugar & Swirl Bakery/);
  await expect(page.getByRole("link", { name: "Menu", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Visit", exact: true })).toBeVisible();
  await expect(page.getByAltText(/Cute bakery storefront with pastel sweets/)).toBeVisible();

  await page.getByRole("link", { name: "View the menu" }).click();
  await expect(page).toHaveURL(/\/menu/);

  const productCards = page.locator("main article");
  await expect(productCards).toHaveCount(6);
  await expect(productCards.first()).toContainText("Strawberry Cloud Cake");
  await expect(productCards.first()).toContainText("Add to basket");

  await page.getByRole("link", { name: "Visit" }).first().click();
  await expect(page).toHaveURL(/\/visit/);
  await expect(page.getByRole("heading", { name: /Pop in for coffee/ })).toBeVisible();
});
