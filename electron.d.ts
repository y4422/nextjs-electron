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

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
} 