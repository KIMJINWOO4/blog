import ContactsIcon from './common/ContatcsIcon';
const Footer = () => {
    return (
        <footer className='pb-8 text-sm text-neutral-800 dark:text-neutral-400'>
            <hr className='mb-8 border-1 w-full border-neutral-300 transition-all dark:border-neutral-700' />

            <div className='flex flex-col items-end space-y-1 mr-10'>
                <div className='flex space-x-2 mb-2'>
                    <a
                        key='velog'
                        href='https://velog.io/@keroeroe14'
                        className="'text-primary transition hover:text-secondary'"
                    >
                        <ContactsIcon contact='velog' />
                    </a>
                    <a
                        key='github'
                        href='https://github.com/KIMJINWOO4'
                        className="'text-primary transition hover:text-secondary'"
                    >
                        <ContactsIcon contact='github' />
                    </a>
                    <a
                        key='likedin'
                        href='https://www.linkedin.com/in/%EC%A7%84%EC%9A%B0-%EA%B9%80-7114b3267/'
                        className="'text-primary transition hover:text-secondary'"
                    >
                        <ContactsIcon contact='linkedin' />
                    </a>
                </div>
                <p>
                    <span>© since 2024 </span>
                    <a href='https://ak-47.netlify.app/' className='text-primary transition hover:text-secondary'>
                        KIMJINWOO4's Blog
                    </a>
                    <span> Powered by </span>
                    <a href='https://nextjs.org/' className='text-primary transition hover:text-secondary'>
                        Next.js
                    </a>
                    <span>, </span>
                    <a href='https://www.netlify.com/' className='text-primary transition hover:text-secondary'>
                        Netlify
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
