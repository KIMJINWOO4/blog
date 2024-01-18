import { NextPage } from 'next';
import { getSortedPostsData } from '../lib/posts';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerHalf, fadeInSlideToLeft } from '../constants/animations';

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
            className='flex flex-col min-h-screen bg-white dark:bg-gray-800'
        >
            <Header />
            <div className='flex-grow container mx-auto p-4'>
                <motion.h1 variants={fadeInSlideToLeft} className='text-2xl font-bold my-4 dark:text-white'>
                    All Posts ({allPostsData.length})
                </motion.h1>
                <motion.ul variants={staggerHalf} initial='initial' animate='animate' exit='exit'>
                    {allPostsData.map(({ id, date, title, tags }) => (
                        <motion.li
                            key={id}
                            className='mb-5 p-4 border-b border-gray-200 dark:border-gray-700 transition-colors'
                            variants={fadeInUp}
                        >
                            <Link href={`/posts/${id}`}>
                                <div className='block'>
                                    <h2 className='text-2xl font-bold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline'>
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
