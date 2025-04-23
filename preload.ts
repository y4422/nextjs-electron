import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

// APIの型定義
interface ElectronAPI {
    getAppVersion: () => string | undefined;
    on: (channel: string, callback: (...args: any[]) => void) => void;
    send: (channel: string, data: any) => void;
    apiRequest: {
        hello: {
            get: () => Promise<any>;
            post: (data: any) => Promise<any>;
        }
    };
}

// 安全なAPIをレンダラープロセスに公開
contextBridge.exposeInMainWorld("electronAPI", {
    // アプリのバージョン情報を取得
    getAppVersion: (): string | undefined => process.env.npm_package_version,

    // 受信: 特定のチャンネルでメッセージを受け取る
    on: (channel: string, callback: (...args: any[]) => void): void => {
        // 安全のために許可されたチャンネルのみをリッスン
        const validChannels: string[] = ["message-from-main"];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (_event: IpcRendererEvent, ...args: any[]) => callback(...args));
        }
    },

    // 送信: 特定のチャンネルにメッセージを送信
    send: (channel: string, data: any): void => {
        // 安全のために許可されたチャンネルのみに送信
        const validChannels: string[] = ["message-to-main"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },

    // API リクエスト
    apiRequest: {
        hello: {
            get: () => ipcRenderer.invoke('api:hello:get'),
            post: (data: any) => ipcRenderer.invoke('api:hello:post', data)
        }
    }
} as ElectronAPI); 