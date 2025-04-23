'use client';

import React from 'react';
import Calculator from './components/Calculator';
import ApiTest from './components/ApiTest';

export default function Home(): React.ReactElement {
    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Electron + Next.js アプリ</h1>

            {/* APIテストコンポーネント */}
            <div className="mb-8">
                <ApiTest />
            </div>

            {/* 電卓コンポーネント */}
            <div>
                <Calculator />
            </div>
        </main>
    );
} 