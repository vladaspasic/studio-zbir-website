import classnames from 'classnames';
import { useTranslations } from 'next-intl';
import { LuInstagram, LuFacebook, LuLinkedin, LuMail, LuTwitter } from 'react-icons/lu';
import { Link } from 'zbir/i18n/navigation';
import LanguageSwitcher from 'zbir/components/LanguageSwitcher';
import styles from './Layout.module.css';

/**
 * Defines the structure of the page navigation link that should be rendered by the
 * header and footer navigation components.
 */
interface NavigationLink {
    href: string,
    name: string,
}

interface PageLinkProps extends NavigationLink {
    className?: string,
}

const SOCIAL_LINKS = [{
    href: '#',
    Icon: LuInstagram,
}, {
    href: '#',
    Icon: LuFacebook,
}, {
    href: '#',
    Icon: LuLinkedin,
}, {
    href: '#',
    Icon: LuTwitter,
}, {
    href: '#',
    Icon: LuMail,
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

export const Header = () => (
    <header className="w-full z-30 top-0 p-4">
        <nav className="w-full container mx-auto flex flex-wrap items-center justify-between">
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
        <footer className="p-4">
            <div className="container grid tablet:grid-cols-3 gap-4 mx-auto">
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

            <div className="container mx-auto my-6 flex items-center justify-center">
                <div className="grid grid-cols-5 gap-4 tablet:gap-6">
                    {SOCIAL_LINKS.map(link => (
                        <a href="#"
                           key={link.Icon.name}
                           className="flex items-center justify-center rounded-full p-4 hover:bg-gray-200 transition ease-in-out duration-200"
                        >
                            <link.Icon
                                size="1.25rem"
                                className="text-gray-500 hover:text-gray-900 transition ease-in-out duration-200"
                            />
                        </a>
                    ))}
                </div>
            </div>

            <p className="text-sm font-light text-center">
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
