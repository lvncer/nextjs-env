# Next.Js Enviroment Template

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

- 参考 url: [Next.js に Prettier を導入して設定する](https://zenn.dev/shimakaze_soft/articles/57642e22124968)
- 参考 url: [Next.jsプロジェクトでのESLintとPrettier設定方法](https://imakyo.net/blog/eslint-and-prettier-setup)

### Install Packages

```cmd
npm install -D prettier eslint-plugin-prettier eslint-config-prettier @typescript-eslint/eslint-plugin
```

### Setting files

- .prettierrc OR .prettier.json OR prettier.config.js OR .prettier.js
- .prettierignore
- .eslintrc.js

### Edit Files

- 参考 url: [Options](https://prettier.io/docs/options.html)
- 参考 url: [Ignoring Code](https://prettier.io/docs/ignore)

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

##
