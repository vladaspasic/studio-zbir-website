import classnames from 'classnames';

const Section = ({ title, className, children }: { title?: string, className?: string, children?: React.ReactNode }) => (
    <article className={classnames('my-10 laptop:my-16', className)}>
        {title && (
            <header className="mb-8">
                <p className="uppercase tracking-wide font-semibold text-gray-800 text-xl laptop:text-2xl">
                    {title}
                </p>
            </header>
        )}

        {children}
    </article>
);

export default Section