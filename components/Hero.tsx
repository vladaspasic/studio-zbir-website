import type { ReactElement } from 'react';

interface HeroProps {
    title?: string | null,
    subtitle?: string | null,
    children?: ReactElement,
}

export default function Hero({ title, subtitle, children }: HeroProps) {
    return (
        <div className="my-14 laptop:my-20 desktop:my-28">
            {title && (
                <p className="text-3xl font-semibold laptop:text-6xl mb-3 tablet:mb-6">
                    {title}
                </p>
            )}

            {subtitle && (
                <p className="text-xl laptop:text-3xl">
                    {subtitle}
                </p>
            )}

            {children}
        </div>
    );
}