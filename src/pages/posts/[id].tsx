import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { MDXRemote } from 'next-mdx-remote';
import { getPostData, getAllPostIds } from '../../lib/posts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import rehypeHighlight from 'rehype-highlight';
import langHttp from 'highlight.js/lib/languages/http';
import langNginx from 'highlight.js/lib/languages/nginx';
import { PostMetadata } from '../../../types/post';

interface PostProps {
    postData: PostMetadata;
}
const options = {
    mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [[rehypeHighlight, { languages: { http: langHttp, nginx: langNginx } }]],
    },
};

const Post: NextPage<PostProps> = ({ postData }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col min-h-screen bg-white dark:bg-gray-700'>
            <Header />
            <main className='flex-grow container mx-auto p-4'>
                <article className='prose lg:prose-xl dark:prose-dark max-w-none'>
                    <motion.h1
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className='text-4xl font-bold mb-4 dark:text-white'
                    >
                        {postData.title}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className='text-gray-600 dark:text-gray-300 mb-2'
                    >
                        {postData.date}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className='flex flex-wrap mb-4'
                    >
                        {postData.tags.map((tag, index) => (
                            <Link key={index} href={`/tags/${tag}`} passHref>
                                <div className='bg-blue-100 dark:bg-blue-200 text-blue-800 hover:bg-slate-400 hover:text-green-400 dark:text-blue-900 mr-2 mb-2 px-2 py-1 rounded-full cursor-pointer'>
                                    {tag}
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                    <MDXRemote {...postData.mdxSource} {...options} />
                </article>
            </main>
            <Footer />
        </div>
    );
};

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: true,
    };
}

export const getStaticProps: GetStaticProps<PostProps> = async (context: GetStaticPropsContext) => {
    const id = context.params?.id as string;
    const postData = await getPostData(id);
    return {
        props: {
            postData,
        },
    };
};

export default Post;
