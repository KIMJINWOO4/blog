import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSeries, getPostsBySeries } from '@/lib/posts';
import { PostMetadata } from '../../../types/post';
import { motion } from 'framer-motion';
import { staggerOne, fadeInUp } from '@/constants/animations';
import Head from 'next/head';

interface SeriesPostsPageProps {
    posts: PostMetadata[];
}

const SeriesPostsPage: NextPage<SeriesPostsPageProps> = ({ posts }) => {
    const router = useRouter();
    const seriesName = router.query.seriesName as string;

    return (
        <motion.div
            initial='initial'
            animate='animate'
            exit='exit'
            className='flex flex-col min-h-screen bg-white dark:bg-zinc-700'
        >
            <Head>
                <title>Series - {seriesName}</title>
                <meta name='description' content='열심히 배우겠습니다.' />
                <meta name='google-site-verification' content='jPTIFNVfyPOTm8WUaEHm9XtinouRCPGnGOUDKdx9Szc' />
            </Head>
            <Header />
            <motion.div variants={staggerOne} className='flex-grow p-4 container mx-auto px-4 py-8 sm:p-6 max-w-4xl'>
                <motion.h1 variants={fadeInUp} className='text-3xl font-extrabold mb-6 dark:text-white font-serif'>
                    Series Name: {seriesName}
                </motion.h1>
                <motion.h3 variants={fadeInUp} className='text-xl font-bold mb-6 dark:text-white font-serif'>
                    Series Posts ({posts.length})
                </motion.h3>
                <motion.ul variants={staggerOne} className='space-y-4'>
                    {posts.map((post) => (
                        <motion.li
                            key={post.id}
                            variants={fadeInUp}
                            className='bg-gray-100 dark:bg-zinc-600 p-4 pb-2 rounded-lg hover:drop-shadow-base-bold'
                        >
                            <Link href={`/posts/${post.id}`}>
                                <div className='text-xl font-semibold dark:text-white'>{post.title}</div>
                            </Link>
                            <div className='flex items-center text-gray-500 dark:text-gray-300'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='currentColor'
                                    width='14'
                                    height='14'
                                    className='mr-2' // 아이콘과 날짜 사이 간격 조정
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
                                    ></path>
                                </svg>
                                <p className='text-gray-600 dark:text-gray-300'>{post.date}</p>
                            </div>
                            <div className='flex flex-wrap'>
                                {post.tags.map((tag, index) => (
                                    <Link
                                        key={index}
                                        href={`/tags/${tag}`}
                                        className='flex mr-2 items-center rounded-lg transition-all dark:text-zinc-300 dark:hover:bg-zinc-800 px-2 py-1 mb-2 ring-1 dark:bg-zinc-700 ring-neutral-300 dark:ring-neutral-600 font-mono text-sm'
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
            <Footer />
        </motion.div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const series = getSeries();
    const paths = Array.from(series.keys()).map((seriesName) => ({
        params: { seriesName: seriesName },
    }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<SeriesPostsPageProps, { seriesName: string }> = async (context) => {
    const seriesName = context.params?.seriesName ?? '';
    const posts = getPostsBySeries(seriesName);

    return {
        props: {
            posts,
        },
    };
};

export default SeriesPostsPage;
