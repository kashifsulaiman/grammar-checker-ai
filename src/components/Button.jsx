"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

const Button = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/get-started');
    };

    return (
        <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transform transition-transform duration-200 active:scale-90"
        >
            Get Started
        </button>
    );
};

export default Button;
