import { test, expect } from "@playwright/test";

test.describe("Homepage E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display homepage content correctly", async ({ page }) => {
    // ページタイトルの確認
    await expect(page.getByTestId("home-title")).toHaveText("Welcome to My Test Website");
    await expect(page.getByTestId("home-description")).toHaveText(
      "This is a test website to verify husky and lint-staged formatting"
    );

    // セクションの確認
    await expect(page.getByText("About Us")).toBeVisible();
    await expect(page.getByText("Services")).toBeVisible();
    await expect(page.getByText("Contact Information")).toBeVisible();

    // サービスリストの確認
    await expect(page.getByText("Web Development")).toBeVisible();
    await expect(page.getByText("Mobile App Development")).toBeVisible();
    await expect(page.getByText("UI/UX Design")).toBeVisible();

    // 連絡先情報の確認
    await expect(page.getByText("contact@testwebsite.com")).toBeVisible();
    await expect(page.getByText("+1 (555) 123-4567")).toBeVisible();
    await expect(page.getByText("123 Test Street, Web City")).toBeVisible();
  });

  test("should navigate to test page", async ({ page }) => {
    // テストページリンクをクリック
    await page.getByTestId("test-page-link").click();

    // テストページに遷移したことを確認
    await expect(page).toHaveURL("/test-page");
    await expect(page.getByTestId("page-title")).toHaveText("テストページ");
  });

  test("should have proper accessibility", async ({ page }) => {
    // メインコンテンツエリアの確認
    await expect(page.locator("main")).toBeVisible();

    // 見出しの階層構造確認
    const h1 = page.locator("h1");
    const h2Elements = page.locator("h2");

    await expect(h1).toHaveCount(1);
    await expect(h2Elements).toHaveCount(3); // About Us, Services, Contact Information
  });

  test("should be responsive", async ({ page }) => {
    // デスクトップサイズでの確認
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByTestId("home-title")).toBeVisible();

    // タブレットサイズでの確認
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByTestId("home-title")).toBeVisible();

    // モバイルサイズでの確認
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByTestId("home-title")).toBeVisible();
  });

  test("should have working footer links", async ({ page }) => {
    const privacyLink = page.getByRole("link", { name: "Privacy Policy" });
    const termsLink = page.getByRole("link", { name: "Terms of Service" });
    const contactLink = page.getByRole("link", { name: "Contact" });

    // リンクが存在することを確認
    await expect(privacyLink).toBeVisible();
    await expect(termsLink).toBeVisible();
    await expect(contactLink).toBeVisible();

    // リンクがhref属性を持っていることを確認
    await expect(privacyLink).toHaveAttribute("href");
    await expect(termsLink).toHaveAttribute("href");
    await expect(contactLink).toHaveAttribute("href");
  });
});
