"use client";

import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/Button";
import Link from "next/link";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="page-title">
            テストページ
          </h1>
          <p className="text-xl text-gray-600" data-testid="page-description">
            このページはE2Eテスト用のサンプルページです
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2
              className="text-2xl font-semibold text-gray-900 mb-4"
              data-testid="buttons-section-title"
            >
              ボタンコンポーネントテスト
            </h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" data-testid="primary-button">
                  プライマリ
                </Button>
                <Button variant="secondary" data-testid="secondary-button">
                  セカンダリ
                </Button>
                <Button variant="danger" data-testid="danger-button">
                  危険
                </Button>
                <Button variant="ghost" data-testid="ghost-button">
                  ゴースト
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="sm" data-testid="small-button">
                  小
                </Button>
                <Button size="md" data-testid="medium-button">
                  中
                </Button>
                <Button size="lg" data-testid="large-button">
                  大
                </Button>
              </div>

              <div className="space-y-2">
                <Button loading data-testid="loading-button">
                  ローディング中
                </Button>
                <Button disabled data-testid="disabled-button">
                  無効化されたボタン
                </Button>
                <Button fullWidth data-testid="full-width-button">
                  全幅ボタン
                </Button>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2
              className="text-2xl font-semibold text-gray-900 mb-4"
              data-testid="interaction-section-title"
            >
              インタラクションテスト
            </h2>
            <div className="space-y-4">
              <div data-testid="click-counter">
                <p className="text-sm text-gray-600">
                  クリック回数: <span id="click-count">0</span>
                </p>
                <Button
                  onClick={() => {
                    const countElement = document.getElementById("click-count");
                    if (countElement) {
                      const count = parseInt(countElement.textContent || "0") + 1;
                      countElement.textContent = count.toString();
                    }
                  }}
                  data-testid="increment-button"
                >
                  クリック
                </Button>
              </div>

              <div data-testid="toggle-visibility">
                <Button
                  onClick={() => {
                    const element = document.getElementById("toggle-target");
                    if (element) {
                      element.classList.toggle("hidden");
                    }
                  }}
                  data-testid="toggle-button"
                >
                  表示/非表示切り替え
                </Button>
                <div id="toggle-target" className="mt-2 p-2 bg-blue-100 text-blue-800 rounded">
                  <p data-testid="toggle-content">この要素の表示/非表示が切り替わります</p>
                </div>
              </div>

              <div data-testid="input-test">
                <input
                  type="text"
                  placeholder="テキストを入力してください"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-testid="text-input"
                />
              </div>
            </div>
          </section>
        </div>

        <section className="mb-12">
          <h2
            className="text-2xl font-semibold text-gray-900 mb-6 text-center"
            data-testid="contact-section-title"
          >
            お問い合わせフォーム
          </h2>
          <ContactForm />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2
            className="text-2xl font-semibold text-gray-900 mb-4"
            data-testid="navigation-section-title"
          >
            ナビゲーションテスト
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              以下のリンクでページ間のナビゲーションをテストできます：
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 underline"
                data-testid="home-link"
              >
                ホームページ
              </Link>
              <a
                href="/test-page"
                className="text-blue-600 hover:text-blue-800 underline"
                data-testid="test-page-link"
              >
                テストページ（現在のページ）
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
