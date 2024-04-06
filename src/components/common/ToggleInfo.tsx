import React, { useState } from 'react';
import ContactsIcon from './ContatcsIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/constants/animations';

interface ToggleInfoProps {
    className?: string;
}

function ToggleInfo({ className }: ToggleInfoProps) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <button onClick={toggleVisibility} className='text-gray-400 hover:text-black'>
                {isVisible ? 'fold' : 'More about me'}
            </button>

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        variants={fadeIn}
                        className='font-sans ml-4'
                    >
                        <div className='flex my-4 items-center'>
                            <a
                                key='velog'
                                href='https://velog.io/@keroeroe14'
                                className='flex items-center text-primary transition hover:text-secondary'
                            >
                                <ContactsIcon contact='velog' />
                                <p className='pl-4  text-zinc-400 hover:text-black'>Velog</p>
                            </a>
                        </div>
                        <div className='flex my-4 items-center'>
                            <a
                                key='github'
                                href='https://github.com/KIMJINWOO4'
                                className='flex items-center text-primary transition hover:text-secondary'
                            >
                                <ContactsIcon contact='github' />
                                <p className='pl-4  text-zinc-400 hover:text-black'>Github</p>
                            </a>
                        </div>
                        <div className='flex my-4 items-center'>
                            <a
                                key='linkedin'
                                href='https://www.linkedin.com/in/%EC%A7%84%EC%9A%B0-%EA%B9%80-7114b3267/'
                                className='flex items-center text-primary transition hover:text-secondary'
                            >
                                <ContactsIcon contact='linkedin' />
                                <p className='pl-4  text-zinc-400 hover:text-black'>Linked In</p>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ToggleInfo;
