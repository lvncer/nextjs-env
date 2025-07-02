import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    // ブラウザ環境をシミュレーション
    environment: "jsdom",

    // グローバル関数を使用可能にする（describe, it, expect など）
    globals: true,

    // セットアップファイルの指定
    setupFiles: ["./src/test/setup.ts"],

    // テストファイルのパターン
    include: [
      "src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "__tests__/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],

    // 除外するファイル
    exclude: ["node_modules", "dist", ".next", "out", "coverage", "e2e"],

    // カバレッジ設定
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/setup.ts",
        "**/*.d.ts",
        "**/*.config.*",
        "src/app/layout.tsx",
        "src/app/globals.css",
        ".next/",
        "out/",
        "dist/",
      ],
    },

    // 並列実行の設定
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
