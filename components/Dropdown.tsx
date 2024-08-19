"use client"

import { useState, ReactNode } from 'react';

export interface DropdownProps {
    label: string,
    children: ReactNode,
}

export default function Dropdown({ label, children }: DropdownProps) {
    const [opened, setState] = useState(() => false);
    const toggle = () => setState(!opened);

    return (
        <div className="inline-flex bg-white border rounded-md">
            <span className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 bg-white hover:bg-gray-50 rounded-l-md">
                {label}
            </span>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => toggle()}
                    className="inline-flex items-center justify-center h-full px-2 bg-white text-gray-600 border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50"
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

                <div className={`${opened ? 'absolute' : 'hidden'} right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg`}>
                    <div className="p-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}