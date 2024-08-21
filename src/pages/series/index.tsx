// pages/series/index.tsx
import type { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fadeInUp, staggerHalf } from '@/constants/animations';
import { getSeries } from '@/lib/posts';
import { PostMetadata } from '../../../types/post';
import Head from 'next/head';

interface SeriesPageProps {
    series: { name: string; posts: PostMetadata[] }[];
}

const SeriesPage: NextPage<SeriesPageProps> = ({ series }) => {
    return (
        <motion.div
            variants={staggerHalf}
            initial='initial'
            animate='animate'
            exit='exit'
            className='flex flex-col min-h-screen bg-white dark:bg-zinc-700'
        >
            <Head>
                <title>Series</title>
                <meta name='description' content='열심히 배우겠습니다.' />
                <meta name='google-site-verification' content='jPTIFNVfyPOTm8WUaEHm9XtinouRCPGnGOUDKdx9Szc' />
            </Head>
            <Header />
            <div className='flex-grow px-4 py-8 container mx-auto p-4  p-4 sm:p-6 max-w-4xl'>
                <motion.h1 className='text-3xl dark:text-white mb-4 font-serif font-extrabold' variants={fadeInUp}>
                    Series
                </motion.h1>
                <motion.p className='text-xl dark:text-white *:font-bold mb-4 font-mono' variants={fadeInUp}>
                    검색결과 {series.length}건
                </motion.p>
                <motion.div
                    variants={fadeInUp}
                    className='text-md dark:text-zinc-400 *:font-bold font-mono mt-4 mb-10 '
                >
                    시리즈는 제가 걸어온 길 위에서 마주했던 다양한 경험들과 생각들을 하나의 주제로 묶어 연재한 글들의
                    모음입니다.
                    <br /> 각각의 글은 저만의 이야기를 담고 있지만, 함께 모였을 때 더 큰 의미와 가치를 전달해 줍니다.
                </motion.div>
                <motion.div className='grid grid-cols-1 md:grid-cols-2 gap-4 dark:text-white'>
                    {series.map((serie) => (
                        <motion.div
                            key={serie.name}
                            className='border border-gray-300 dark:border-zinc-600 bg-white px-4 py-2 dark:bg-zinc-700 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:bg-secondary dark:hover:bg-zinc-500'
                            variants={fadeInUp}
                        >
                            <Link href={`/series/${serie.name}`}>
                                <div className='text-xl font-semibold'>{serie.name}</div>
                                <div className='flex justify-between items-center mt-2'>
                                    <div className='text-left'>⚑ {findMostRecentPostInSeries(serie.posts)?.date}</div>
                                    <div className='text-right'>☰ {serie.posts.length} posts </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <Footer />
        </motion.div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const seriesMap = getSeries();
    const seriesArray = Array.from(seriesMap).map(([name, posts]) => ({ name, posts }));

    return {
        props: {
            series: seriesArray,
        },
    };
};

function findMostRecentPostInSeries(postsArray: PostMetadata[]): PostMetadata | null {
    let mostRecentPost: PostMetadata | null = null;

    const mostRecentPostInSeries = postsArray.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];

    return mostRecentPostInSeries;
}

export default SeriesPage;
