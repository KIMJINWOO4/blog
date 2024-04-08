import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../constants/animations'; // 애니메이션 파일 경로 수정

const Header = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className='bg-white dark:bg-zinc-800 text-gray-900 dark:text-white p-4 shadow-md'>
            <div className='container mx-auto flex items-center justify-between'>
                <div className='flex items-center justify-start space-x-4'>
                    {/* 로고 */}
                    <Link href='/'>
                        <motion.div
                            className='flex items-center cursor-pointer hover:bg-secondary rounded-md'
                            variants={fadeInUp}
                            initial='initial'
                            animate='animate'
                            exit='exit'
                        >
                            <span role='img' aria-label='logo' className='px-2 text-2xl text-center'>
                                💻
                            </span>
                        </motion.div>
                    </Link>
                    {/* 네비게이션 메뉴 */}
                    <motion.nav variants={fadeInUp} initial='initial' animate='animate' exit='exit'>
                        <ul className='flex ml-2 mr-10 space-x-4 items-center'>
                            <li>
                                <Link href='/'>
                                    <div className='text-lg hover:text-blue-500 font-bold'>Blog</div>
                                </Link>
                            </li>
                            <li>
                                <Link href='/series'>
                                    <div className='text-lg hover:text-blue-500 font-bold'>Series</div>
                                </Link>
                            </li>
                        </ul>
                    </motion.nav>
                </div>

                {/* 메뉴 토글 버튼 */}
                {/*
                <motion.button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className='text-2xl'
                    variants={fadeInUp}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                >
                    ☰
                </motion.button>*/}
            </div>
        </header>
    );
};

export default Header;
