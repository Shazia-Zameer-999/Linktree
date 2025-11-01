// "use client"
// import React from 'react'
// import { useLayoutEffect, useRef, useState, useEffect } from 'react';
// import gsap from 'gsap';
// import Typed from 'typed.js';
// import { FaArrowLeft } from "react-icons/fa6";
// import { FaArrowRight } from "react-icons/fa6";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { FaAppStore, FaGooglePlay, FaSpotify, FaTiktok, FaYoutube } from 'react-icons/fa';
// import { BsTwitterX, BsInstagram } from 'react-icons/bs';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';





// const Home = () => {
//   const router = useRouter()
//   const [text, setText] = useState("")

//   const createTree = () => {
//     router.push(`/generate?handle=${text}`)

//   }

//   const footerLinks = {
//     company: ["The Linktree Blog", "Engineering Blog", "Marketplace", "What's New", "About", "Press", "Careers", "Link in Bio", "Social Good", "Contact"],
//     community: ["Linktree for Enterprise", "2023 Creator Report", "2022 Creator Report", "Charities", "What's Trending", "Creator Profile Directory", "Explore Templates"],
//     support: ["Help Topics", "Getting Started", "Linktree Pro", "Features & How-Tos", "FAQs", "Report a Violation"],
//     trustLegal: ["Terms & Conditions", "Privacy Notice", "Cookie Notice", "Trust Center", "Cookie Preferences", "Transparency Report", "Law Enforcement Access Policy"],
//   };
//   const [isMounted, setIsMounted] = useState(false);
//   const typedTargetRef = useRef(null);
//   const marqueeContainerRef = useRef(null);
//   const typedInstance = useRef(null);
//   const img_slider = useRef(null)

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);
//   useLayoutEffect(() => {
//     if (!img_slider.current) return;
//     const slider = img_slider.current;
//     const firstSetWidth = slider.scrollWidth / 2;

//     const ctx = gsap.context(() => {
//       gsap.to(slider, {
//         x: -firstSetWidth,
//         ease: "none",
//         duration: 20,
//         repeat: -1,
//       });
//     })
//     return () => ctx.revert();

//   }, [])

//   useLayoutEffect(() => {
//     const container = marqueeContainerRef.current;

//     const ctx = gsap.context(() => {

//       gsap.matchMedia().add({
//         isMobile: `(max-width: 767px)`,

//         isDesktop: `(min-width: 768px)`,

//       }, (context) => {
//         let { isMobile, isDesktop } = context.conditions;

//         if (isMobile) {
//           const firstSetWidth = container.scrollWidth / 2;

//           gsap.to(container, {
//             x: -firstSetWidth,
//             ease: "none",
//             duration: 40,
//             repeat: -1,
//           });
//         }
//         if (isDesktop) {
//           const firstSetHeight = container.clientHeight / 2;

//           gsap.to(container, {
//             y: -firstSetHeight,
//             ease: "none",
//             duration: 10,
//             repeat: -1,
//           });
//         }
//       });

//     });

//     return () => ctx.revert();

//   }, []);
//   useEffect(() => {
//     if (isMounted) {
//       let ctx = gsap.context(() => {
//         gsap.fromTo(".fade-in-text",
//           { opacity: 0, y: 20 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 1,
//             delay: 0.2,
//             ease: "power3.out",
//             onComplete: () => {
//               const typedOptions = {
//                 strings: [
//                   "creators",
//                   "small businesses",
//                   "athletes",
//                   "models",
//                   "monetizers",
//                   "health educators",
//                   "streamers",
//                   "vloggers",
//                   "fitness coaches"

//                 ],
//                 typeSpeed: 50,
//                 backSpeed: 30,
//                 backDelay: 2000,
//                 loop: true,
//                 smartBackspace: true,
//               };
//               typedInstance.current = new Typed(typedTargetRef.current, typedOptions);
//             }
//           }
//         );

//       });

//       return () => {
//         ctx.revert();
//         if (typedInstance.current) {
//           typedInstance.current.destroy();
//         }
//       };
//     }
//   }, [isMounted]);
//   return (
//     <>
//       <main>
//         <section className='section-1 grid grid-cols-1 md:grid-cols-9 gap-4 bg-[#d2e823] min-h-screen justify-items-center align-items-center'>
//           <div className=' xl:col-span-5 col-span-6 max-[768px]:col-span-1 mt-[36%] lg:px-25 px-10 flex flex-col gap-6 '>
//             <h1 className='lg:text-8xl min-[500px]:text-6xl text-5xl   font-extrabold flex flex-wrap whitespace-break-spaces text-[#254f1a]'>A link in bio built for you.</h1>
//             <p className='max-[500px]:text-sm text-lg  text-[#254f1a] font-medium'>Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
//             <div className='flex w-full flex-col gap-4 md:flex-row md:gap-2'>
//               <input value={text} onChange={e => setText(e.target.value)}
//                 className='w-full flex-1 rounded-lg border-2 border-transparent bg-white p-4 text-lg outline-none focus:border-[#ddef50]'
//                 type="text"
//                 placeholder='Enter your handle'
//               />
//               <button onClick={() => { createTree() }} className='w-full shrink-0 rounded-full bg-[#254f1a] p-4 font-bold text-white md:w-auto md:px-8 cursor-pointer hover:bg-[#3a5930] transition-colors duration-300 ease-in-out'>
//                 Get started for free
//               </button>
//             </div>
//           </div>
//           <div className='xl:col-span-4 col-span-3 justify-items-center align-items-center' >
//             <div className="video-marquee-wrapper md:h-[100vh] mb-10 md:mb-0 overflow-hidden mt-10 md:mt-0">
//               <div
//                 className="video-marquee-container flex md:flex-col items-end md:mr-5 gap-9"
//                 ref={marqueeContainerRef}
//               >

//                 <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
//                   <source src="https://assets.production.linktr.ee/curate-assets/Kelsey-updated.mp4"></source>
//                 </video>
//                 <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
//                   <source src="https://assets.production.linktr.ee/curate-assets/Miles-updated.mp4"></source>
//                 </video>
//                 <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
//                   <source src="https://assets.production.linktr.ee/curate-assets/Koy-updated.mp4"></source>
//                 </video>
//                 <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
//                   <source src="https://assets.production.linktr.ee/curate-assets/Zay-2.mp4"></source>
//                 </video>
//                 <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
//                   <source src="https://assets.production.linktr.ee/curate-assets/Pistakio-updated.mp4"></source>
//                 </video>



//                 <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
//                   <source src="https://assets.production.linktr.ee/curate-assets/Kelsey-updated.mp4"></source>
//                 </video>
//                 <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
//                   <source src="https://assets.production.linktr.ee/curate-assets/Miles-updated.mp4"></source>
//                 </video>
//                 <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
//                   <source src="https://assets.production.linktr.ee/curate-assets/Koy-updated.mp4"></source>
//                 </video>
//                 <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
//                   <source src="https://assets.production.linktr.ee/curate-assets/Zay-2.mp4"></source>
//                 </video>
//                 <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
//                   <source src="https://assets.production.linktr.ee/curate-assets/Pistakio-updated.mp4"></source>
//                 </video>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="section-2 lg:flex-row flex flex-col   w-full relative  gap-4 bg-[#2665d6] min-h-[90vh] justify-center items-center pb-7">
//           <div className='md:w-1/2'>
//             <video className='lg:w-300 w-100 flex justify-center items-center mx-auto' id="customize-your-linktree" autoPlay playsInline loop muted >
//               <source src="https://assets.production.linktr.ee/static/curate/customise_your_linktree.webm" type="video/webm" />
//               <source className='' src="https://assets.production.linktr.ee/static/curate/customise_your_linktree.mp4" />
//             </video>
//           </div>
//           <div className='lg:w-1/2 mr-1 flex flex-col gap-6 px-4 '>
//             <h1 className='md:text-6xl text-4xl font-extrabold flex flex-wrap whitespace-break-spaces text-[#d2e823] text-center lg:text-start'>Create and customize your Linktree in minutes</h1>
//             <p className='lg:text-xl  text-white font-medium lg:mx-0 mx-auto text-center lg:text-start'>Connect all your content across social media, websites, stores and more in one link in bio. Customize every detail or let Linktree automatically enhance it to match your brand and drive more clicks.</p>
//             <div className='flex gap-2 mt-5'>
//               <Link href={'/generate'}><button className='bg-[#d2e823] lg:mx-0 mx-auto rounded-full px-18 font-bold text-black cursor-pointer p-4'>Get started for free</button></Link>
//             </div>
//           </div>

//         </section>
//         <section className="section-3 lg:flex-row flex flex-col  w-full relative  gap-4 bg-[#000000] min-h-[90vh] justify-center items-center pb-7">
//           <div className='md:w-1/2'>
//             <video className='lg:w-300 sm:w-100 w-70 flex justify-center items-center mx-auto  relative left-10' id="customize-your-linktree" autoPlay playsInline loop muted >

//               <source className='' src="/vi.mp4" />
//             </video>
//           </div>
//           <div className='lg:w-1/2 mr-1 flex flex-col gap-6 px-8 '>
//             <h1 className='md:text-6xl text-4xl font-extrabold flex flex-wrap whitespace-break-spaces text-[#e9c0e9] text-center lg:text-start'>Share your Linktree anywhere you like!</h1>
//             <p className='lg:text-xl  text-white font-medium lg:mx-0 mx-auto text-center lg:text-start'>Add your unique Linktree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic back to your link in bio.</p>
//             <div className='flex gap-2 mt-5'>
//               <Link href={'/generate'}><button className='bg-[#e9c0e9] lg:mx-0 mx-auto rounded-full px-18 font-bold text-black cursor-pointer p-4'>Get started for free</button></Link>
//             </div>
//           </div>

//         </section>
//         <section className="section-4 lg:flex-row flex flex-col  w-full relative  gap-4 bg-[#e8efd6] min-h-[90vh] justify-center items-center pb-7">
//           <div className='md:w-1/2'>
//             <img className='w-170' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68b80693934ab0ccd4bf7482_home-section-4.avif" alt="" />
//           </div>
//           <div className='lg:w-1/2 mr-1 flex flex-col gap-6 px-4 '>
//             <h1 className='md:text-6xl text-4xl font-extrabold flex flex-wrap whitespace-break-spaces text-[#000000] text-center lg:text-start'>Analyze your audience and keep them engaged</h1>
//             <p className='lg:text-xl  text-black font-medium lg:mx-0 mx-auto text-center lg:text-start'>Track your engagement over time, monitor revenue and learn what’s converting your audience. Make informed updates on the fly to keep them coming back.</p>
//             <div className='flex gap-2 mt-5'>
//               <Link href={'/generate'}><button className='bg-[#e9c0e9] lg:mx-0 mx-auto rounded-full px-18 font-bold text-black cursor-pointer p-4'>Get started for free</button></Link>
//             </div>
//           </div>

//         </section>
//         <section className='bg-[#f3f3f1] section-5 min-h-[80vh] flex gap-20 flex-col justify-center items-center overflow-x-hidden pt-15 '>
//           <div className='mx-5 h-[120px] mb-5'>
//             <div className='xl:text-7xl text-4xl font-extrabold text-black text-center'>The only link in bio trusted by 70M+
//             </div>
//             <span className='fade-in-text xl:text-7xl text-5xl font-extrabold text-[#2665d6] text-center flex justify-center items-center' ref={typedTargetRef}></span>
//           </div>
//           <div className="img_slider flex  gap-6" ref={img_slider}>
//             <img className='h-90 rounded-[100px] ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ba_selena-gomez.webp" alt="" />
//             <img className='h-90 rounded-[40px] ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ac_comedy-central.webp" alt="" />
//             <img className='h-90 rounded-lg  ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e937809_hbo.webp" alt="" />
//             <img className='h-90 rounded-[10px]' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb1449d48431e9376d8_pharrell.webp" alt="" />
//             <img className='h-90 rounded-full ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377da_tonyhawk.webp" alt="" />
//             <img className='h-90 rounded ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb1449d48431e937716_laclippers.webp" alt="" />
//             <img className='h-90 rounded-full ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e937786_funkynutmeg.webp" alt="" />


//             <img className='h-90 rounded-[100px] ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ba_selena-gomez.webp" alt="" />
//             <img className='h-90 rounded-[40px] ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ac_comedy-central.webp" alt="" />
//             <img className='h-90 rounded-lg  ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e937809_hbo.webp" alt="" />
//             <img className='h-90 rounded-[10px]' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb1449d48431e9376d8_pharrell.webp" alt="" />
//             <img className='h-90 rounded-full ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377da_tonyhawk.webp" alt="" />
//             <img className='h-90 rounded ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb1449d48431e937716_laclippers.webp" alt="" />
//             <img className='h-90 rounded-full ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e937786_funkynutmeg.webp" alt="" />
//           </div>
//         </section>
//         <section className="section-6 bg-[#f3f3f1] lg:flex-row lg:flex flex-col justify-center px-5 lg:px-20 min-h-[90vh] pt-20">
//           <div className='flex flex-col '>
//             <div className='flex flex-col bg-[#e9c0e9] m-2 pt-25 pb-10 px-15 rounded-[40px] gap-13 '>
//               <img className='w-150' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/680c13b834d3994a796896bd_all%20your%20things.avif" alt="" />
//               <p className='min-[480px]:text-2xl text-lg font-bold'>Share every type of content in limitless ways</p>
//             </div>
//             <div className='flex flex-col bg-[#d2e823] m-2 pt-15 pb-10 px-15 rounded-[40px] gap-8'>
//               <img className='w-130' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/680c16a391a7e027f3fbda59_products.avif" alt="" />
//               <p className='min-[480px]:text-2xl text-lg font-bold'>Sell products, collect payments and make monetization simple !</p>
//             </div>
//           </div>
//           <div className='flex flex-col text-white bg-[#061492] pt-5 pb-5  px-15 rounded-[40px] gap-13 m-2 items-center justify-center'>
//             <img className='lg:w-118 w-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68b80742d1d9216c45c6d6ea_group1597882005.avif" alt="" />
//             <p className='min-[480px]:text-2xl text-lg font-bold'>Grow, own and engage your audience across all of your channels</p>
//           </div>
//         </section>
//         <section className="section-7 bg-[#f3f3f1] py-30 md:px-0 px-1">
//           <div className='lg:w-2/3 flex flex-col lg:gap-70 md:gap-50 gap-35 justify-center items-center mx-auto'>
//             <div className='flex flex-col items-center justify-center gap-5'>
//               <h2 className='md:text-7xl text-4xl font-extrabold text-center'>The fast, friendly and powerful link in bio tool.</h2>
//               <button className='bg-[#e9c0e9] w-fit text-center sm:p-5 p-4 font-bold rounded-full sm:px-20 px-10'>Explore all plans</button>
//             </div>
//             <div className='flex flex-col gap-10'>
//               <h2 className='md:text-6xl text-3xl font-extrabold text-center'>As featured in...</h2>
//               <div className='flex flex-wrap gap-5 justify-center'>
//                 <div className=' bg-white py-6 md:px-20 px-7   rounded-full flex items-center justify-center '>
//                   <img className='md:w-40 w-30' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14f5d9e85733c5a9a48_group1597881647.avif" alt="" />
//                 </div>
//                 <div className=' bg-white py-6 md:px-20 px-7   rounded-full flex items-center justify-center '>
//                   <img className='md:w-20 w-20' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14f97d207e420a58182_insiderlogo1.avif" alt="" />
//                 </div>
//                 <div className=' bg-white py-6 md:px-20 px-7    rounded-full flex items-center justify-center '>
//                   <img className='md:w-20 w-20' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14fd2540b94aa830d59_forbes-blue-grey.avif" alt="" />
//                 </div>
//                 <div className=' bg-white py-6 md:px-20 px-7    rounded-full flex items-center justify-center '>
//                   <img className='md:w-30 w-20' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14fe75d954138be7db4_mashable_logo_(2021)1.avif" alt="" />
//                 </div>
//                 <div className=' bg-white py-6 md:px-20 px-7    rounded-full flex items-center justify-center '>
//                   <img className='md:w-30 w-20' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14f1230aaa3bbd0a99a_entrepreneur-blue-grey__2_.avif" alt="" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="section-8 py-10 pb-15 bg-[#f3f3f1]">
//           <div className='flex flex-col gap-10 justify-center items-center min-[1300px]:w-[50%] mx-auto min-[1300px]::px-0 px-5'>
//             <img className='w-210' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66864533566fcb42ef955aad_Testimonial-Riley-Lemon.webp" alt="" />
//             <h2 className='min-[890px]:text-5xl min-[500px]:text-3xl text-2xl font-extrabold text-center'>“Linktree simplifies the process for creators to share multiple parts of themselves in one inclusive link.”</h2>
//             <div className='text-center text-slate-600 text-lg font-medium'>
//               <p>Riley Lemon,</p>
//               <p>Youtuber, Content Creator</p>
//             </div>
//             <div className='flex gap-2'>
//               <div className='border p-3 rounded cursor-pointer'>
//                 <FaArrowLeft />
//               </div>
//               <div className='border p-3 rounded cursor-pointer'>
//                 <FaArrowRight />
//               </div>

//             </div>
//           </div>
//         </section>
//         <section className="section-9 bg-[#780016] text-[#e9c0e9] min-h-[100vh] py-20 relative w-full">
//           <div className='md:w-[80vw] w-[95vw] mx-auto justify-center items-center flex flex-col gap-10'>
//             <h2 className='md:text-6xl text-4xl font-extrabold text-center'>Questions? Answered</h2>
//             <div className='flex flex-col md:gap-5 gap-3 justify-center items-center w-[100%]'>
//               <div className='bg-[#51000f] w-full flex justify-between px-10 md:py-10 py-6 gap-8 items-center rounded-[25px] hover:border-[#a44856] hover:border-1 '>
//                 <span className='sm:text-2xl font-bold'> Why do i need a link in bio tool?</span>
//                 <div>
//                   <MdKeyboardArrowDown className='size-7 cursor-pointer' />
//                 </div>
//               </div>
//               <div className='bg-[#51000f] w-full flex justify-between px-10 md:py-10 py-6 gap-10 items-center rounded-[25px] hover:border-[#a44856] hover:border-1 '>
//                 <span className='sm:text-2xl font-bold'> Why do i need a link in bio tool?</span>
//                 <div>
//                   <MdKeyboardArrowDown className='size-7 cursor-pointer' />
//                 </div>
//               </div>
//               <div className='bg-[#51000f] w-full flex justify-between px-10 md:py-10 py-6 gap-10 items-center rounded-[25px] hover:border-[#a44856] hover:border-1 '>
//                 <span className='sm:text-2xl font-bold'> Why do i need a link in bio tool?</span>
//                 <div>
//                   <MdKeyboardArrowDown className='size-7 cursor-pointer' />
//                 </div>
//               </div>
//               <div className='bg-[#51000f] w-full flex justify-between px-10 md:py-10 py-6 gap-10 items-center rounded-[25px] hover:border-[#a44856] hover:border-1 '>
//                 <span className='sm:text-2xl font-bold'> Why do i need a link in bio tool?</span>
//                 <div>
//                   <MdKeyboardArrowDown className='size-7 cursor-pointer' />
//                 </div>
//               </div>
//               <div className='bg-[#51000f] w-full flex justify-between px-10 md:py-10 py-6 gap-10 items-center rounded-[25px] hover:border-[#a44856] hover:border-1 '>
//                 <span className='sm:text-2xl font-bold'> Why do i need a link in bio tool?</span>
//                 <div>
//                   <MdKeyboardArrowDown className='size-7 cursor-pointer' />
//                 </div>
//               </div>
//               <div className='bg-[#51000f] w-full flex justify-between px-10 md:py-10 py-6 gap-10 items-center rounded-[25px] hover:border-[#a44856] hover:border-1 '>
//                 <span className='sm:text-2xl font-bold'> Why do i need a link in bio tool?</span>
//                 <div>
//                   <MdKeyboardArrowDown className='size-7 cursor-pointer' />
//                 </div>
//               </div>
//               <div className='bg-[#51000f] w-full flex justify-between px-10 md:py-10 py-6 gap-10 items-center rounded-[25px] hover:border-[#a44856] hover:border-1 '>
//                 <span className='sm:text-2xl font-bold'> Why do i need a link in bio tool?</span>
//                 <div>
//                   <MdKeyboardArrowDown className='size-7 cursor-pointer' />
//                 </div>
//               </div>
//               <div className='bg-[#51000f] w-full flex justify-between px-10 md:py-10 py-6 gap-10 items-center rounded-[25px] hover:border-[#a44856] hover:border-1 '>
//                 <span className='sm:text-2xl font-bold'> Why do i need a link in bio tool?</span>
//                 <div>
//                   <MdKeyboardArrowDown className='size-7 cursor-pointer' />
//                 </div>
//               </div>
//               <div className='bg-[#51000f] w-full flex justify-between px-10 md:py-10 py-6 gap-10 items-center rounded-[25px] hover:border-[#a44856] hover:border-1 '>
//                 <span className='sm:text-2xl font-bold'> Why do i need a link in bio tool?</span>
//                 <div>
//                   <MdKeyboardArrowDown className='size-7 cursor-pointer' />
//                 </div>
//               </div>



//             </div>
//           </div>
//         </section>
//         <section className="section-10 min-h-[100vh] bg-[#502274]  md:pt-60 pt-30">
//           <div className='flex-flex-col justify-center items-center relative '>
//             <div className='flex flex-col gap-8 justify-center items-center xl:w-[50%] mx-auto text-center relative z-30'>
//               <h1 className='min-[1300px]:text-7xl text-5xl font-extrabold text-[#e9c0e9]'>Jumpstart your corner of the
//                 internet today</h1>
//               <div className='flex gap-3 items-center justify-center max-[560px]:flex-col' >
//                 <input value={text} onChange={e => setText(e.target.value)} className='bg-white p-5 md:pr-24 pr-12 rounded-lg' placeholder='linktr.ee/' type="text" />
//                 <button onClick={() => { createTree() }} className='text-black font-bold bg-[#d2e823] rounded-full p-5 sm:px-7 md
//                 :px-18 px-15'>Claim your Linktree</button>
//               </div>
//             </div>
//             <img className='absolute lg:w-100 md:w-90  min-[400px]:w-70 w-60  top-0   z-20 rotate-18' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66710696806e843c0058943b_download.svg" alt="" />
//             <img className='absolute min-[550px]:w-55 min-[490px]:w-50 w-30 lg:w-56 right-5 min-[490px]:right-9 top-[300px] min-[550px]:top-[220px] lg:top-[400px] z-20 rotate-18' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/666b365b622379ae753964b8_footer-flower.svg" alt="" />

//             <footer className=" py-12 px-4 sm:px-6 lg:px-8 lg:mt-50 md:mt-30 sm:mt-15 mt-5 relative z-30">
//               <div className="max-w-screen-xl mx-auto bg-white p-8 sm:p-12 rounded-2xl">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                   <div>
//                     <h3 className="font-bold text-lg mb-4">Company</h3>
//                     <ul className="space-y-2">
//                       {footerLinks.company.map((link) => (
//                         <li key={link}>
//                           <a href="#" className="text-gray-600 hover:text-black hover:underline">{link}</a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div>
//                     <h3 className="font-bold text-lg mb-4">Community</h3>
//                     <ul className="space-y-2">
//                       {footerLinks.community.map((link) => (
//                         <li key={link}>
//                           <a href="#" className="text-gray-600 hover:text-black hover:underline">{link}</a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div>
//                     <h3 className="font-bold text-lg mb-4">Support</h3>
//                     <ul className="space-y-2">
//                       {footerLinks.support.map((link) => (
//                         <li key={link}>
//                           <a href="#" className="text-gray-600 hover:text-black hover:underline">{link}</a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div>
//                     <h3 className="font-bold text-lg mb-4">Trust & Legal</h3>
//                     <ul className="space-y-2">
//                       {footerLinks.trustLegal.map((link) => (
//                         <li key={link}>
//                           <a href="#" className="text-gray-600 hover:text-black hover:underline">{link}</a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
//                   <div className="flex items-center gap-3">
//                     <button className="font-semibold py-3 px-10 rounded-full border border-gray-300 hover:bg-gray-100">
//                       Log in
//                     </button>
//                     <Link href={'/generate'}><button className="font-semibold py-3 px-6 rounded-full bg-[#d2e823] hover:bg-opacity-80">
//                       Get started for free
//                     </button></Link>
//                   </div>

//                   <div className="flex items-center flex-wrap justify-center gap-4 ">
//                     <a className='w-30 border rounded-full  p-2 bg-[#1e2330] px-3 ' href="#" aria-label="Download on the App Store ">
//                       <img src="/playStore.svg" alt="App Store" className="h-12" />
//                     </a>
//                     <a className='w-30 border rounded-full  p-2 bg-[#1e2330] px-3 ' href="#" aria-label="Get it on Google Play">
//                       <img src="/google.svg" alt="Google Play" className="h-12" />
//                     </a>
//                     <div className="flex items-center gap-3">
//                       <a href="#" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="Spotify">
//                         <FaSpotify size={20} />
//                       </a>
//                       <a href="#" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="Tiktok">
//                         <FaTiktok size={20} />
//                       </a>
//                       <a href="#" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="X formerly Twitter">
//                         <BsTwitterX size={20} />
//                       </a>
//                       <a href="#" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="Instagram">
//                         <BsInstagram size={20} />
//                       </a>
//                       <a href="#" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="YouTube">
//                         <FaYoutube size={20} />
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-center items-center gap-4 mt-8">
//                 <img src="/flag1.svg" className="h-12" />
//                 <img src="/flag2.svg" className="h-12" />
//               </div>
//               <p className='mt-5 text-center text-[#e9c0e9] lg:text-lg text-sm'>We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, present and emerging. Linktree Pty Ltd (ABN 68 608 721 562), 1-9 Sackville St, Collingwood VIC 3066</p>
//             </footer>
//           </div>


//         </section>

//       </main>
//     </>
//   )
// }

// export default Home
"use client"
import React from 'react'
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import Typed from 'typed.js';
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaAppStore, FaGooglePlay, FaSpotify, FaTiktok, FaYoutube } from 'react-icons/fa';
import { BsTwitterX, BsInstagram } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';



import { FaChevronDown } from 'react-icons/fa'; // We only need one icon
import { useState } from 'react';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Re-added the bottom border to separate items
    <div className="border-b border-white/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none"
      >
        <h3 className="text-lg font-medium text-slate-100">{question}</h3>

        {/* Swapped back to blue and now we rotate the icon */}
        <span className={`
            text-blue-400 
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'rotate-180' : 'rotate-0'} 
        `}>
          <FaChevronDown size={20} />
        </span>
      </button>

      {/* This animation logic is still perfect */}
      <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="pb-5 px-6 text-slate-400">
          {answer}
        </div>
      </div>
    </div>
  );
};


const Home = () => {
  const faqs = [
    {
      question: "What is this service?",
      answer: "This is a 'link in bio' platform. It lets you create one simple, beautiful page to hold all your important links. You can then share that single link on your social media profiles (like Instagram, TikTok, or Twitter) to direct your followers to your website, store, or other social media accounts."
    },
    {
      question: "How do I get started?",
      answer: "It's easy! Just claim your unique handle on the homepage. Once you sign up, you'll get access to your personal dashboard where you can start adding your links, customizing your page's look, and more."
    },
    {
      question: "Is this service free to use?",
      answer: "Yes, our core service is completely free! You can add unlimited links and customize your profile. We may add premium features in the future, but the essentials will always be free for everyone."
    },
    {
      question: "Where should I put my new link?",
      answer: "Anywhere and everywhere! The most common places are your Instagram bio, TikTok profile, and Twitter/X profile. You can also add it to your email signature, your YouTube channel description, or even on a business card."
    },
    {
      question: "Can I customize my page?",
      answer: "Absolutely. You can upload your own profile picture, add a bio, and customize the links to match your personal brand. This is your personal landing page."
    },
    {
      question: "I have a question or need help.",
      answer: "We're here for you! If you have any questions or need assistance, please feel free to reach out to us through our contact page or email us at datendiva.mailer@gmail.com."
    }
  ];

  const router = useRouter()
  const [text, setText] = useState("")

  const createTree = () => {
    router.push(`/generate?handle=${text}`)

  }

  const footerLinks = {
    company: ["The Linktree Blog", "Engineering Blog", "Marketplace", "What's New", "About", "Press", "Careers", "Link in Bio", "Social Good", "Contact"],
    community: ["Linktree for Enterprise", "2023 Creator Report", "2022 Creator Report", "Charities", "What's Trending", "Creator Profile Directory", "Explore Templates"],
    support: ["Help Topics", "Getting Started", "Linktree Pro", "Features & How-Tos", "FAQs", "Report a Violation"],
    trustLegal: ["Terms & Conditions", "Privacy Notice", "Cookie Notice", "Trust Center", "Cookie Preferences", "Transparency Report", "Law Enforcement Access Policy"],
  };
  const [isMounted, setIsMounted] = useState(false);
  const typedTargetRef = useRef(null);
  const marqueeContainerRef = useRef(null);
  const typedInstance = useRef(null);
  const img_slider = useRef(null)

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useLayoutEffect(() => {
    if (!img_slider.current) return;
    const slider = img_slider.current;
    const firstSetWidth = slider.scrollWidth / 2;

    const ctx = gsap.context(() => {
      gsap.to(slider, {
        x: -firstSetWidth,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    })
    return () => ctx.revert();

  }, [])

  useLayoutEffect(() => {
    const container = marqueeContainerRef.current;

    const ctx = gsap.context(() => {

      gsap.matchMedia().add({
        isMobile: `(max-width: 767px)`,

        isDesktop: `(min-width: 768px)`,

      }, (context) => {
        let { isMobile, isDesktop } = context.conditions;

        if (isMobile) {
          const firstSetWidth = container.scrollWidth / 2;

          gsap.to(container, {
            x: -firstSetWidth,
            ease: "none",
            duration: 40,
            repeat: -1,
          });
        }
        if (isDesktop) {
          const firstSetHeight = container.clientHeight / 2;

          gsap.to(container, {
            y: -firstSetHeight,
            ease: "none",
            duration: 10,
            repeat: -1,
          });
        }
      });

    });

    return () => ctx.revert();

  }, []);
  useEffect(() => {
    if (isMounted) {
      let ctx = gsap.context(() => {
        gsap.fromTo(".fade-in-text",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            onComplete: () => {
              const typedOptions = {
                strings: [
                  "creators",
                  "small businesses",
                  "athletes",
                  "models",
                  "monetizers",
                  "health educators",
                  "streamers",
                  "vloggers",
                  "fitness coaches"

                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                smartBackspace: true,
              };
              typedInstance.current = new Typed(typedTargetRef.current, typedOptions);
            }
          }
        );

      });

      return () => {
        ctx.revert();
        if (typedInstance.current) {
          typedInstance.current.destroy();
        }
      };
    }
  }, [isMounted]);
  return (
    <>
      <main>
        <section className='section-1 grid grid-cols-1 md:grid-cols-9 gap-4 bg-[#d2e823] min-h-screen justify-items-center align-items-center'>
          <div className=' xl:col-span-5 col-span-6 max-[768px]:col-span-1 mt-[36%] lg:px-25 px-10 flex flex-col gap-6 '>
            <h1 className='lg:text-8xl min-[500px]:text-6xl text-5xl   font-extrabold flex flex-wrap whitespace-break-spaces text-[#254f1a]'>A link in bio built for you.</h1>
            <p className='max-[500px]:text-sm text-lg  text-[#254f1a] font-medium'>Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
            <div className='flex w-full flex-col gap-4 md:flex-row md:gap-2'>
              <input value={text} onChange={e => setText(e.target.value)}
                className='w-full flex-1 rounded-lg border-2 border-transparent bg-white p-4 text-lg outline-none focus:border-[#ddef50]'
                type="text"
                placeholder='Enter your handle'
              />
              <button onClick={() => { createTree() }} className='w-full shrink-0 rounded-full bg-[#254f1a] p-4 font-bold text-white md:w-auto md:px-8 cursor-pointer hover:bg-[#3a5930] transition-colors duration-300 ease-in-out'>
                Get started for free
              </button>
            </div>
          </div>
          <div className='xl:col-span-4 col-span-3 justify-items-center align-items-center' >
            <div className="video-marquee-wrapper md:h-[100vh] mb-10 md:mb-0 overflow-hidden mt-10 md:mt-0">
              <div
                className="video-marquee-container flex md:flex-col items-end md:mr-5 gap-9"
                ref={marqueeContainerRef}
              >

                <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Kelsey-updated.mp4"></source>
                </video>
                <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Miles-updated.mp4"></source>
                </video>
                <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Koy-updated.mp4"></source>
                </video>
                <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Zay-2.mp4"></source>
                </video>
                <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Pistakio-updated.mp4"></source>
                </video>



                <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Kelsey-updated.mp4"></source>
                </video>
                <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Miles-updated.mp4"></source>
                </video>
                <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Koy-updated.mp4"></source>
                </video>
                <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Zay-2.mp4"></source>
                </video>
                <video className="marquee-video rounded-[2rem] xl:w-[660px] w-[330px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Pistakio-updated.mp4"></source>
                </video>
              </div>
            </div>
          </div>
        </section>
        <section className="section-2 lg:flex-row flex flex-col   w-full relative  gap-4 bg-[#2665d6] min-h-[90vh] justify-center items-center pb-7">
          <div className='md:w-1/2'>
            <video className='lg:w-300 w-100 flex justify-center items-center mx-auto' id="customize-your-linktree" autoPlay playsInline loop muted >
              <source src="https://assets.production.linktr.ee/static/curate/customise_your_linktree.webm" type="video/webm" />
              <source className='' src="https://assets.production.linktr.ee/static/curate/customise_your_linktree.mp4" />
            </video>
          </div>
          <div className='lg:w-1/2 mr-1 flex flex-col gap-6 px-4 '>
            <h1 className='md:text-6xl text-4xl font-extrabold flex flex-wrap whitespace-break-spaces text-[#d2e823] text-center lg:text-start'>Create and customize your Linktree in minutes</h1>
            <p className='lg:text-xl  text-white font-medium lg:mx-0 mx-auto text-center lg:text-start'>Connect all your content across social media, websites, stores and more in one link in bio. Customize every detail or let Linktree automatically enhance it to match your brand and drive more clicks.</p>
            <div className='flex gap-2 mt-5'>
              <Link href={'/generate'}><button className='bg-[#d2e823] lg:mx-0 mx-auto rounded-full px-18 font-bold text-black cursor-pointer p-4'>Get started for free</button></Link>
            </div>
          </div>

        </section>
        <section className="section-3 lg:flex-row flex flex-col  w-full relative  gap-4 bg-[#000000] min-h-[90vh] justify-center items-center pb-7">
          <div className='md:w-1/2'>
            <video className='lg:w-300 sm:w-100 w-70 flex justify-center items-center mx-auto  relative left-10' id="customize-your-linktree" autoPlay playsInline loop muted >

              <source className='' src="/vi.mp4" />
            </video>
          </div>
          <div className='lg:w-1/2 mr-1 flex flex-col gap-6 px-8 '>
            <h1 className='md:text-6xl text-4xl font-extrabold flex flex-wrap whitespace-break-spaces text-[#e9c0e9] text-center lg:text-start'>Share your Linktree anywhere you like!</h1>
            <p className='lg:text-xl  text-white font-medium lg:mx-0 mx-auto text-center lg:text-start'>Add your unique Linktree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic back to your link in bio.</p>
            <div className='flex gap-2 mt-5'>
              <Link href={'/generate'}><button className='bg-[#e9c0e9] lg:mx-0 mx-auto rounded-full px-18 font-bold text-black cursor-pointer p-4'>Get started for free</button></Link>
            </div>
          </div>

        </section>
        <section className="section-4 lg:flex-row flex flex-col  w-full relative  gap-4 bg-[#e8efd6] min-h-[90vh] justify-center items-center pb-7">
          <div className='md:w-1/2'>
            <img className='w-170' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68b80693934ab0ccd4bf7482_home-section-4.avif" alt="" />
          </div>
          <div className='lg:w-1/2 mr-1 flex flex-col gap-6 px-4 '>
            <h1 className='md:text-6xl text-4xl font-extrabold flex flex-wrap whitespace-break-spaces text-[#000000] text-center lg:text-start'>Analyze your audience and keep them engaged</h1>
            <p className='lg:text-xl  text-black font-medium lg:mx-0 mx-auto text-center lg:text-start'>Track your engagement over time, monitor revenue and learn what’s converting your audience. Make informed updates on the fly to keep them coming back.</p>
            <div className='flex gap-2 mt-5'>
              <Link href={'/generate'}><button className='bg-[#e9c0e9] lg:mx-0 mx-auto rounded-full px-18 font-bold text-black cursor-pointer p-4'>Get started for free</button></Link>
            </div>
          </div>

        </section>
        <section className='bg-[#f3f3f1] section-5 min-h-[80vh] flex gap-20 flex-col justify-center items-center overflow-x-hidden pt-15 '>
          <div className='mx-5 h-[120px] mb-5'>
            <div className='xl:text-7xl text-4xl font-extrabold text-black text-center'>The only link in bio trusted by 70M+
            </div>
            <span className='fade-in-text xl:text-7xl text-5xl font-extrabold text-[#2665d6] text-center flex justify-center items-center' ref={typedTargetRef}></span>
          </div>
          <div className="img_slider flex  gap-6" ref={img_slider}>
            <img className='h-90 rounded-[100px] ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ba_selena-gomez.webp" alt="" />
            <img className='h-90 rounded-[40px] ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ac_comedy-central.webp" alt="" />
            <img className='h-90 rounded-lg  ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e937809_hbo.webp" alt="" />
            <img className='h-90 rounded-[10px]' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb1449d48431e9376d8_pharrell.webp" alt="" />
            <img className='h-90 rounded-full ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377da_tonyhawk.webp" alt="" />
            <img className='h-90 rounded ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb1449d48431e937716_laclippers.webp" alt="" />
            <img className='h-90 rounded-full ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e937786_funkynutmeg.webp" alt="" />


            <img className='h-90 rounded-[100px] ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ba_selena-gomez.webp" alt="" />
            <img className='h-90 rounded-[40px] ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ac_comedy-central.webp" alt="" />
            <img className='h-90 rounded-lg  ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e937809_hbo.webp" alt="" />
            <img className='h-90 rounded-[10px]' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb1449d48431e9376d8_pharrell.webp" alt="" />
            <img className='h-90 rounded-full ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377da_tonyhawk.webp" alt="" />
            <img className='h-90 rounded ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb1449d48431e937716_laclippers.webp" alt="" />
            <img className='h-90 rounded-full ' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e937786_funkynutmeg.webp" alt="" />
          </div>
        </section>
        <section className="section-6 bg-[#f3f3f1] lg:flex-row lg:flex flex-col justify-center px-5 lg:px-20 min-h-[90vh] pt-20">
          <div className='flex flex-col '>
            <div className='flex flex-col bg-[#e9c0e9] m-2 pt-25 pb-10 px-15 rounded-[40px] gap-13 '>
              <img className='w-150' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/680c13b834d3994a796896bd_all%20your%20things.avif" alt="" />
              <p className='min-[480px]:text-2xl text-lg font-bold'>Share every type of content in limitless ways</p>
            </div>
            <div className='flex flex-col bg-[#d2e823] m-2 pt-15 pb-10 px-15 rounded-[40px] gap-8'>
              <img className='w-130' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/680c16a391a7e027f3fbda59_products.avif" alt="" />
              <p className='min-[480px]:text-2xl text-lg font-bold'>Sell products, collect payments and make monetization simple !</p>
            </div>
          </div>
          <div className='flex flex-col text-white bg-[#061492] pt-5 pb-5  px-15 rounded-[40px] gap-13 m-2 items-center justify-center'>
            <img className='lg:w-118 w-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68b80742d1d9216c45c6d6ea_group1597882005.avif" alt="" />
            <p className='min-[480px]:text-2xl text-lg font-bold'>Grow, own and engage your audience across all of your channels</p>
          </div>
        </section>
        <section className="section-7 bg-[#f3f3f1] py-30 md:px-0 px-1">
          <div className='lg:w-2/3 flex flex-col lg:gap-70 md:gap-50 gap-35 justify-center items-center mx-auto'>
            <div className='flex flex-col items-center justify-center gap-5'>
              <h2 className='md:text-7xl text-4xl font-extrabold text-center'>The fast, friendly and powerful link in bio tool.</h2>
              <button className='bg-[#e9c0e9] w-fit text-center sm:p-5 p-4 font-bold rounded-full sm:px-20 px-10'>Explore all plans</button>
            </div>
            <div className='flex flex-col gap-10'>
              <h2 className='md:text-6xl text-3xl font-extrabold text-center'>As featured in...</h2>
              <div className='flex flex-wrap gap-5 justify-center'>
                <div className=' bg-white py-6 md:px-20 px-7   rounded-full flex items-center justify-center '>
                  <img className='md:w-40 w-30' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14f5d9e85733c5a9a48_group1597881647.avif" alt="" />
                </div>
                <div className=' bg-white py-6 md:px-20 px-7   rounded-full flex items-center justify-center '>
                  <img className='md:w-20 w-20' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14f97d207e420a58182_insiderlogo1.avif" alt="" />
                </div>
                <div className=' bg-white py-6 md:px-20 px-7    rounded-full flex items-center justify-center '>
                  <img className='md:w-20 w-20' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14fd2540b94aa830d59_forbes-blue-grey.avif" alt="" />
                </div>
                <div className=' bg-white py-6 md:px-20 px-7    rounded-full flex items-center justify-center '>
                  <img className='md:w-30 w-20' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14fe75d954138be7db4_mashable_logo_(2021)1.avif" alt="" />
                </div>
                <div className=' bg-white py-6 md:px-20 px-7    rounded-full flex items-center justify-center '>
                  <img className='md:w-30 w-20' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14f1230aaa3bbd0a99a_entrepreneur-blue-grey__2_.avif" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-8 py-10 pb-15 bg-[#f3f3f1]">
          <div className='flex flex-col gap-10 justify-center items-center min-[1300px]:w-[50%] mx-auto min-[1300px]::px-0 px-5'>
            <img className='w-210' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66864533566fcb42ef955aad_Testimonial-Riley-Lemon.webp" alt="" />
            <h2 className='min-[890px]:text-5xl min-[500px]:text-3xl text-2xl font-extrabold text-center'>“Linktree simplifies the process for creators to share multiple parts of themselves in one inclusive link.”</h2>
            <div className='text-center text-slate-600 text-lg font-medium'>
              <p>Riley Lemon,</p>
              <p>Youtuber, Content Creator</p>
            </div>
            <div className='flex gap-2'>
              <div className='border p-3 rounded cursor-pointer'>
                <FaArrowLeft />
              </div>
              <div className='border p-3 rounded cursor-pointer'>
                <FaArrowRight />
              </div>

            </div>
          </div>
        </section>
        <section className="section-9 bg-[#780016] text-[#e9c0e9] min-h-[100vh] py-20 relative w-full">
          <div className="text-white container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center flex-col items-center h-[40vh] gap-4 text-center">
              <h1 className="font-bold text-4xl sm:text-5xl">Frequently Asked Questions</h1>
              <p className="max-w-2xl text-base sm:text-lg text-slate-300">
                Have a question? We're here to help. Find answers to common questions about our platform below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto my-12">
              {/* THIS IS THE CONTAINER you see in the screenshot.
                  It has the dark background and rounded corners.
                */}
              <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                {faqs.map((faq, index) => (
                  <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>

        </section>
        <section className="section-10 min-h-[100vh] bg-[#502274]  md:pt-60 pt-30">
          <div className='flex-flex-col justify-center items-center relative '>
            <div className='flex flex-col gap-8 justify-center items-center xl:w-[50%] mx-auto text-center relative z-30'>
              <h1 className='min-[1300px]:text-7xl text-5xl font-extrabold text-[#e9c0e9]'>Jumpstart your corner of the
                internet today</h1>
              <div className='flex gap-3 items-center justify-center max-[560px]:flex-col' >
                <input value={text} onChange={e => setText(e.target.value)} className='bg-white p-5 md:pr-24 pr-12 rounded-lg' placeholder='linktr.ee/' type="text" />
                <button onClick={() => { createTree() }} className='text-black font-bold bg-[#d2e823] rounded-full p-5 sm:px-7 md
                :px-18 px-15'>Claim your Linktree</button>
              </div>
            </div>
            <img className='absolute lg:w-100 md:w-90  min-[400px]:w-70 w-60  top-0   z-20 rotate-18' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66710696806e843c0058943b_download.svg" alt="" />
            <img className='absolute min-[550px]:w-55 min-[490px]:w-50 w-30 lg:w-56 right-5 min-[490px]:right-9 top-[300px] min-[550px]:top-[220px] lg:top-[400px] z-20 rotate-18' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/666b365b622379ae753964b8_footer-flower.svg" alt="" />

            <footer className=" py-12 px-4 sm:px-6 lg:px-8 lg:mt-50 md:mt-30 sm:mt-15 mt-5 relative z-30">
              <div className="max-w-screen-xl mx-auto bg-white p-8 sm:p-12 rounded-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Company</h3>
                    <ul className="space-y-2">
                      {footerLinks.company.map((link) => (
                        <li key={link}>
                          <a href="#" className="text-gray-600 hover:text-black hover:underline">{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Community</h3>
                    <ul className="space-y-2">
                      {footerLinks.community.map((link) => (
                        <li key={link}>
                          <a href="#" className="text-gray-600 hover:text-black hover:underline">{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Support</h3>
                    <ul className="space-y-2">
                      {footerLinks.support.map((link) => (
                        <li key={link}>
                          <a href="#" className="text-gray-600 hover:text-black hover:underline">{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Trust & Legal</h3>
                    <ul className="space-y-2">
                      {footerLinks.trustLegal.map((link) => (
                        <li key={link}>
                          <a href="#" className="text-gray-600 hover:text-black hover:underline">{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-3">
                    <button className="font-semibold py-3 px-10 rounded-full border border-gray-300 hover:bg-gray-100">
                      Log in
                    </button>
                    <Link href={'/generate'}><button className="font-semibold py-3 px-6 rounded-full bg-[#d2e823] hover:bg-opacity-80">
                      Get started for free
                    </button></Link>
                  </div>

                  <div className="flex items-center flex-wrap justify-center gap-4 ">
                    <a className='w-30 border rounded-full  p-2 bg-[#1e2330] px-3 ' href="#" aria-label="Download on the App Store ">
                      <img src="/playStore.svg" alt="App Store" className="h-12" />
                    </a>
                    <a className='w-30 border rounded-full  p-2 bg-[#1e2330] px-3 ' href="#" aria-label="Get it on Google Play">
                      <img src="/google.svg" alt="Google Play" className="h-12" />
                    </a>
                    <div className="flex items-center gap-3">
                      <a href="#" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="Spotify">
                        <FaSpotify size={20} />
                      </a>
                      <a href="#" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="Tiktok">
                        <FaTiktok size={20} />
                      </a>
                      <a href="#" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="X formerly Twitter">
                        <BsTwitterX size={20} />
                      </a>
                      <a href="#" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="Instagram">
                        <BsInstagram size={20} />
                      </a>
                      <a href="#" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="YouTube">
                        <FaYoutube size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 mt-8">
                <img src="/flag1.svg" className="h-12" />
                <img src="/flag2.svg" className="h-12" />
              </div>
              <p className='mt-5 text-center text-[#e9c0e9] lg:text-lg text-sm'>We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, present and emerging. Linktree Pty Ltd (ABN 68 608 721 562), 1-9 Sackville St, Collingwood VIC 3066</p>
            </footer>
          </div>


        </section>

      </main>
    </>
  )
}

export default Home
