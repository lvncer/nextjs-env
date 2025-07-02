# Next.Js Environment Template

🚀 **Production Ready** - Prettier + Husky + Lint-staged + 完全テスト環境構築済み

- ✅ **Code Quality**: Husky 9.1.7 + lint-staged 16.1.2 (最新版)
- ✅ **Testing**: 145テスト成功 (Vitest + Playwright)
- ✅ **CI/CD**: GitHub Actions完全設定済み

## Installation

```cmd
npx create-next-app@latest
```

```cmd
√ Would you like to use TypeScript? ... No / Yes
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like your code inside a `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to use Turbopack for `next dev`? ... No / Yes
√ Would you like to customize the import alias (`@/*` by default)? ... No / Yes
√ What import alias would you like configured? ... @/*
```

## Install Prettier

### Install Packages

```cmd
npm install -D prettier eslint-plugin-prettier eslint-config-prettier @typescript-eslint/eslint-plugin
```

### Setting files

- .prettierrc OR .prettier.json OR prettier.config.js OR .prettier.js
- .prettierignore
- .eslintrc.js

## Install Husky + lint-staged

Git commitの前に自動でPrettierとESLintを実行してコード品質を保つ設定

### Install Packages

```cmd
npm install --save-dev husky@9.1.7 lint-staged@16.1.2
```

### Initialize Husky

```cmd
npx husky init
```

### Configuration

`package.json` に以下の設定が自動追加される：

```json
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

### Pre-commit Hook

`.husky/pre-commit` ファイル：

```bash
npx lint-staged
```

### 動作内容

- コミット時に変更されたファイルのみをチェック
- TypeScript/JavaScript ファイル → ESLint自動修正 → Prettier整形
- JSON/CSS/Markdown ファイル → Prettier整形
- エラーがある場合はコミットを中止

## Testing Environment

✅ **包括的なテスト環境を完全構築済み** - 全145テスト成功！

- **60テスト成功**: 単体・統合・コンポーネントテスト (Vitest)
- **85テスト成功**: E2Eテスト (Playwright)
- **GitHub Actions**: CI/CDパイプライン準備完了

### Test Framework Stack

- **🧪 Unit Testing**: Vitest 3.x (最新版)
- **🔗 Integration Testing**: Testing Library + Vitest
- **🎭 E2E Testing**: Playwright (最新版)
- **🚀 CI/CD**: GitHub Actions

### Testing Commands

```bash
# 単体・統合テスト
npm run test              # ウォッチモード
npm run test:run          # 1回実行
npm run test:coverage     # カバレッジ付き
npm run test:ui           # UIモード

# E2Eテスト
npm run e2e               # E2Eテスト実行
npm run e2e:ui            # PlaywrightのUIモード
npm run e2e:headed        # ブラウザ表示でテスト
npm run e2e:debug         # デバッグモード
```

### Test Structure

```sh
src/
├── lib/
│   ├── utils.ts           # ユーティリティ関数
│   └── utils.test.ts      # 単体テスト
├── components/
│   ├── Button.tsx         # Reactコンポーネント
│   ├── Button.test.tsx    # コンポーネントテスト
│   ├── ContactForm.tsx    # フォームコンポーネント
│   └── ContactForm.test.tsx # 統合テスト
├── hooks/
│   ├── useCounter.ts      # カスタムフック
│   └── useCounter.test.ts # フックテスト
└── test/
    └── setup.ts           # テストセットアップ

e2e/
├── homepage.spec.ts       # ホームページE2E
└── test-page.spec.ts      # テストページE2E
```

### Test Coverage

- ✅ **単体テスト**: ユーティリティ関数、カスタムフック
- ✅ **コンポーネントテスト**: Button、ContactForm
- ✅ **統合テスト**: フォーム送信フロー、バリデーション
- ✅ **E2Eテスト**: ユーザーフロー、ページ遷移、レスポンシブ対応

### CI/CD Pipeline

🚀 **GitHub Actions完全設定済み** - `.github/workflows/ci.yml`

自動実行されるテストスイート:

1. **🔍 Lint & Format Check** - ESLint・Prettier (✅ 通過確認済み)
2. **🧪 Unit & Integration Tests** - Vitest (✅ 60テスト成功)
3. **🏗️ Build Application** - Next.js (✅ ビルド成功確認済み)
4. **🎭 E2E Tests** - Playwright (✅ 85テスト成功)
5. **🛡️ Security Audit** - npm audit・audit-ci
6. **📝 TypeScript Type Check** - tsc (✅ 型チェック通過)
7. **🚀 Deploy Preview** - PR時プレビューデプロイ (🚫 現在無効化)
8. **🚀 Deploy Production** - main branchへの自動デプロイ (🚫 現在無効化)

> **📝 Note**: デプロイ機能は準備済みですが、Vercelシークレット未設定のため現在無効化されています。

### Test Pages

開発・テスト用のページ:

- **ホームページ (`/`)**: 既存のサンプルページ
- **テストページ (`/test-page`)**: E2Eテスト用の統合ページ
  - ボタンコンポーネントテスト
  - インタラクション機能テスト
  - お問い合わせフォーム
  - ナビゲーションテスト
