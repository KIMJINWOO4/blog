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
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkToc from 'remark-toc';
import Head from 'next/head';
import Comments from '@/components/common/Comments';

interface PostProps {
    postData: PostMetadata;
}
const options = {
    mdxOptions: {
        remarkPlugins: [remarkToc],
        rehypePlugins: [[rehypeHighlight, rehypeAutolinkHeadings, { languages: { http: langHttp, nginx: langNginx } }]],
    },
};

const Post: NextPage<PostProps> = ({ postData }) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col min-h-screen dark:bg-zinc-700'>
            <Head>
                <title>{postData.title}</title>
                <meta name='description' content='열심히 배우겠습니다.' />
                <meta name='google-site-verification' content='jPTIFNVfyPOTm8WUaEHm9XtinouRCPGnGOUDKdx9Szc' />
            </Head>
            <Header />
            <main className='flex-grow container mx-auto p-4 px-10 sm:px-6 sm:p-6 max-w-6xl'>
                <article className='prose lg:prose-xl lg:px-24 dark:prose-dark max-w-none'>
                    <motion.h2
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className='text-3xl font-bold mb-4 dark:text-white'
                    >
                        {postData.title}
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className='text-gray-600 dark:text-gray-300 mb-2'
                    >
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
                            {postData.date}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className='flex flex-wrap mb-4'
                    >
                        {postData.tags.map((tag, index) => (
                            <Link key={index} href={`/tags/${tag}`} passHref>
                                <div className='flex mr-2 items-center rounded-lg transition-all hover:bg-secondary dark:text-zinc-300 dark:hover:bg-zinc-800 px-2 py-1 ring-1 text-black dark:bg-zinc-600 ring-neutral-300 dark:ring-neutral-600 font-mono text-sm'>
                                    {tag}
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                    <MDXRemote {...postData.mdxSource} {...options} />
                    <Comments />
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
