import '../styles/globals.css';
import '../styles/prose.css';
import '../styles/highlight-js/github.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            {/*<Head>
                <title>K - log</title>
                <meta name='description' content='열심히 배우겠습니다.' />
            </Head>
    <main className={inter.className + 'dark: bg-zinc-700'}>*/}
            <Component {...pageProps} />;{/*</main>*/}
        </>
    );
}

export default MyApp;
