# Next.js + Electron 電卓アプリ

Next.jsのApp RouterとTailwind CSSを使用したElectron電卓アプリです。

## 特徴

- Next.js App Router
- Tailwind CSS
- Electron

## インストール

```bash
npm install
```

## 使い方

開発モードで実行:

```bash
npm run dev
```

アプリケーションをビルド:

```bash
npm run dist
```

## プロジェクト構造

- `app/` - Next.js App Router
  - `components/` - Reactコンポーネント
  - `globals.css` - グローバルスタイル
  - `layout.js` - レイアウトコンポーネント
  - `page.js` - メインページ
- `electron/` - Electronのメインプロセスファイル 