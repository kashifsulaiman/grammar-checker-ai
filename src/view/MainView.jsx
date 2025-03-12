'use client'
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";

const MainView = () => {
    const [text, setText] = useState('');
    const [correctedText, setCorrectedText] = useState('');
    const [loading, setloading] = useState(false)
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            window.location.href = '/get-started';
        }
    }, []);

    const handleCheck = async () => {
        setloading(true);
        try {
            if(!text){
                toast.error('Text is missing')
                return;
            }
            setCorrectedText('');
            const response = await fetch('/api/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) {
                toast.error('Failed to check grammar');
            }
            const data = await response.json();
            setCorrectedText(data.correctedText);

            toast.success('Grammar check completed!');
        } catch (error) {
            toast.error('An error occurred');
        }
        finally{
            setloading(false)
        }
    };
    const logout = () => {
        localStorage.removeItem('user');
        window.location.href = '/get-started';
    }

    return (
        <div className='flex flex-col min-h-screen bg-gray-100 gap-10' >
            <div className="absolute right-0 mr-10 mt-10">
                <button onClick={logout} className="w-20 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transform transition-transform duration-200 active:scale-90">
                    Logout
                </button>
            </div>
            <div className='mt-30 mx-auto w-3/4 justify-center bg-blue-200 rounded-md p-2' >
                <h4 className='font-bold'>Output</h4>
                <p dangerouslySetInnerHTML={{ __html: correctedText }} />
            </div>
            <div className="flex flex-col items-center justify-center">
                <textarea
                    className="w-3/4 p-2 border border-gray-300 rounded-md"
                    rows={10}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text here..."
                />
                <button
                    className={`mt-4 px-4 py-2 ${text ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} text-white rounded-md`}
                    onClick={handleCheck}
                    disabled={!text}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                    ) : 'Check'}
                </button>
            </div>
        </div>
    );
};

export default MainView;