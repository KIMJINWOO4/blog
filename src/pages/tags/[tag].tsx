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
    const { tags } = router.query;

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
                <motion.h1 variants={fadeInSlideToLeft} className='text-2xl font-bold my-4 dark:text-white'>
                    태그: {tags}
                </motion.h1>
                <motion.h3 variants={fadeInSlideToLeft} className='text-ml font-bold my-4 dark:text-white'>
                    검색 결과: {filteredPosts.length}건
                </motion.h3>
                <motion.ul variants={staggerHalf} initial='initial' animate='animate' exit='exit' className='list-none'>
                    {filteredPosts.map((post) => (
                        <motion.li
                            key={post.id}
                            variants={fadeInUp}
                            className='mb-5 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
                        >
                            <Link href={`/posts/${post.id}`}>
                                <div className='block'>
                                    <h2 className='text-xl font-bold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'>
                                        {post.title}
                                    </h2>
                                    <p className='text-gray-500'>{post.date}</p>
                                    <div className='flex flex-wrap'>
                                        {post.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className='bg-blue-100 dark:bg-blue-200 text-blue-800 hover:bg-slate-400 hover:text-green-400 dark:text-blue-900 mr-2 mb-2 px-2 py-1 rounded-full cursor-pointer'
                                            >
                                                {tag}
                                            </span>
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
