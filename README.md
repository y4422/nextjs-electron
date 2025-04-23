# Next.js + Electron 電卓アプリ

Next.jsのApp RouterとTailwind CSSを使用した、モダンでシンプルな電卓アプリケーションです。

## 特徴

- Next.js App Router
- Tailwind CSS
- Electron
- モダンなUI設計
- レスポンシブデザイン

## インストール

```bash
npm install
```

## 使い方

開発モードで実行:

```bash
npm run dev
```

このコマンドは、Next.jsの開発サーバーとElectronアプリケーションを同時に起動します。

アプリケーションをビルド:

```bash
npm run build
```

パッケージング:

```bash
npm run pack
```

## プロジェクト構造

- `app/` - Next.js App Router
  - `components/` - Reactコンポーネント
    - `Calculator.js` - 電卓の主要コンポーネント
  - `globals.css` - グローバルスタイル
  - `layout.js` - レイアウトコンポーネント
  - `page.js` - メインページ
- `main.js` - Electronのメインプロセスファイル
- `preload.js` - Electronプリロードスクリプト
- `resources/` - ビルドリソース

## 技術スタック

- React 18
- Next.js 13
- Tailwind CSS 3
- Electron 22
- Electron Builder

## 機能

- 基本的な計算機能 (+, -, ×, ÷)
- パーセント計算
- 正負切り替え
- 小数点対応
- クリア機能

## ライセンス

ISC 