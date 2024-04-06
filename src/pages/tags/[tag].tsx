import { useRouter } from 'next/router';
import { getPostsByTag } from '@/lib/posts';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { staggerHalf, fadeInUp, fadeInSlideToLeft } from '@/constants/animations';
import { PostMetadata } from '../../../types/post';
import { GetServerSideProps, NextPage } from 'next';

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
            className='flex flex-col min-h-screen bg-white dark:bg-zinc-600'
        >
            <Header />
            <div className='flex-grow container mx-auto p-4'>
                <motion.h1 variants={fadeInSlideToLeft} className='text-2xl font-bold my-4 dark:text-white font-mono'>
                    태그: {tag}
                </motion.h1>
                <motion.h3 variants={fadeInSlideToLeft} className='text-ml font-bold my-4 dark:text-white font-mono'>
                    검색 결과: {filteredPosts.length}건
                </motion.h3>
                <motion.ul variants={staggerHalf} initial='initial' animate='animate' exit='exit' className='list-none'>
                    {filteredPosts.map((post) => (
                        <motion.li
                            key={post.id}
                            variants={fadeInUp}
                            className='mb-5 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-md'
                        >
                            <Link href={`/posts/${post.id}`}>
                                <div className='block'>
                                    <h2 className='text-xl font-bold text-black mb-2 dark:text-white hover: dark:hover:text-black'>
                                        {post.title}
                                    </h2>
                                    <p className='text-gray-500 mb-2'>{post.date}</p>
                                    <div className='flex flex-wrap'>
                                        {post.tags.map((tag, index) => (
                                            <Link key={index} href={`/tags/${tag}`} passHref>
                                                <div className='flex mr-2 items-center rounded-lg transition-all hover:bg-secondary dark:hover:bg-zinc-800 px-2 py-1 ring-1 dark:bg-zinc-600 ring-neutral-300 dark:ring-neutral-600 font-mono'>
                                                    {tag}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </Link>
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
