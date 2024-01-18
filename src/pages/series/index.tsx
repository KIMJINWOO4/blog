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
            className='flex flex-col min-h-screen bg-white dark:bg-gray-800'
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
                            className='border dark:bg-gray-500 p-4  text-center rounded-lg'
                            variants={fadeInUp}
                        >
                            <Link href={`/series/${serie.name}`}>
                                <div className='text-xl font-semibold'>{serie.name}</div>
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

export default SeriesPage;
