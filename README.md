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
7. **🚀 Deploy Preview** - PR時プレビューデプロイ (✅ 設定完了)
8. **🚀 Deploy Production** - main branchへの自動デプロイ (✅ 設定完了)

> **📝 Note**: デプロイ機能はすべて設定済みです。Vercelとの連携設定方法は下記をご参照ください。

### Test Pages

開発・テスト用のページ:

- **ホームページ (`/`)**: 既存のサンプルページ
- **テストページ (`/test-page`)**: E2Eテスト用の統合ページ
  - ボタンコンポーネントテスト
  - インタラクション機能テスト
  - お問い合わせフォーム
  - ナビゲーションテスト

## Vercel デプロイ設定

🚀 **自動デプロイ完全対応** - GitHub Actions + Vercel連携

### 1. Vercelプロジェクトの準備

#### Vercelアカウント作成・ログイン

```bash
# Vercel CLIをインストール
npm i -g vercel

# Vercelにログイン
vercel login

# プロジェクトを初期化（GitHubリポジトリをインポート）
vercel
```

#### 必要な情報を取得

```bash
# プロジェクト情報を表示
vercel project ls

# 組織情報を表示
vercel teams ls
```

### 2. GitHubシークレット設定

GitHubリポジトリの **Settings > Secrets and variables > Actions** で以下を設定：

#### 必須シークレット

| Name                | Value                 | 取得方法                                                                  |
| ------------------- | --------------------- | ------------------------------------------------------------------------- |
| `VERCEL_TOKEN`      | Personal Access Token | [Vercel Account Settings](https://vercel.com/account/tokens)              |
| `VERCEL_ORG_ID`     | Team/Organization ID  | `vercel teams ls` または [Vercel Dashboard](https://vercel.com/dashboard) |
| `VERCEL_PROJECT_ID` | Project ID            | `.vercel/project.json` または Vercel Dashboard で確認                     |

#### VERCEL_TOKEN取得手順

1. [Vercel Account Settings](https://vercel.com/account/tokens) にアクセス
2. **Create Token** をクリック
3. Token名を入力（例: `GitHub-Actions-Deploy`）
4. Scope: **Full Account** を選択
5. 生成されたトークンをコピーしてGitHubシークレットに設定

#### VERCEL_ORG_ID取得手順

```bash
# CLI経由で確認
vercel teams ls

# または、Vercel Dashboard > Settings > General > Team ID をコピー
```

#### VERCEL_PROJECT_ID取得手順

```bash
# 方法1: プロジェクトリンク後に生成されるファイルから確認
# プロジェクトディレクトリで以下を実行してプロジェクトをリンク
vercel login
vercel --confirm

# リンク完了後、.vercel/project.json ファイルが生成される
cat .vercel/project.json
# 出力例: {"orgId":"team_xxx","projectId":"prj_xxx"}

# 方法2: Vercel Dashboard で確認
# 1. https://vercel.com/dashboard にアクセス
# 2. プロジェクトを選択
# 3. Settings > General > Project ID をコピー

# 方法3: Vercel CLI（詳細表示）
vercel project ls --format json | jq '.[0].id'
```

### 3. デプロイフロー

#### プレビューデプロイ（PR作成時）

```bash
# プルリクエスト作成時に自動実行
# ✅ Lint & Format Check
# ✅ Unit & Integration Tests
# ✅ Build Application
# ✅ TypeScript Type Check
# 🚀 Deploy Preview to Vercel
```

#### プロダクションデプロイ（main merge時）

```bash
# main branchへのpush時に自動実行
# ✅ 全テストスイート（Unit + Integration + E2E）
# ✅ Security Audit
# ✅ Build Application
# 🚀 Deploy Production to Vercel
```

### 4. デプロイ確認

#### GitHub Actionsログ確認

```
🎉 CI/CD Pipeline completed successfully!
✅ All tests passed
🧪 60 Unit & Integration tests: PASSED
🎭 85 E2E tests: PASSED
🛡️ Security audit: PASSED
📝 TypeScript check: PASSED
🚀 Production deployment: SUCCESS
```

#### Vercelダッシュボード確認

- [Vercel Dashboard](https://vercel.com/dashboard) でデプロイ状況確認
- プレビューURL・プロダクションURLが自動生成
- デプロイログとパフォーマンス情報を閲覧可能

### 5. トラブルシューティング

#### よくあるエラー

| エラー              | 原因                       | 解決方法                                                 |
| ------------------- | -------------------------- | -------------------------------------------------------- |
| `Invalid token`     | VERCEL_TOKEN が無効        | 新しいトークンを生成して再設定                           |
| `Project not found` | VERCEL_PROJECT_ID が間違い | `.vercel/project.json` または Dashboard で正しいIDを確認 |
| `Team not found`    | VERCEL_ORG_ID が間違い     | `vercel teams ls` で正しいIDを確認                       |
| `Build failed`      | Next.js Build エラー       | ローカルで `npm run build` してエラー修正                |

#### デプロイ失敗時の確認手順

1. **GitHub Actions ログ確認**

   ```
   Actions > 失敗したワークフロー > 🚀 Deploy to Production
   ```

2. **Vercel Build ログ確認**

   ```
   Vercel Dashboard > Project > Functions > Build Logs
   ```

3. **ローカルビルドテスト**
   ```bash
   npm run build
   npm start
   ```

### 6. 高度な設定

#### 環境変数の設定

```bash
# Vercel環境変数設定
vercel env add NEXT_PUBLIC_API_URL
vercel env add DATABASE_URL
```

#### カスタムドメイン設定

```bash
# カスタムドメイン追加
vercel domains add yourdomain.com
```

#### Performance Monitoring

- Vercel Analytics自動有効化
- Core Web Vitals測定
- Real User Monitoring (RUM)

---

🎯 **Quick Start**: GitHubシークレット3つ（VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID）を設定するだけで、完全自動デプロイが開始されます！
