"use client"
import React, { useState, useRef, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi'
import Link from 'next/link'

import { usePathname } from "next/navigation";


const Navbar = () => {
    const pathname = usePathname()
    const showNavbar = ["/", "/generate"].includes(pathname);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const threshold = window.innerHeight * 0.05; 

          
            if (currentScrollY <= threshold) {
                setIsVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }

            if (currentScrollY > lastScrollY.current) {
                setIsVisible(false);
            } else {
                setIsVisible(true); 
            }

          
            lastScrollY.current = currentScrollY;
        };

       
        window.addEventListener('scroll', handleScroll, { passive: true });

       
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (<>
        {showNavbar && <nav
            className={`
                bg-white flex justify-between items-center rounded-full fixed w-[90vw] 
                p-2 md:px-10 px-6 md:pr-4 pr-3 top-4 left-1/2 -translate-x-1/2 z-50
                transition-transform duration-300 ease-in-out
                ${isVisible ? 'translate-y-0' : '-translate-y-[calc(100%+2rem)]'}
            `}
        >
            <div className="logo flex justify-center items-center lg:gap-15 gap-8">
          
                <img
                    className='hidden md:block w-32 cursor-pointer'
                    src="/logo.svg"
                    alt="MySite Logo"
                />

                <img
                    className='block md:hidden w-8'
                    src="/logo2.svg"
                    alt="MySite Logo Small"
                />

                <ul className=' justify-center items-center xl:flex hidden  text-[16px]' >
                    <Link href={"/"}><li className='cursor-pointer hover:bg-[#eff0ec] p-3 px-5 rounded-lg'>Products</li></Link>
                    <Link href={"/"}><li className='cursor-pointer hover:bg-[#eff0ec] p-3 px-5  rounded-lg'>Templates</li></Link>
                    <Link href={"/"}><li className='cursor-pointer hover:bg-[#eff0ec] p-3 px-5  rounded-lg'>Marketplace</li></Link>
                    <Link href={"/"}><li className='cursor-pointer hover:bg-[#eff0ec] p-3 px-5  rounded-lg'>Learn</li></Link>
                    <Link href={"/"}><li className='cursor-pointer hover:bg-[#eff0ec] p-3 px-5  rounded-lg'>Pricing</li></Link>
                </ul>
            </div>
            <div className="btns flex justify-center items-center gap-3">
                <button className="LogInBtn font-medium md:text-xl text-sm  bg-[#eff0ec] rounded-lg md:px-6 px-4 md:py-4 py-3 cursor-pointer hover:bg-[#e9e9e9]">Log in</button>
                <button className="signIn font-medium md:text-[18px] text-[12px] text-white bg-black py-4 md:px-6  px-4 rounded-full cursor-pointer hover:bg-[#262d3e]">Sign up free</button>
                <button
              
                    className="xl:hidden md:p-2   rounded-md hover:bg-gray-700"
                    aria-label="Open menu"
                >
                    <HiMenu size={34} />
                </button>


            </div>
        </nav>}</>
    )
}

export default Navbar
