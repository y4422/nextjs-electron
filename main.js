// Electronメインプロセスファイル
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// メインウィンドウの参照をグローバルに保持
let mainWindow = null;

// メインウィンドウを作成する関数
function createWindow() {
  // ブラウザウィンドウを作成
  mainWindow = new BrowserWindow({
    width: 350,
    height: 550,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 開発モードと本番モードでの読み込み先を分ける
  if (app.isPackaged) {
    // 本番モードではoutディレクトリのindex.htmlを読み込む
    const startUrl = url.format({
      pathname: path.join(__dirname, './out/index.html'),
      protocol: 'file:',
      slashes: true
    });
    
    // ベースディレクトリを設定してCSSとJavaScriptが正しく読み込まれるようにする
    mainWindow.loadURL(startUrl);
    
    // ページが読み込まれた後にベースURLを設定する
    mainWindow.webContents.on('did-finish-load', () => {
      // 相対パスの解決を助けるスクリプトを実行
      mainWindow.webContents.executeJavaScript(`
        const baseEl = document.createElement('base');
        baseEl.href = 'file://${path.join(__dirname, './out/').replace(/\\/g, '/')}/';
        document.head.prepend(baseEl);
        console.log('Base URL set to:', baseEl.href);
      `);
    });
  } else {
    // 開発モードではlocalhostを読み込む
    mainWindow.loadURL('http://localhost:3000');
    // 開発者ツールを開く
    mainWindow.webContents.openDevTools();
  }

  // ウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// アプリの起動処理
app.whenReady().then(() => {
  createWindow();
});

// すべてのウィンドウが閉じられたときの処理
app.on('window-all-closed', () => {
  app.quit();
});

// MacOSの場合の再起動処理
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});