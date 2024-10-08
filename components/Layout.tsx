import type { IconType } from 'react-icons';

import classnames from 'classnames';
import { useTranslations } from 'next-intl';
import { LuInstagram, LuFacebook, LuLinkedin, LuTwitter } from 'react-icons/lu';
import { Link } from 'zbir/i18n/navigation';
import LanguageSwitcher from 'zbir/components/LanguageSwitcher';
import styles from './Layout.module.css';

interface NavigationLink {
    href: string,
    name: string,
}

interface SocialLink {
    href: string,
    label: string,
    Icon: IconType,
}

interface PageLinkProps extends NavigationLink {
    className?: string,
}

const SOCIAL_LINKS: SocialLink[] = [{
    href: '#',
    label: 'Instagram',
    Icon: LuInstagram,
}, {
    href: '#',
    label: 'Facebook',
    Icon: LuFacebook,
}, {
    href: '#',
    label: 'Linkedin',
    Icon: LuLinkedin,
}, {
    href: '#',
    label: 'Twitter',
    Icon: LuTwitter,
}];

const NAVIGATION_LINKS: NavigationLink[] = [{
    href: '/projects',
    name: 'projects',
}, {
    href: '/about',
    name: 'about',
}, {
    href: '/contact',
    name: 'contact',
}];

function PageLink({ href, name, className }: PageLinkProps) {
    const t = useTranslations('pages');
    const label = t(name);

    return (
        <Link href={href}
              className={classnames('block font-semibold text-gray-700 hover:text-black transition', className)}>
            {label}
        </Link>
    );
}

function SocialLink({ href, label, Icon }: SocialLink) {
    return (
        <a href={href}
           className="flex items-center justify-center rounded-full p-4 text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition ease-in-out duration-200"
           aria-label={label}
        >
            <Icon size="1.25rem" />
        </a>
    );
}

export function SocialLinks({ className }: { className?: string }) {
    return (
        <div className={classnames('flex items-center justify-center', className)}>
            <div className="grid grid-cols-4 gap-4 tablet:gap-6">
                {SOCIAL_LINKS.map(link => (
                    <SocialLink
                        key={link.label}
                        href={link.href}
                        label={link.label}
                        Icon={link.Icon}
                    />
                ))}
            </div>
        </div>
    );
}

export const Header = () => (
    <header className="w-full">
    <nav className="container mx-auto flex flex-wrap items-center justify-between p-4">
            <div className="flex lg:flex-1 justify-start -ml-2">
            <PageLink href="/" name="home" className="text-xl leading-6 p-2"/>
            </div>

            <label htmlFor="menu-toggle" className="cursor-pointer block p-2 -mr-2 tablet:hidden">
                <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20"
                     height="20" viewBox="0 0 20 20">
                    <title>menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
            </label>
            <input className={classnames(styles.toggle, "hidden")} type="checkbox" id="menu-toggle"/>

            <div className={classnames(styles.menu, "hidden tablet:flex tablet:w-auto w-full order-3 tablet:order-1")}>
                <ul className="tablet:flex items-center pt-3 tablet:pt-0">
                    {NAVIGATION_LINKS.map(link => (
                        <li key={link.name}>
                            <PageLink href={link.href} name={link.name} className="px-1 py-2 tablet:px-4"/>
                        </li>
                    ))}

                    <li className="px-1 py-2 tablet:px-4">
                        <LanguageSwitcher/>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
);

export function Footer() {
    const t = useTranslations();
    const title = t('title');
    const location = t('footer.location');
    const copyright = t('footer.copyright', {title, year: new Date().getFullYear()});

    return (
        <footer className="w-full pt-6 border-t">
            <div className="container grid tablet:grid-cols-3 gap-4 px-4 mx-auto">
                <div className="tablet:col-span-2">
                    <p className="text-2xl font-light mb-2">
                        {title}
                    </p>
                    <p className="font-light">
                        {location}
                    </p>
                </div>
                <nav className="tablet:text-right">
                    <ul className="flex tablet:block items-center justify-between">
                        {NAVIGATION_LINKS.map(link => (
                            <li key={link.name}>
                                <PageLink href={link.href} name={link.name} className="px-1 py-2"/>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <SocialLinks className="container mx-auto my-6" />

            <p className="text-sm font-light text-center border-t py-4">
                {copyright}
            </p>
        </footer>
    )
}

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
        <Header/>

            <main className="container mx-auto p-4">
                {children}
            </main>

            <Footer/>
        </>
    );
}
