import type { Config } from 'tailwindcss';

const { fontFamily } = require('tailwindcss/defaultTheme');
const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ededed', // 여기에 원하는 'primary' 색상 코드를 입력
                secondary: '#f5f5f5', // 'secondary' 색상 코드
                mute: '#171717',
                neutral: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    150: '#ededed',
                    200: '#e5e5e5',
                    250: '#dedede',
                    300: '#d4d4d4',
                    350: '#b5b5b5',
                    400: '#a3a3a3',
                    450: '#8a8a8a',
                    470: '#808080',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    750: '#363636',
                    800: '#262626',
                    900: '#171717',
                },
            },
            dropShadow: {
                base: '0px 0px 10px rgba(234, 179, 8, 0.3)',
                'base-bold': '0px 0px 7px rgba(234, 179, 8, 0.7)',
            },
            fontFamily: {
                sans: ['var(--font-sans)', ...fontFamily.sans],
                spoqa: ['var(--font-spoqa)', ...fontFamily.sans],
                mono: ['var(--font-mono)', ...fontFamily.mono],
            },
            typography: (theme: (arg0: string) => any) => ({
                DEFAULT: {
                    css: {
                        'h2,h3,h4': {
                            'scroll-margin-top': 'var(--scroll-mt)',
                        },
                        'hr, thead, tbody tr': { borderColor: theme('colors.neutral.300') },
                        'blockquote p:first-of-type::before': false,
                        'blockquote p:last-of-type::after': false,
                        'code::before': false,
                        'code::after': false,
                    },
                },
                dark: {
                    css: {
                        blockquote: {
                            borderLeftColor: theme('colors.neutral.700'),
                            color: theme('colors.neutral.300'),
                        },
                        'hr, thead, tbody tr': { borderColor: theme('colors.neutral.700') },
                        'ol li::marker, ul li::marker': {
                            color: theme('colors.neutral.500'),
                        },
                    },
                },
            }),
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
export default config;
