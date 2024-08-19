import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            mobile: '375px',
            tablet: '768px',
            laptop: '1024px',
            desktop: '1280px',
        },
    },
    plugins: [],
};

export default config;
