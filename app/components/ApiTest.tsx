'use client';

import React, { useState } from 'react';

// electronAPI型の拡張
declare global {
    interface Window {
        electronAPI?: {
            apiRequest: {
                hello: {
                    get: () => Promise<any>;
                    post: (data: any) => Promise<any>;
                }
            }
        }
    }
}

type ApiResponse = {
    message: string;
    timestamp: string;
    status: string;
    receivedData?: any;
};

export default function ApiTest(): React.ReactElement {
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [postData, setPostData] = useState('');

    // Electron環境かどうかを判定
    const isElectron = typeof window !== 'undefined' && !!window.electronAPI;

    // カスタムスタイル
    const customStyles = {
        textarea: `
            w-full p-2 border rounded-md border-gray-300 mb-2 font-mono text-sm 
            text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            placeholder-gray-500
        `,
    };

    const testGetApi = async () => {
        setLoading(true);
        setError(null);

        try {
            let data;

            if (isElectron) {
                // Electron環境の場合、IPC経由でAPIを呼び出す
                data = await window.electronAPI!.apiRequest.hello.get();
            } else {
                // ブラウザ環境の場合、通常のfetchを使用
                const res = await fetch('/api/hello');
                if (!res.ok) {
                    throw new Error(`APIリクエストエラー: ${res.status}`);
                }
                data = await res.json();
            }

            setResponse(data);
        } catch (err) {
            setError((err as Error).message);
            console.error('API呼び出しエラー:', err);
        } finally {
            setLoading(false);
        }
    };

    const testPostApi = async () => {
        setLoading(true);
        setError(null);

        try {
            // JSONとして解析できる文字列かチェック
            let jsonData = {};
            try {
                jsonData = JSON.parse(postData);
            } catch (parseErr) {
                jsonData = { text: postData }; // パースできない場合はテキストとして送信
            }

            let data;

            if (isElectron) {
                // Electron環境の場合、IPC経由でAPIを呼び出す
                data = await window.electronAPI!.apiRequest.hello.post(jsonData);
            } else {
                // ブラウザ環境の場合、通常のfetchを使用
                const res = await fetch('/api/hello', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jsonData),
                });

                if (!res.ok) {
                    throw new Error(`APIリクエストエラー: ${res.status}`);
                }

                data = await res.json();
            }

            setResponse(data);
        } catch (err) {
            setError((err as Error).message);
            console.error('API呼び出しエラー:', err);
        } finally {
            setLoading(false);
        }
    };

    // JSONを整形して表示するためのユーティリティ関数
    const formatJSON = (json: any): JSX.Element => {
        // JSONをきれいな文字列に変換
        const jsonString = JSON.stringify(json, null, 2);

        // 構造をハイライト表示するための正規表現
        const replacer = (match: string, p1: string, p2: string): string => {
            return `<span class="font-semibold text-blue-700">"${p1}"</span>${p2}`;
        };

        // JSONの構造をハイライト表示
        const highlighted = jsonString.replace(/"([^"]+)":/g, replacer);

        return (
            <div dangerouslySetInnerHTML={{ __html: highlighted }} />
        );
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
            {/* ヘッダー部分 */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-t-lg -mt-4 -mx-4 mb-4">
                <h2 className="text-xl font-bold">API動作テストツール</h2>
                <p className="text-sm opacity-80">APIの動作検証を簡単に行えます</p>
            </div>

            {/* 環境表示 */}
            <div className="mb-4 bg-blue-50 p-2 rounded-lg border border-blue-200">
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <p className="text-sm text-gray-700">
                        <span className="font-medium">実行環境:</span> {isElectron
                            ? 'Electron (IPC通信)'
                            : 'ブラウザ (API Routes)'}
                    </p>
                </div>
            </div>

            {/* GET API テスト */}
            <div className="mb-5 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h3 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">GET</span>
                    GETリクエストテスト
                </h3>
                <p className="text-sm text-gray-600 mb-3">シンプルなGETリクエストを送信してレスポンスを確認します</p>
                <button
                    onClick={testGetApi}
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 flex items-center justify-center w-full"
                >
                    {loading ? (
                        <span className="inline-flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            処理中...
                        </span>
                    ) : (
                        <span>GETリクエスト実行</span>
                    )}
                </button>
            </div>

            {/* POST API テスト */}
            <div className="mb-5 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h3 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">POST</span>
                    POSTリクエストテスト
                </h3>
                <p className="text-sm text-gray-600 mb-3">JSONデータをPOSTリクエストで送信します</p>
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">リクエストデータ (JSON):</label>
                    <textarea
                        value={postData}
                        onChange={(e) => setPostData(e.target.value)}
                        placeholder='{"key": "value"} または任意のテキスト'
                        className={customStyles.textarea}
                        rows={3}
                    />
                </div>
                <button
                    onClick={testPostApi}
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 flex items-center justify-center w-full"
                >
                    {loading ? (
                        <span className="inline-flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            処理中...
                        </span>
                    ) : (
                        <span>POSTリクエスト実行</span>
                    )}
                </button>
            </div>

            {/* エラー表示 */}
            {error && (
                <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-200">
                    <p className="font-bold text-red-700 mb-1 flex items-center">
                        <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        エラーが発生しました
                    </p>
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            {/* レスポンス表示 */}
            {response && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                    <p className="font-bold text-gray-800 mb-2 flex items-center">
                        <svg className="h-5 w-5 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        API応答
                    </p>
                    <div className="whitespace-pre-wrap overflow-x-auto bg-white p-3 rounded-md border border-gray-300 text-gray-800 text-sm mt-2 font-mono">
                        {formatJSON(response)}
                    </div>
                </div>
            )}

            {/* フッター */}
            <div className="mt-6 pt-3 border-t border-gray-200 text-xs text-gray-500 text-center">
                このツールはAPI動作確認のためのテスト用コンポーネントです
            </div>
        </div>
    );
} 