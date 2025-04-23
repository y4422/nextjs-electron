# Next.js + Electron 電卓アプリ

Next.jsのApp RouterとTailwind CSSを使用した、モダンでシンプルな電卓アプリケーションです。TypeScriptで実装されています。

## 特徴

- Next.js App Router
- Tailwind CSS
- Electron
- TypeScript
- モダンなUI設計
- レスポンシブデザイン
- マルチアーキテクチャ対応（ARM64, x64）

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

型チェック:

```bash
npm run type-check
```

アプリケーションをビルド:

```bash
npm run build
```

パッケージング:

```bash
npm run pack
```

## ビルドオプション

複数のアーキテクチャとプラットフォーム向けにビルドできます：

- **全プラットフォーム向けビルド**: `npm run build:all`
- **macOS向けビルド**: `npm run build:mac` (ARM64, x64)
- **Windows向けビルド**: `npm run build:win` (x64, ia32)
- **Linux向けビルド**: `npm run build:linux` (ARM64, x64)

ビルドされたアプリは `dist` ディレクトリに出力されます。ファイル名には対象のアーキテクチャ情報が含まれます。

## プロジェクト構造

- `app/` - Next.js App Router
  - `components/` - Reactコンポーネント
    - `Calculator.tsx` - 電卓の主要コンポーネント
  - `globals.css` - グローバルスタイル
  - `layout.tsx` - レイアウトコンポーネント
  - `page.tsx` - メインページ
- `main.ts` - Electronのメインプロセスファイル
- `preload.ts` - Electronプリロードスクリプト
- `resources/` - ビルドリソース
- `tsconfig.json` - Next.js用TypeScript設定
- `tsconfig.electron.json` - Electron用TypeScript設定

## 技術スタック

- React 18
- Next.js 13
- TypeScript
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