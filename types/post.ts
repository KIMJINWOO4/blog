import { MDXRemoteSerializeResult } from 'next-mdx-remote';

// types/post.ts
export interface PostMetadata {
    tags: string[];
    id: string;
    title: string;
    date: string;
    series: string;
    mdxSource: MDXRemoteSerializeResult;
}
export interface PostData {
    tags: any;
    id: string;
    title: string;
    date: string;
    series: string;
}

export interface PostProps {
    postData: {
        metadata: PostMetadata;
        mdxSource: MDXRemoteSerializeResult;
    };
}
