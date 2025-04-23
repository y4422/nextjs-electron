// Electronメインプロセスファイル
import { app, BrowserWindow, ipcMain, protocol, net } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

// メインウィンドウの参照をグローバルに保持
let mainWindow: BrowserWindow | null = null;

// メインウィンドウを作成する関数
function createWindow(): void {
    // ブラウザウィンドウを作成
    mainWindow = new BrowserWindow({
        width: 350,
        height: 550,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            // ビルド時にはdistディレクトリ内のJSファイルを参照する
            preload: path.join(__dirname, app.isPackaged ? 'preload.js' : '../dist/preload.js')
        }
    });

    // 開発モードと本番モードでの読み込み先を分ける
    if (app.isPackaged) {
        // 本番モードではoutディレクトリのindex.htmlを読み込む
        // extraResourcesを使用したパス
        const resourcePath = process.platform === 'darwin'
            ? path.join(app.getAppPath(), '..', '..', 'Resources', 'out')
            : path.join(app.getAppPath(), '..', 'Resources', 'out');

        const indexPath = path.join(resourcePath, 'index.html');

        // ファイルの存在確認
        console.log('Resource Path:', resourcePath);
        console.log('Index Path:', indexPath);
        console.log('File exists:', fs.existsSync(indexPath));

        const startUrl = url.format({
            pathname: indexPath,
            protocol: 'file:',
            slashes: true
        });

        // デバッグログを追加
        console.log('Loading URL:', startUrl);
        console.log('Current directory:', __dirname);
        console.log('App path:', app.getAppPath());

        // ベースディレクトリを設定してCSSとJavaScriptが正しく読み込まれるようにする
        mainWindow.loadURL(startUrl);

        // 開発者ツールを開いてデバッグ
        mainWindow.webContents.openDevTools();

        // ページが読み込まれた後にベースURLを設定する
        mainWindow.webContents.on('did-finish-load', () => {
            // nullチェックを追加
            if (mainWindow) {
                // 相対パスの解決を助けるスクリプトを実行
                mainWindow.webContents.executeJavaScript(`
                    const baseEl = document.createElement('base');
                    baseEl.href = 'file://${resourcePath.replace(/\\/g, '/')}/';
                    document.head.prepend(baseEl);
                    console.log('Base URL set to:', baseEl.href);
                `);
            }
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
    setupApiHandlers();
});

// APIハンドラーのセットアップ
function setupApiHandlers() {
    // HelloAPIのGETハンドラー
    ipcMain.handle('api:hello:get', async () => {
        try {
            return {
                message: 'こんにちは！APIが正常に動作しています',
                timestamp: new Date().toISOString(),
                status: 'success'
            };
        } catch (error) {
            console.error('API GET error:', error);
            return {
                message: 'エラーが発生しました',
                error: (error as Error).message,
                status: 'error'
            };
        }
    });

    // HelloAPIのPOSTハンドラー
    ipcMain.handle('api:hello:post', async (_event, data) => {
        try {
            return {
                message: 'POSTリクエストを受け取りました',
                receivedData: data,
                timestamp: new Date().toISOString(),
                status: 'success'
            };
        } catch (error) {
            console.error('API POST error:', error);
            return {
                message: 'エラーが発生しました',
                error: (error as Error).message,
                status: 'error'
            };
        }
    });
}

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