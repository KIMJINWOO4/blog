import Head from 'next/head';
import '../styles/globals.css';
import '../styles/prose.css';
import '../styles/highlight-js/github.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <meta property='og:title' content="Jinwoo's Blog" />
                <meta property='og:url' content='https://jinwoo-blog.netlify.app/' />
                <meta
                    property='og:image'
                    content='https://i.namu.wiki/i/3rb0DYHj8O96xWQap8mHVJL3AaZ_7PGYzo8wc5O_uVb8rORBqU3Erq3oYsnLY-q-bohkT1nIZNhK6dxH2myQaw.webp'
                />
                <meta property='og:description' content='진우의 개발 블로그입니다.' />
                <title>진우의 블로그</title>
                <link rel='shortcut icon' type='image/x-icon' href='../components/icons/blog-solid.png'></link>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
