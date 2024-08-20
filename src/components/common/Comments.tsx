import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function Comments() {
    const ref = useRef<HTMLDivElement | null>(null);
    const { theme } = useTheme();

    const makeComments = () => {
        if (!ref.current) return;

        const existingScript = ref.current.querySelector('.utterances');
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.async = false;
        script.setAttribute('repo', 'KIMJINWOO4/blog_comments');
        script.setAttribute('issue-term', 'pathname');
        script.setAttribute('label', '✨💬Comments💬✨');
        script.setAttribute('crossorigin', 'anonymous');

        script.setAttribute('theme', theme === 'dark' ? 'dark-blue' : 'github-light');

        script.setAttribute('label', 'blog-comment');
        ref.current.appendChild(script);
    };

    useEffect(() => {
        makeComments();
    }, [theme]);

    return <div ref={ref}></div>;
}
