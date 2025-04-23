import React from 'react';
import './globals.css';

export const metadata = {
    title: '電卓アプリ',
    description: 'Next.js + Electron で作成した電卓アプリ',
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
    return (
        <html lang="ja">
            <body>
                <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-8">
                    <h1 className="text-2xl font-normal text-white mb-6">
                        電卓アプリ
                    </h1>
                    {children}
                </div>
            </body>
        </html>
    );
} 