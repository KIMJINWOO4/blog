import '../styles/globals.css';
import '../styles/prose.css';
import '../styles/highlight-js/github.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
    return <Component className={inter.className + 'dark: bg-zinc-700'} {...pageProps} />;
}

export default MyApp;
