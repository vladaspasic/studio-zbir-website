import type { ReactElement } from 'react';

interface HeroProps {
    title?: string | null,
    subtitle?: string | null,
    children?: ReactElement,
}

export default function Hero({ title, subtitle, children }: HeroProps) {
    return (
        <div className="my-10 laptop:my-20">
            {title && (
                <p className="text-3xl font-bold laptop:text-6xl mb-5">
                    {title}
                </p>
            )}

            {subtitle && (
                <p className="text-xl font-semibold laptop:text-3xl">
                    {subtitle}
                </p>
            )}

            {children}
        </div>
    );
}