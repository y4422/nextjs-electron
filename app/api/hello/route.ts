import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        message: 'こんにちは！APIが正常に動作しています',
        timestamp: new Date().toISOString(),
        status: 'success'
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        return NextResponse.json({
            message: 'POSTリクエストを受け取りました',
            receivedData: body,
            timestamp: new Date().toISOString(),
            status: 'success'
        });
    } catch (error) {
        return NextResponse.json({
            message: 'エラーが発生しました',
            error: (error as Error).message,
            status: 'error'
        }, { status: 400 });
    }
} 