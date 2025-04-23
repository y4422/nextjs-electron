interface ElectronAPI {
    getAppVersion: () => string | undefined;
    on: (channel: string, callback: (...args: any[]) => void) => void;
    send: (channel: string, data: any) => void;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
} 