// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { PostMetadata } from '../../types/post';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import rehypeHighlight from 'rehype-highlight';
import { Pluggable } from 'unified';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(): PostMetadata[] {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        const metadata = matterResult.data as Omit<PostMetadata, 'id'>;
        return {
            id,
            ...metadata,
        };
    });
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.mdx$/, ''),
            },
        };
    });
}

export async function getPostData(id: string): Promise<any> {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fullPath = path.join(postsDirectory, `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content, data } = matter(fileContents);

    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [
                [remarkToc, { ordered: true }], // 옵션을 전달하는 배열 형태로 설정
            ],
            rehypePlugins: [
                rehypeHighlight as unknown as Pluggable,
                rehypeSlug,
                [
                    rehypeAutolinkHeadings,
                    {
                        behaviour: 'append',
                        properties: {
                            ariaHidden: true,
                            tabIndex: -1,
                            className: 'hash-link',
                        },
                    },
                ],
            ], // rehype-highlight 플러그인 추가
        },
    });
    return {
        id,
        mdxSource,
        title: data.title,
        date: data.date,
        tags: data.tags,
        series: data.series,
    };
}

export function getPostsByTag(tag: string): PostMetadata[] {
    const allPosts = getSortedPostsData();
    return allPosts.filter((post) => post.tags && post.tags.includes(tag));
}

export function getSeries() {
    const allPosts = getSortedPostsData();
    let seriesMap = new Map<string, PostMetadata[]>();

    allPosts.forEach((post) => {
        if (post.series) {
            if (!seriesMap.has(post.series)) {
                seriesMap.set(post.series, []);
            }
            seriesMap.get(post.series)?.push(post);
        }
    });

    return seriesMap;
}

export function getPostsBySeries(seriesName: string) {
    const allPosts = getSortedPostsData();
    const filteredPosts = allPosts.filter((post) => post.series === seriesName);
    return filteredPosts;
}
