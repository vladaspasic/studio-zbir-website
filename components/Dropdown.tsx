"use client"

import { useState, ReactNode, MouseEventHandler } from 'react';
import classnames from 'classnames';

export interface DropdownProps {
    label: string,
    className?: string,
    children: ReactNode,
}

export default function Dropdown({ label, className, children }: DropdownProps) {
    const [opened, setState] = useState(() => false);

    const toggle: MouseEventHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setState(!opened);
    };

    return (
        <div className={classnames('inline-flex bg-white border rounded border-gray-400', className)}>
            <button type="button"
                    onClick={e => toggle(e)}
                    className="px-4 py-2 text-sm text-gray-700 flex-1 rounded-l">
                {label}
            </button>

            <div className="relative">
                <button
                    type="button"
                    onClick={(e) => toggle(e)}
                    className="inline-flex items-center justify-center h-full px-2 duration-200 text-gray-700 hover:text-black border-l border-gray-400 rounded-r hover:bg-gray-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                <div className={`${opened ? 'absolute' : 'hidden'} right-0 z-50 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded shadow-lg`}>
                    <div className="p-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}