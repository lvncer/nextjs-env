import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

describe("ContactForm Integration", () => {
  it("renders contact form with all required fields", () => {
    render(<ContactForm />);

    expect(screen.getByTestId("form-title")).toHaveTextContent("お問い合わせ");
    expect(screen.getByTestId("name-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("validates required fields and shows error messages", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("name-error")).toHaveTextContent("名前は必須です");
      expect(screen.getByTestId("email-error")).toHaveTextContent("メールアドレスは必須です");
      expect(screen.getByTestId("message-error")).toHaveTextContent("メッセージは必須です");
    });
  });

  it("validates email format", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const messageInput = screen.getByTestId("message-input");
    const submitButton = screen.getByTestId("submit-button");

    // 名前とメッセージは有効な値を入力し、メールのみ無効な形式を入力
    await user.type(nameInput, "田中太郎");
    await user.type(emailInput, "invalid-email");
    await user.type(messageInput, "これはテストメッセージです。");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("email-error")).toHaveTextContent(
        "有効なメールアドレスを入力してください"
      );
    });
  });

  it("validates message minimum length", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const messageInput = screen.getByTestId("message-input");
    const submitButton = screen.getByTestId("submit-button");

    // 名前とメールは有効な値を入力し、メッセージのみ短く入力
    await user.type(nameInput, "田中太郎");
    await user.type(emailInput, "tanaka@example.com");
    await user.type(messageInput, "短い");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("message-error")).toHaveTextContent(
        "メッセージは10文字以上で入力してください"
      );
    });
  });

  it("clears errors when user starts typing", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByTestId("name-input");
    const submitButton = screen.getByTestId("submit-button");

    // エラーを発生させる
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("name-error")).toBeInTheDocument();
    });

    // 入力を開始するとエラーがクリアされる
    await user.type(nameInput, "田中");

    await waitFor(() => {
      expect(screen.queryByTestId("name-error")).not.toBeInTheDocument();
    });
  });

  it("submits form successfully with valid data", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const messageInput = screen.getByTestId("message-input");
    const submitButton = screen.getByTestId("submit-button");

    // 有効なデータを入力
    await user.type(nameInput, "田中太郎");
    await user.type(emailInput, "tanaka@example.com");
    await user.type(messageInput, "これはテストメッセージです。");

    // フォームを送信
    await user.click(submitButton);

    // ローディング状態をチェック
    expect(screen.getByTestId("submit-button")).toBeDisabled();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    // 成功画面をチェック（少し待機）
    await waitFor(
      () => {
        expect(screen.getByTestId("success-title")).toHaveTextContent("送信完了");
        expect(screen.getByTestId("success-message")).toHaveTextContent(
          "お問い合わせを受け付けました。ありがとうございます！"
        );
      },
      { timeout: 3000 }
    );
  });

  it("allows user to reset and send another message", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // フォームを送信
    await user.type(screen.getByTestId("name-input"), "田中太郎");
    await user.type(screen.getByTestId("email-input"), "tanaka@example.com");
    await user.type(screen.getByTestId("message-input"), "これはテストメッセージです。");
    await user.click(screen.getByTestId("submit-button"));

    await waitFor(
      () => {
        expect(screen.getByTestId("success-title")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // リセットボタンをクリック
    await user.click(screen.getByTestId("reset-button"));

    // フォームに戻る
    await waitFor(() => {
      expect(screen.getByTestId("form-title")).toBeInTheDocument();
      expect(screen.getByTestId("name-input")).toHaveValue("");
      expect(screen.getByTestId("email-input")).toHaveValue("");
      expect(screen.getByTestId("message-input")).toHaveValue("");
    });
  });

  it("handles form accessibility correctly", () => {
    render(<ContactForm />);

    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const messageInput = screen.getByTestId("message-input");

    // ラベルとinputが正しく関連付けられている
    expect(nameInput).toHaveAttribute("id", "name");
    expect(screen.getByLabelText("名前 *")).toBe(nameInput);

    expect(emailInput).toHaveAttribute("id", "email");
    expect(screen.getByLabelText("メールアドレス *")).toBe(emailInput);

    expect(messageInput).toHaveAttribute("id", "message");
    expect(screen.getByLabelText("メッセージ *")).toBe(messageInput);
  });

  it("shows loading state during form submission", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByTestId("name-input"), "田中太郎");
    await user.type(screen.getByTestId("email-input"), "tanaka@example.com");
    await user.type(screen.getByTestId("message-input"), "これはテストメッセージです。");

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    // ローディング状態をチェック
    expect(submitButton).toBeDisabled();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.getByTestId("button-text")).toHaveTextContent("送信中...");
  });

  it("prevents multiple form submissions", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByTestId("name-input"), "田中太郎");
    await user.type(screen.getByTestId("email-input"), "tanaka@example.com");
    await user.type(screen.getByTestId("message-input"), "これはテストメッセージです。");

    const submitButton = screen.getByTestId("submit-button");

    // 最初のクリック
    await user.click(submitButton);
    expect(submitButton).toBeDisabled();

    // 2回目のクリックは無効（ボタンが無効化されているため）
    await user.click(submitButton);
    expect(submitButton).toBeDisabled();
  });
});
