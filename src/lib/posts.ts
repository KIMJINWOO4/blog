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

export async function getPostData(id: string): Promise<PostMetadata> {
    const fullPath = path.join(postsDirectory, `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content, data } = matter(fileContents);

    const mdxSource = await serialize(content);

    return {
        id,
        mdxSource,
        title: data.title, // data 객체에서 title 추출
        date: data.date, // data 객체에서 date 추출
        tags: data.tags, // data 객체에서 tags 추출
        series: data.series, // data 객체에서 series 추출
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
