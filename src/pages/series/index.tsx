// pages/series/index.tsx
import type { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fadeInUp, staggerOne, staggerHalf } from '@/constants/animations';
import { getSeries } from '@/lib/posts';
import { PostMetadata } from '../../../types/post';

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
            <Header />
            <div className='flex-grow px-4 py-8 container mx-auto p-4'>
                <motion.h1 className='text-3xl dark:text-white *:font-bold mb-4' variants={fadeInUp}>
                    Series
                </motion.h1>
                <p className='text-xl dark:text-white *:font-bold mb-4'>검색결과 {series.length}건</p>
                <motion.div
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 dark:text-white'
                    variants={staggerOne}
                >
                    {series.map((serie) => (
                        <motion.div
                            key={serie.name}
                            className='border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-600 shadow-md rounded-lg p-4 text-center transition-transform transform hover:scale-105'
                            variants={fadeInUp}
                        >
                            <Link href={`/series/${serie.name}`}>
                                <div className='text-xl font-semibold'>{serie.name}</div>
                                <div className='flex justify-between'>
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
