import { test, expect } from "@playwright/test";

test.describe("Test Page E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/test-page");
  });

  test("should display test page content correctly", async ({ page }) => {
    // ページタイトルとdescriptionの確認
    await expect(page.getByTestId("page-title")).toHaveText("テストページ");
    await expect(page.getByTestId("page-description")).toHaveText(
      "このページはE2Eテスト用のサンプルページです"
    );

    // セクションタイトルの確認
    await expect(page.getByTestId("buttons-section-title")).toHaveText(
      "ボタンコンポーネントテスト"
    );
    await expect(page.getByTestId("interaction-section-title")).toHaveText(
      "インタラクションテスト"
    );
    await expect(page.getByTestId("contact-section-title")).toHaveText("お問い合わせフォーム");
    await expect(page.getByTestId("navigation-section-title")).toHaveText("ナビゲーションテスト");
  });

  test("should test button variants", async ({ page }) => {
    // ボタンバリアントの存在確認
    await expect(page.getByTestId("primary-button")).toBeVisible();
    await expect(page.getByTestId("secondary-button")).toBeVisible();
    await expect(page.getByTestId("danger-button")).toBeVisible();
    await expect(page.getByTestId("ghost-button")).toBeVisible();

    // ボタンがクリック可能であることを確認
    await page.getByTestId("primary-button").click();
    await page.getByTestId("secondary-button").click();
    await page.getByTestId("danger-button").click();
    await page.getByTestId("ghost-button").click();
  });

  test("should test button sizes", async ({ page }) => {
    // ボタンサイズの存在確認
    await expect(page.getByTestId("small-button")).toBeVisible();
    await expect(page.getByTestId("medium-button")).toBeVisible();
    await expect(page.getByTestId("large-button")).toBeVisible();

    // 各サイズのボタンをクリック
    await page.getByTestId("small-button").click();
    await page.getByTestId("medium-button").click();
    await page.getByTestId("large-button").click();
  });

  test("should test button states", async ({ page }) => {
    // ローディングボタンの確認
    const loadingButton = page.getByTestId("loading-button");
    await expect(loadingButton).toBeVisible();
    await expect(loadingButton).toBeDisabled();

    // 無効化されたボタンの確認
    const disabledButton = page.getByTestId("disabled-button");
    await expect(disabledButton).toBeVisible();
    await expect(disabledButton).toBeDisabled();

    // 全幅ボタンの確認
    await expect(page.getByTestId("full-width-button")).toBeVisible();
    await page.getByTestId("full-width-button").click();
  });

  test("should test click counter functionality", async ({ page }) => {
    const incrementButton = page.getByTestId("increment-button");
    const clickCount = page.locator("#click-count");

    // 初期値が0であることを確認
    await expect(clickCount).toHaveText("0");

    // ボタンをクリックして値が増加することを確認
    await incrementButton.click();
    await expect(clickCount).toHaveText("1");

    await incrementButton.click();
    await expect(clickCount).toHaveText("2");

    await incrementButton.click();
    await expect(clickCount).toHaveText("3");
  });

  test("should test toggle visibility functionality", async ({ page }) => {
    const toggleButton = page.getByTestId("toggle-button");
    const toggleContent = page.getByTestId("toggle-content");

    // 初期状態では要素が表示されていることを確認
    await expect(toggleContent).toBeVisible();

    // ボタンをクリックして要素が非表示になることを確認
    await toggleButton.click();
    await expect(toggleContent).toBeHidden();

    // 再度クリックして要素が表示されることを確認
    await toggleButton.click();
    await expect(toggleContent).toBeVisible();
  });

  test("should test text input functionality", async ({ page }) => {
    const textInput = page.getByTestId("text-input");

    // 入力フィールドが存在することを確認
    await expect(textInput).toBeVisible();

    // テキストを入力
    await textInput.fill("テスト入力文字列");
    await expect(textInput).toHaveValue("テスト入力文字列");

    // 入力をクリア
    await textInput.clear();
    await expect(textInput).toHaveValue("");
  });

  test("should test contact form submission flow", async ({ page }) => {
    const nameInput = page.getByTestId("name-input");
    const emailInput = page.getByTestId("email-input");
    const messageInput = page.getByTestId("message-input");
    const submitButton = page.getByTestId("submit-button");

    // 有効なデータを入力
    await nameInput.fill("田中太郎");
    await emailInput.fill("tanaka@example.com");
    await messageInput.fill("これはE2Eテストからのメッセージです。");

    // フォームを送信
    await submitButton.click();

    // ローディング状態の確認
    await expect(submitButton).toBeDisabled();
    await expect(submitButton.getByTestId("loading-spinner")).toBeVisible();

    // 成功画面の確認（2秒待機）
    await expect(page.getByTestId("success-title")).toBeVisible({ timeout: 3000 });
    await expect(page.getByTestId("success-message")).toHaveText(
      "お問い合わせを受け付けました。ありがとうございます！"
    );

    // リセットボタンをクリックして元のフォームに戻る
    await page.getByTestId("reset-button").click();
    await expect(page.getByTestId("form-title")).toBeVisible();
  });

  test("should test contact form validation", async ({ page }) => {
    const submitButton = page.getByTestId("submit-button");

    // 空のフォームで送信
    await submitButton.click();

    // エラーメッセージの確認
    await expect(page.getByTestId("name-error")).toHaveText("名前は必須です");
    await expect(page.getByTestId("email-error")).toHaveText("メールアドレスは必須です");
    await expect(page.getByTestId("message-error")).toHaveText("メッセージは必須です");

    // 無効なメールアドレスのテスト
    await page.getByTestId("email-input").fill("invalid-email");
    await submitButton.click();
    await expect(page.getByTestId("email-error")).toHaveText(
      "有効なメールアドレスを入力してください"
    );

    // 短すぎるメッセージのテスト
    await page.getByTestId("message-input").fill("短い");
    await submitButton.click();
    await expect(page.getByTestId("message-error")).toHaveText(
      "メッセージは10文字以上で入力してください"
    );
  });

  test("should test navigation links", async ({ page }) => {
    // ホームページリンクのテスト
    const homeLink = page.getByTestId("home-link");
    await expect(homeLink).toBeVisible();
    await homeLink.click();

    // ホームページに遷移することを確認
    await expect(page).toHaveURL("/");
    await expect(page.getByTestId("home-title")).toBeVisible();

    // テストページに戻る
    await page.goto("/test-page");
    await expect(page.getByTestId("page-title")).toBeVisible();
  });

  test("should be accessible on mobile devices", async ({ page }) => {
    // モバイルサイズに変更
    await page.setViewportSize({ width: 375, height: 667 });

    // 主要要素が表示されることを確認
    await expect(page.getByTestId("page-title")).toBeVisible();
    await expect(page.getByTestId("buttons-section-title")).toBeVisible();
    await expect(page.getByTestId("contact-section-title")).toBeVisible();

    // モバイルでもボタンが操作可能であることを確認
    await page.getByTestId("primary-button").click();
    await page.getByTestId("increment-button").click();
    await expect(page.locator("#click-count")).toHaveText("1");
  });

  test("should handle keyboard navigation", async ({ page }) => {
    const primaryButton = page.getByTestId("primary-button");

    // ボタンにフォーカスを当てる
    await primaryButton.focus();

    // ボタンにフォーカスが当たることを確認
    await expect(primaryButton).toBeFocused();

    // Enterキーでボタンを押下
    await page.keyboard.press("Enter");

    // クリックされたことを確認（視覚的変化がないため、基本的な動作確認のみ）
    await expect(primaryButton).toBeVisible();
  });
});
