import { NextPage } from 'next';
import { getSortedPostsData } from '../lib/posts';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerHalf, fadeInSlideToLeft, fadeInHalf } from '../constants/animations';
import Head from 'next/head';
import ToggleInfo from '@/components/common/ToggleInfo';

export const getStaticProps = async () => {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
};

type Props = {
    allPostsData: {
        id: string;
        date: string;
        title: string;
        tags: string[];
    }[];
};

const Home: NextPage<Props> = ({ allPostsData }) => {
    return (
        <motion.div
            variants={staggerHalf}
            initial='initial'
            animate='animate'
            exit='exit'
            className='flex flex-col min-h-screen bg-white dark:bg-zinc-700'
        >
            <Head>
                <title>K - log</title>
                <meta name='description' content='열심히 배우겠습니다.' />
            </Head>
            <Header />
            <div className='flex-grow container mx-auto p-4 px-10 sm:px-6'>
                <div className='dark:text-white dark:border-white py-6 border-b-2 pb-4 border-spacing-2 font-serif border-zinc-700 '>
                    <motion.section variants={staggerHalf} initial='initial' animate='animate'>
                        <h1 className=' text-5xl mb-4 font-bold'>jinwoo kim</h1>

                        <motion.div variants={fadeInHalf} className='mt-6 mb-4'>
                            Aspiring Frontend Web Developer
                        </motion.div>
                        <motion.div variants={fadeInHalf}>
                            <p>
                                Aspiring to become a developer who prioritizes user experience, utilizing technologies
                                like React, Next.js, and Typescript.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInHalf} className='my-4'>
                            <ToggleInfo className='dark: text-gray-400 hover:text-gray-950'></ToggleInfo>
                        </motion.div>
                    </motion.section>
                </div>

                <motion.h1 variants={fadeInSlideToLeft} className='text-2xl font-bold my-4 pt-6 dark:text-white'>
                    All Posts ({allPostsData.length})
                </motion.h1>
                <motion.ul variants={staggerHalf} initial='initial' animate='animate' exit='exit'>
                    {allPostsData.map(({ id, date, title, tags }) => (
                        <motion.li
                            key={id}
                            className='mb-5 p-4 border-b border-zinc-600 dark:border-white transition-colors'
                            variants={fadeInUp}
                        >
                            <Link href={`/posts/${id}`}>
                                <div className='block'>
                                    <h2 className='text-2xl font-bold text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-300 hover:underline'>
                                        {title}
                                    </h2>
                                    <p className='text-gray-500 dark:text-gray-300'>{date}</p>
                                </div>
                            </Link>
                            <div className='flex flex-wrap mt-2'>
                                {tags.map((tag, index) => (
                                    <Link key={index} href={`/tags/${tag}`} passHref>
                                        <div className='mr-2 mb-2 inline-block no-underline bg-blue-100 dark:bg-blue-200 text-blue-800 dark:text-blue-900 px-2 py-1 rounded-full text-sm hover:bg-blue-200 hover:text-green-300 dark:hover:bg-blue-300'>
                                            {tag}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
            <Footer />
        </motion.div>
    );
};

export default Home;
