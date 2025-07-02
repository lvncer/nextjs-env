import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

// 各テスト前にクリーンアップを実行
beforeEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

// 各テスト後にクリーンアップを実行
afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

// Next.jsのルーター関連モックのグローバル設定
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// IntersectionObserver のモック
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

// ResizeObserver のモック
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));
