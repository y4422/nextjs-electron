import Calculator from '../../app/components/Calculator';
import Head from 'next/head';

export default function Home() {
    return (
        <div style={{
            padding: '30px',
            minHeight: '100vh',
            backgroundColor: '#121212',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Head>
                <title>電卓アプリ</title>
                <meta name="description" content="Next.js + Electron 電卓アプリ" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1 style={{
                color: 'white',
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: 'normal'
            }}>
                電卓アプリ
            </h1>

            <Calculator />
        </div>
    );
} 