import { useRouter } from 'next/router';
import { getPostsByTag } from '@/lib/posts';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { staggerHalf, fadeInUp, fadeInSlideToLeft } from '@/constants/animations';
import { PostMetadata } from '../../../types/post';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface TagPageProps {
    filteredPosts: PostMetadata[];
}

const TagPage: NextPage<TagPageProps> = ({ filteredPosts }) => {
    const router = useRouter();
    const { tag } = router.query;
    return (
        <motion.div
            variants={staggerHalf}
            initial='initial'
            animate='animate'
            exit='exit'
            className='flex flex-col min-h-screen bg-white dark:bg-zinc-700'
        >
            <Header />
            <div className='flex-grow container mx-auto p-4 sm:p-6 max-w-4xl'>
                <motion.h1
                    variants={fadeInSlideToLeft}
                    className='text-3xl font-extrabold my-4 dark:text-white font-serif'
                >
                    Tag : {tag}
                </motion.h1>
                <motion.h3
                    variants={fadeInSlideToLeft}
                    className='text-xl font-extrabold my-4 dark:text-white font-mono'
                >
                    검색 결과: {filteredPosts.length}건
                </motion.h3>
                <motion.ul variants={staggerHalf} initial='initial' animate='animate' exit='exit' className='list-none'>
                    {filteredPosts.map((post) => (
                        <motion.li
                            key={post.id}
                            variants={fadeInUp}
                            className='mb-5 p-4  hover:drop-shadow-base-bold rounded-md'
                        >
                            <Link href={`/posts/${post.id}`}>
                                <div className='block '>
                                    <h2 className='text-xl font-bold text-black mb-2 dark:text-white'>{post.title}</h2>
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
                                        {post.date}
                                    </div>
                                </div>
                            </Link>
                            <div className='flex flex-wrap'>
                                {post.tags.map((tag, index) => (
                                    <Link
                                        key={index}
                                        href={`/tags/${tag}`}
                                        className='flex mr-2 items-center rounded-lg transition-all dark:text-zinc-300 dark:hover:bg-zinc-800 px-2 py-1 mb-2 ring-1 dark:bg-zinc-600 ring-neutral-300 dark:ring-neutral-600 font-mono text-sm'
                                    >
                                        {tag}
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

export const getServerSideProps: GetServerSideProps<TagPageProps> = async ({ params }) => {
    const tag = params?.tag as string;
    const filteredPosts = getPostsByTag(tag);

    return { props: { filteredPosts } };
};

export default TagPage;
