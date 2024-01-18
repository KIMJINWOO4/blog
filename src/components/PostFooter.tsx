import Link from 'next/link';

export type PostFooterProps = {
    prevPost: { title: string; slug: string } | null;
    nextPost: { title: string; slug: string } | null;
};

export default function PostFooter({ prevPost, nextPost }: PostFooterProps) {
    return (
        <div className='flex justify-between items-center py-4 border-t border-gray-200 dark:border-gray-700'>
            {prevPost ? (
                <Link href={`/posts/${prevPost.slug}`}>
                    <div className='flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'>
                        <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4 mr-2'>
                            <path fillRule='evenodd' d='M10 5H3v10h7v3l7-8-7-8v3z' clipRule='evenodd' />
                        </svg>
                        이전 글: {prevPost.title}
                    </div>
                </Link>
            ) : (
                <div></div> // 빈 공간 유지
            )}

            {nextPost ? (
                <Link href={`/posts/${nextPost.slug}`}>
                    <div className='flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'>
                        다음 글: {nextPost.title}
                        <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4 ml-2'>
                            <path fillRule='evenodd' d='M10 15h7V5h-7V2l-7 8 7 8v-3z' clipRule='evenodd' />
                        </svg>
                    </div>
                </Link>
            ) : (
                <div></div> // 빈 공간 유지
            )}
        </div>
    );
}
