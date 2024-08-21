import type { ReactNode } from 'react';

import classnames from 'classnames';
import { Link as NavigationLink } from 'zbir/i18n/navigation';

export interface LinkProps {
    href: string,
    className?: string,
    children?: ReactNode,
}

export interface ButtonProps {
    type?: 'submit' | 'reset' | 'button',
    disabled?: boolean,
    className?: string,
    children?: ReactNode,
}

const CLASS_NAMES = [
    'inline-flex items-center justify-center px-4 py-2',
    'text-gray-700 bg-white border rounded border-gray-400 duration-200',
];

export function Link({ href, className, children }: LinkProps) {
    return (
        <NavigationLink href={href}
                        className={classnames(
                            CLASS_NAMES,
                            "hover:bg-black hover:border-black hover:text-white",
                            className
                        )}
        >
            {children}
        </NavigationLink>
    );
}

export function Button({ type = 'button', disabled, className, children }: ButtonProps) {
    return (
        <button type={type}
                disabled={disabled}
                className={classnames(
                    CLASS_NAMES,
                    "disabled:text-gray-500 disabled:border-gray-200",
                    "hover:enabled:bg-black hover:enabled:border-black hover:enabled:text-white",
                    className
                )}
        >
        {children}
        </button>
    )
}

export default Button;