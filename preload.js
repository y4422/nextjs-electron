const { contextBridge, ipcRenderer } = require("electron");

// 安全なAPIをレンダラープロセスに公開
contextBridge.exposeInMainWorld("electronAPI", {
    // アプリのバージョン情報を取得
    getAppVersion: () => process.env.npm_package_version,
    
    // 受信: 特定のチャンネルでメッセージを受け取る
    on: (channel, callback) => {
        // 安全のために許可されたチャンネルのみをリッスン
        const validChannels = ["message-from-main"];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => callback(...args));
        }
    },
    
    // 送信: 特定のチャンネルにメッセージを送信
    send: (channel, data) => {
        // 安全のために許可されたチャンネルのみに送信
        const validChannels = ["message-to-main"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    }
}); 