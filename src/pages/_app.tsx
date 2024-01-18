import '../styles/globals.css';
import '../styles/prose.css';
import '../styles/highlight-js/github.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
