"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';



export default function Page() {

    const params = useParams();

    const { handle } = params;

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

 

    useEffect(() => {
        if (handle) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`/api/user/${handle}`);

                   
                    if (!response.ok) {
                        const errorData = await response.json();
                       
                        throw new Error(errorData.message || `Error: ${response.status}`);
                    }

                    const data = await response.json();
                    setItem(data);
                } catch (error) {
                   
                    console.error("Error fetching data:", error.message);
                    setItem(null);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [handle]);

   

    const ICONS = {
        'nextjs': (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M9 15v-6l7.7 10.7a9 9 0 1 1-10.4-10.4h.1" /></svg>
        ),
        'linkedin': (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
        ),
        'github': (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
        ),
    };

    
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p>Loading profile...</p>
            </div>
        )
    }

   
    if (!item) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p>User profile not found.</p>
            </div>
        )
    }

    return (
        <>
            <style>{`
                @keyframes gradient-animation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animated-gradient {
                    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                    background-size: 400% 400%;
                    animation: gradient-animation 15s ease infinite;
                }
            `}</style>

            <div className="flex flex-col items-center justify-center min-h-screen animated-gradient text-white p-4 sm:p-6 font-sans">
                <div className="w-full max-w-lg mx-auto bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/20">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative">
                            <img
                                className="w-32 h-32 rounded-full mx-auto border-4 border-white/50 shadow-2xl transition-transform duration-300 hover:scale-105"
                                src={item.pic}
                                alt="Profile Picture"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/128x128/7e22ce/ffffff?text=User'; }}
                            />
                            <span className="absolute bottom-2 right-2 block h-5 w-5 rounded-full bg-green-400 border-2 border-black/20"></span>
                        </div>

                        <h1 className="text-3xl font-bold mt-6 mb-2">
                            @{item.handle}
                        </h1>
                        <p className="text-white/80 mb-8">Sharing my journey in web development.</p>

                        <div className="flex flex-col gap-y-5 w-full">
                            {item.links.map((linkItem, index) => (
                                <a
                                    key={index}
                                    href={linkItem.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center w-full bg-white/90 text-gray-900 font-semibold py-4 px-5 rounded-xl shadow-lg hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                                >
                                    <span className="mr-3 transition-transform duration-300 group-hover:scale-110">
                                        {ICONS[linkItem.icon] || null}
                                    </span>
                                    {linkItem.linktext}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}