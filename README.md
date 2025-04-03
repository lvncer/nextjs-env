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

- prettier.config.js (example)

  ```js
  module.exports = {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    quoteProps: "as-needed",
    jsxSingleQuote: false,
    trailingComma: "es5",
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "always",
    proseWrap: "preserve",
    htmlWhitespaceSensitivity: "css",
    endOfLine: "lf",
    embeddedLanguageFormatting: "off",
  };
  ```

- .prettierignore (exaple)

  ```ignorefile
  # Ignore artifacts:
  build
  coverage

  # Ignore all HTML files:
  **/*.html

  .next/*
  env/*
  node_modules/*
  public/*
  ```

- .eslintrc.js

  ```js
  module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    extends: [
      "plugin:@typescript-eslint/recommended",
      "next/core-web-vitals",
      "plugin:prettier/recommended",
    ],
    plugins: ["@typescript-eslint"],
    rules: {},
  };
  ```

- package.json (scripts alias)

  ```json
  "format": "prettier --write ."
  ```

### Husky and lint-staged
