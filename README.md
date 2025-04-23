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
- API機能とテストツール

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

## API機能

このアプリケーションには、Next.jsのAPI RoutesとElectronのIPC通信を利用したAPIテスト機能が含まれています。
開発環境とビルド後の実行環境の両方でAPIをテストできるようになっています。

### APIエンドポイント

#### GET /api/hello

シンプルなGET APIエンドポイントで、以下のようなレスポンスを返します：

```json
{
  "message": "こんにちは！APIが正常に動作しています",
  "timestamp": "2023-06-01T12:34:56.789Z",
  "status": "success"
}
```

#### POST /api/hello

リクエストボディを受け取って、そのデータと一緒にレスポンスを返します：

```json
{
  "message": "POSTリクエストを受け取りました",
  "receivedData": {
    "key": "value"
  },
  "timestamp": "2023-06-01T12:34:56.789Z",
  "status": "success"
}
```

### APIテストツール

アプリケーションには、APIをテストするための専用UIコンポーネントが含まれています：

- **GET APIテスト**: GETリクエストでAPIを呼び出し、レスポンスを表示します
- **POST APIテスト**: JSONデータをPOSTリクエストで送信し、レスポンスを表示します

#### Electron環境での動作

Electronアプリケーションでは、パッケージ化された環境でもAPIが動作するよう、IPC通信を使用してAPIリクエストを処理しています。
アプリケーションは実行環境を自動的に検出し、適切な方法でAPIリクエストを処理します：

- ブラウザ環境: 通常のfetch APIを使用してNext.jsのAPIルートにアクセス
- Electron環境: IPC通信を使用してメインプロセスと通信

## プロジェクト構造

- `app/` - Next.js App Router
  - `components/` - Reactコンポーネント
    - `Calculator.tsx` - 電卓の主要コンポーネント
    - `ApiTest.tsx` - APIテスト用コンポーネント
  - `api/` - Next.js API Routes
    - `hello/` - サンプルAPI
      - `route.ts` - APIハンドラー
  - `globals.css` - グローバルスタイル
  - `layout.tsx` - レイアウトコンポーネント
  - `page.tsx` - メインページ
- `main.ts` - Electronのメインプロセスファイル（APIハンドラーを含む）
- `preload.ts` - Electronプリロードスクリプト（IPC通信の橋渡し）
- `electron.d.ts` - Electron用の型定義
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
- APIテスト機能（GET/POST）

## ライセンス

ISC 