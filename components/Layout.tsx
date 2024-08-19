import { useTranslations } from 'next-intl';
import { Link } from 'zbir/i18n/navigation';
import LanguageSwitcher from 'zbir/components/LanguageSwitcher';

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

    const classNames = [
        'font-semibold text-gray-800 hover:text-black transition-colors py-2 px-3'
    ];

    if (className) {
        classNames.push(className);
    }

    return (
        <Link href={href} className={classNames.join(' ')}>
            {label}
        </Link>
    );
}

export const Header = () => (
    <header>
        <nav className="container flex items-center justify-between mx-auto py-8">
            <div className="flex lg:flex-1 justify-start -ml-3">
                <PageLink href="/" name="home" className="text-xl leading-6" />
            </div>
            <div className="flex gap-x-12 justify-end -mr-3">
                {NAVIGATION_LINKS.map(link => (
                    <PageLink key={link.name} href={link.href} name={link.name} className="leading-6" />
                ))}

                <LanguageSwitcher />
            </div>
        </nav>
    </header>
);

export function Footer() {
    const t = useTranslations();
    const title = t('title');
    const location = t('footer.location');
    const copyright = t('footer.copyright', { title, year: new Date().getFullYear() });

    return (
        <footer className="py-4">
            <div className="container grid tablet:grid-cols-3 gap-4 mx-auto">
                <div className="tablet:col-span-2">
                    <p className="text-2xl font-light mb-2">
                        {title}
                    </p>
                    <p className="font-light mb-4">
                        {location}
                    </p>
                    <p className="text-sm font-light">
                        {copyright}
                    </p>
                </div>
                <nav className="tablet:text-right">
                    {NAVIGATION_LINKS.map(link => (
                        <PageLink key={link.name} href={link.href} name={link.name} className="block" />
                    ))}


                </nav>
            </div>
        </footer>
    )
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />

            <main className="container mx-auto">
                {children}
            </main>

            <Footer />
        </>
    );
}
