// @ts-check
const { test, expect } = require("@playwright/test");

const pages = [
  { name: "index", url: "/" },
  { name: "vehagita", url: "/vehagita.html" },
  { name: "wordpress-security", url: "/wordpress-security.html" },
  { name: "teaching", url: "/teaching.html" },
  { name: "cv", url: "/cv.html" },
];

for (const page of pages) {
  test.describe(`${page.name} page`, () => {
    test.beforeEach(async ({ page: p }) => {
      await p.goto(page.url);
    });

    test("header has no nav links", async ({ page: p }) => {
      await expect(p.locator(".nav__links")).toHaveCount(0);
    });

    test("header has no hamburger toggle", async ({ page: p }) => {
      await expect(p.locator(".nav__toggle")).toHaveCount(0);
    });

    test("header has logo", async ({ page: p }) => {
      await expect(p.locator(".nav__logo")).toBeVisible();
    });

    test("header has status badge", async ({ page: p }) => {
      await expect(p.locator(".nav__status")).toBeVisible();
    });

    test("header has CV dropdown", async ({ page: p }) => {
      await expect(p.locator(".cv-dropdown")).toBeVisible();
    });

    test("header has social links", async ({ page: p }) => {
      await expect(p.locator(".nav__socials")).toBeVisible();
    });
  });
}
