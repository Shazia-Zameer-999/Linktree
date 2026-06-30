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


const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
  
    <div className="border-b border-white/20"> 
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left focus:outline-none sm:px-6"
      >
        <h3 className="text-base font-medium text-slate-100 sm:text-lg">{question}</h3>

    
        <span className={`
                    text-blue-400 
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'rotate-180' : 'rotate-0'} 
                `}>
          <FaChevronDown size={20} />
        </span>
      </button>

  
      <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-4 pb-5 text-sm text-slate-400 sm:px-6 sm:text-base">
          {answer}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const testimonials = [
    {
      image: "https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66864533566fcb42ef955aad_Testimonial-Riley-Lemon.webp",
      quote: "Linktree simplifies the process for creators to share multiple parts of themselves in one inclusive link.",
      name: "Riley Lemon",
      role: "YouTuber, Content Creator",
    },
    {
      image: "/image%20copy.png",
      quote: "One clear place for my workouts, community, and brand makes it much easier for people to find what they need.",
      name: "Kelsey Rose",
      role: "Trainer and Founder",
    },
    {
      image: "/image%20copy%202.png",
      quote: "My audience can discover my music, videos, and latest releases without searching across different platforms.",
      name: "Zay Dante",
      role: "Musician and Creator",
    },
  ];

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
      answer: "We're here for you! If you have any questions or need assistance, please feel free to reach out to us through our contact page or email us at Shazia.mailer@gmail.com."
    }
  ];

  const router = useRouter()
  const [text, setText] = useState("")
  const [handleError, setHandleError] = useState("")
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const createTree = () => {
    const cleanHandle = text.trim().replace(/^@/, "")

    if (!cleanHandle) {
      setHandleError("Please enter a handle first.")
      return
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(cleanHandle)) {
      setHandleError("Use only letters, numbers, underscores, or hyphens.")
      return
    }

    setHandleError("")
    router.push(`/generate?handle=${encodeURIComponent(cleanHandle)}`)

  }

  const updateHandle = (event) => {
    setText(event.target.value)
    if (handleError) setHandleError("")
  }

  const showPreviousTestimonial = () => {
    setTestimonialIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  const showNextTestimonial = () => {
    setTestimonialIndex((current) => (current + 1) % testimonials.length)
  }

  const openExistingProfile = () => {
    const enteredHandle = window.prompt("Enter your Linktree handle")
    const cleanHandle = enteredHandle?.trim().replace(/^@/, "")

    if (!cleanHandle) return

    if (!/^[a-zA-Z0-9_-]+$/.test(cleanHandle)) {
      window.alert("Use only letters, numbers, underscores, or hyphens.")
      return
    }

    router.push(`/${encodeURIComponent(cleanHandle)}`)
  }

  const activeTestimonial = testimonials[testimonialIndex]

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
        <section id="home" className='section-1 scroll-mt-24 grid min-h-screen grid-cols-1 items-center justify-items-center gap-4 overflow-hidden bg-[#d2e823] md:grid-cols-9'>
          <div className='col-span-1 flex w-full max-w-4xl flex-col gap-6 px-5 pb-10 pt-32 sm:px-10 md:col-span-6 md:py-32 lg:px-16 xl:col-span-5 xl:px-24'>
            <h1 className='flex flex-wrap whitespace-break-spaces text-4xl font-extrabold leading-[0.95] text-[#254f1a] min-[500px]:text-6xl lg:text-7xl xl:text-8xl'>A link in bio built for you.</h1>
            <p className='text-base font-medium text-[#254f1a] sm:text-lg'>Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
            <div className='flex w-full flex-col gap-4 md:flex-row md:gap-2'>
              <input value={text} onChange={updateHandle}
                onKeyDown={(event) => { if (event.key === "Enter") createTree() }}
                className='w-full flex-1 rounded-lg border-2 border-transparent bg-white p-4 text-lg outline-none focus:border-[#ddef50]'
                type="text"
                placeholder='Enter your handle'
                aria-label="Choose your handle"
                aria-describedby={handleError ? "hero-handle-error" : undefined}
              />
              <button onClick={() => { createTree() }} className='w-full shrink-0 rounded-full bg-[#254f1a] p-4 font-bold text-white md:w-auto md:px-8 cursor-pointer hover:bg-[#3a5930] transition-colors duration-300 ease-in-out'>
                Get started for free
              </button>
            </div>
            {handleError && <p id="hero-handle-error" className='-mt-3 font-semibold text-red-800' role="alert">{handleError}</p>}
          </div>
          <div className='col-span-1 w-full min-w-0 md:col-span-3 xl:col-span-4' >
            <div className="video-marquee-wrapper mb-10 mt-2 w-full overflow-hidden md:mb-0 md:mt-0 md:h-screen">
              <div
                className="video-marquee-container flex w-max items-end gap-5 md:mr-5 md:w-auto md:flex-col md:gap-9"
                ref={marqueeContainerRef}
              >

                <video className="marquee-video w-[280px] shrink-0 rounded-[2rem] sm:w-[330px] xl:w-[660px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Kelsey-updated.mp4"></source>
                </video>
                <video className="marquee-video w-[280px] shrink-0 rounded-[2rem] sm:w-[330px] xl:w-[660px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Miles-updated.mp4"></source>
                </video>
                <video className="marquee-video w-[280px] shrink-0 rounded-[2rem] sm:w-[330px] xl:w-[660px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Koy-updated.mp4"></source>
                </video>
                <video className="marquee-video w-[280px] shrink-0 rounded-[2rem] sm:w-[330px] xl:w-[660px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Zay-2.mp4"></source>
                </video>
                <video className="marquee-video w-[280px] shrink-0 rounded-[2rem] sm:w-[330px] xl:w-[660px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Pistakio-updated.mp4"></source>
                </video>



                <video className="marquee-video w-[280px] shrink-0 rounded-[2rem] sm:w-[330px] xl:w-[660px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Kelsey-updated.mp4"></source>
                </video>
                <video className="marquee-video w-[280px] shrink-0 rounded-[2rem] sm:w-[330px] xl:w-[660px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Miles-updated.mp4"></source>
                </video>
                <video className="marquee-video w-[280px] shrink-0 rounded-[2rem] sm:w-[330px] xl:w-[660px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Koy-updated.mp4"></source>
                </video>
                <video className="marquee-video w-[280px] shrink-0 rounded-[2rem] sm:w-[330px] xl:w-[660px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Zay-2.mp4"></source>
                </video>
                <video className="marquee-video w-[280px] shrink-0 rounded-[2rem] sm:w-[330px] xl:w-[660px]" autoPlay muted loop>
                  <source src="https://assets.production.linktr.ee/curate-assets/Pistakio-updated.mp4"></source>
                </video>
              </div>
            </div>
          </div>
        </section>
        <section id="products" className="section-2 scroll-mt-20 relative flex min-h-[90vh] w-full flex-col items-center justify-center gap-4 overflow-hidden bg-[#2665d6] px-5 py-14 sm:px-8 lg:flex-row lg:px-0 lg:py-8">
          <div className='w-full lg:w-1/2'>
            <video className='mx-auto flex w-full max-w-3xl items-center justify-center' id="customize-your-linktree" autoPlay playsInline loop muted >
              <source src="https://assets.production.linktr.ee/static/curate/customise_your_linktree.webm" type="video/webm" />
              <source className='' src="https://assets.production.linktr.ee/static/curate/customise_your_linktree.mp4" />
            </video>
          </div>
          <div className='flex w-full flex-col gap-6 lg:mr-1 lg:w-1/2 lg:px-4 lg:pr-10'>
            <h1 className='flex flex-wrap whitespace-break-spaces text-center text-4xl font-extrabold text-[#d2e823] sm:text-5xl md:text-6xl lg:text-start'>Create and customize your Linktree in minutes</h1>
            <p className='lg:text-xl  text-white font-medium lg:mx-0 mx-auto text-center lg:text-start'>Connect all your content across social media, websites, stores and more in one link in bio. Customize every detail or let Linktree automatically enhance it to match your brand and drive more clicks.</p>
            <div className='mt-5 flex justify-center gap-2 lg:justify-start'>
              <Link href={'/generate'}><button className='mx-auto cursor-pointer rounded-full bg-[#d2e823] p-4 px-8 font-bold text-black sm:px-12 lg:mx-0 lg:px-18'>Get started for free</button></Link>
            </div>
          </div>

        </section>
        <section id="share" className="section-3 scroll-mt-20 relative flex min-h-[90vh] w-full flex-col items-center justify-center gap-4 overflow-hidden bg-black px-5 py-14 sm:px-8 lg:flex-row lg:px-0 lg:py-8">
          <div className='w-full lg:w-1/2'>
            <video className='mx-auto flex w-full max-w-3xl items-center justify-center' id="share-your-linktree" autoPlay playsInline loop muted >

              <source className='' src="/vi.mp4" />
            </video>
          </div>
          <div className='flex w-full flex-col gap-6 lg:mr-1 lg:w-1/2 lg:px-8 lg:pr-10'>
            <h1 className='flex flex-wrap whitespace-break-spaces text-center text-4xl font-extrabold text-[#e9c0e9] sm:text-5xl md:text-6xl lg:text-start'>Share your Linktree anywhere you like!</h1>
            <p className='lg:text-xl  text-white font-medium lg:mx-0 mx-auto text-center lg:text-start'>Add your unique Linktree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic back to your link in bio.</p>
            <div className='mt-5 flex justify-center gap-2 lg:justify-start'>
              <Link href={'/generate'}><button className='mx-auto cursor-pointer rounded-full bg-[#e9c0e9] p-4 px-8 font-bold text-black sm:px-12 lg:mx-0 lg:px-18'>Get started for free</button></Link>
            </div>
          </div>

        </section>
        <section id="analytics" className="section-4 scroll-mt-20 relative flex min-h-[90vh] w-full flex-col items-center justify-center gap-8 overflow-hidden bg-[#e8efd6] px-5 py-14 sm:px-8 lg:flex-row lg:px-0 lg:py-8">
          <div className='w-full lg:w-1/2'>
            <img className='mx-auto h-auto w-full max-w-2xl' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68b80693934ab0ccd4bf7482_home-section-4.avif" alt="" />
          </div>
          <div className='flex w-full flex-col gap-6 lg:mr-1 lg:w-1/2 lg:px-4 lg:pr-10'>
            <h1 className='flex flex-wrap whitespace-break-spaces text-center text-4xl font-extrabold text-black sm:text-5xl md:text-6xl lg:text-start'>Analyze your audience and keep them engaged</h1>
            <p className='lg:text-xl  text-black font-medium lg:mx-0 mx-auto text-center lg:text-start'>Track your engagement over time, monitor revenue and learn what’s converting your audience. Make informed updates on the fly to keep them coming back.</p>
            <div className='mt-5 flex justify-center gap-2 lg:justify-start'>
              <Link href={'/generate'}><button className='mx-auto cursor-pointer rounded-full bg-[#e9c0e9] p-4 px-8 font-bold text-black sm:px-12 lg:mx-0 lg:px-18'>Get started for free</button></Link>
            </div>
          </div>

        </section>
        <section id="creators" className='section-5 scroll-mt-20 flex min-h-[80vh] flex-col items-center justify-center gap-12 overflow-x-hidden bg-[#f3f3f1] py-16 sm:gap-20'>
          <div className='mx-5 mb-5 min-h-[120px]'>
            <div className='text-center text-3xl font-extrabold text-black sm:text-4xl xl:text-7xl'>The only link in bio trusted by 70M+
            </div>
            <span className='fade-in-text flex min-h-[1.2em] items-center justify-center text-center text-3xl font-extrabold text-[#2665d6] sm:text-5xl xl:text-7xl' ref={typedTargetRef}></span>
          </div>
          <div className="img_slider flex gap-4 sm:gap-6" ref={img_slider}>
            <img className='h-64 shrink-0 rounded-[100px] sm:h-80 lg:h-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ba_selena-gomez.webp" alt="" />
            <img className='h-64 shrink-0 rounded-[40px] sm:h-80 lg:h-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ac_comedy-central.webp" alt="" />
            <img className='h-64 shrink-0 rounded-lg sm:h-80 lg:h-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e937809_hbo.webp" alt="" />
            <img className='h-64 shrink-0 rounded-[10px] sm:h-80 lg:h-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb1449d48431e9376d8_pharrell.webp" alt="" />
            <img className='h-64 shrink-0 rounded-full sm:h-80 lg:h-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377da_tonyhawk.webp" alt="" />
            <img className='h-64 shrink-0 rounded sm:h-80 lg:h-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb1449d48431e937716_laclippers.webp" alt="" />
            <img className='h-64 shrink-0 rounded-full sm:h-80 lg:h-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e937786_funkynutmeg.webp" alt="" />


            <img className='h-64 shrink-0 rounded-[100px] sm:h-80 lg:h-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ba_selena-gomez.webp" alt="" />
            <img className='h-64 shrink-0 rounded-[40px] sm:h-80 lg:h-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ac_comedy-central.webp" alt="" />
            <img className='h-64 shrink-0 rounded-lg sm:h-80 lg:h-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e937809_hbo.webp" alt="" />
            <img className='h-64 shrink-0 rounded-[10px] sm:h-80 lg:h-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb1449d48431e9376d8_pharrell.webp" alt="" />
            <img className='h-64 shrink-0 rounded-full sm:h-80 lg:h-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377da_tonyhawk.webp" alt="" />
            <img className='h-64 shrink-0 rounded sm:h-80 lg:h-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb1449d48431e937716_laclippers.webp" alt="" />
            <img className='h-64 shrink-0 rounded-full sm:h-80 lg:h-90' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e937786_funkynutmeg.webp" alt="" />
          </div>
        </section>
        <section id="templates" className="section-6 scroll-mt-20 flex min-h-[90vh] flex-col justify-center bg-[#f3f3f1] px-3 pt-12 sm:px-5 sm:pt-20 lg:flex-row lg:px-20">
          <div className='flex min-w-0 flex-col lg:w-1/2'>
            <div className='m-2 flex flex-col gap-8 rounded-[28px] bg-[#e9c0e9] px-5 pb-8 pt-12 sm:gap-13 sm:rounded-[40px] sm:px-10 sm:pb-10 sm:pt-25 lg:px-15'>
              <img className='h-auto w-full max-w-2xl' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/680c13b834d3994a796896bd_all%20your%20things.avif" alt="" />
              <p className='min-[480px]:text-2xl text-lg font-bold'>Share every type of content in limitless ways</p>
            </div>
            <div className='m-2 flex flex-col gap-8 rounded-[28px] bg-[#d2e823] px-5 pb-8 pt-12 sm:rounded-[40px] sm:px-10 sm:pb-10 sm:pt-15 lg:px-15'>
              <img className='h-auto w-full max-w-xl' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/680c16a391a7e027f3fbda59_products.avif" alt="" />
              <p className='min-[480px]:text-2xl text-lg font-bold'>Sell products, collect payments and make monetization simple !</p>
            </div>
          </div>
          <div className='m-2 flex min-w-0 flex-col items-center justify-center gap-8 rounded-[28px] bg-[#061492] px-5 py-10 text-white sm:gap-13 sm:rounded-[40px] sm:px-10 lg:w-1/2 lg:px-15'>
            <img className='h-auto w-full max-w-lg' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68b80742d1d9216c45c6d6ea_group1597882005.avif" alt="" />
            <p className='min-[480px]:text-2xl text-lg font-bold'>Grow, own and engage your audience across all of your channels</p>
          </div>
        </section>
        <section id="pricing" className="section-7 scroll-mt-20 bg-[#f3f3f1] px-4 py-20 sm:py-30 md:px-6">
          <div className='mx-auto flex max-w-5xl flex-col items-center justify-center gap-28 sm:gap-35 md:gap-50 lg:w-2/3 lg:gap-70'>
            <div className='flex flex-col items-center justify-center gap-5'>
              <h2 className='text-center text-4xl font-extrabold sm:text-5xl md:text-7xl'>The fast, friendly and powerful link in bio tool.</h2>
              <Link href="/generate" className='w-fit rounded-full bg-[#e9c0e9] p-4 px-10 text-center font-bold transition-transform hover:scale-105 sm:p-5 sm:px-20'>Explore all plans</Link>
            </div>
            <div className='flex flex-col gap-10'>
              <h2 className='md:text-6xl text-3xl font-extrabold text-center'>As featured in...</h2>
              <div className='flex flex-wrap gap-5 justify-center'>
                <div className='flex min-w-[135px] flex-1 items-center justify-center rounded-full bg-white px-7 py-6 md:flex-none md:px-20'>
                  <img className='md:w-40 w-30' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14f5d9e85733c5a9a48_group1597881647.avif" alt="" />
                </div>
                <div className='flex min-w-[135px] flex-1 items-center justify-center rounded-full bg-white px-7 py-6 md:flex-none md:px-20'>
                  <img className='md:w-20 w-20' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14f97d207e420a58182_insiderlogo1.avif" alt="" />
                </div>
                <div className='flex min-w-[135px] flex-1 items-center justify-center rounded-full bg-white px-7 py-6 md:flex-none md:px-20'>
                  <img className='md:w-20 w-20' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14fd2540b94aa830d59_forbes-blue-grey.avif" alt="" />
                </div>
                <div className='flex min-w-[135px] flex-1 items-center justify-center rounded-full bg-white px-7 py-6 md:flex-none md:px-20'>
                  <img className='md:w-30 w-20' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14fe75d954138be7db4_mashable_logo_(2021)1.avif" alt="" />
                </div>
                <div className='flex min-w-[135px] flex-1 items-center justify-center rounded-full bg-white px-7 py-6 md:flex-none md:px-20'>
                  <img className='md:w-30 w-20' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14f1230aaa3bbd0a99a_entrepreneur-blue-grey__2_.avif" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="section-8 scroll-mt-20 bg-[#f3f3f1] py-10 pb-15">
          <div className='mx-auto flex max-w-5xl flex-col items-center justify-center gap-10 px-5 min-[1300px]:w-[50%] min-[1300px]:px-0'>
            <div className='flex w-full flex-col items-center gap-10' aria-live="polite">
              <img className='aspect-[16/10] h-auto w-full max-w-4xl rounded-3xl object-cover' src={activeTestimonial.image} alt={`${activeTestimonial.name} testimonial`} />
              <h2 className='text-center text-2xl font-extrabold min-[500px]:text-3xl min-[890px]:text-5xl'>“{activeTestimonial.quote}”</h2>
            </div>
            <div className='text-center text-lg font-medium text-slate-600'>
              <p>{activeTestimonial.name},</p>
              <p>{activeTestimonial.role}</p>
            </div>
            <div className='flex gap-2'>
              <button onClick={showPreviousTestimonial} className='cursor-pointer rounded border p-3 transition-colors hover:bg-black hover:text-white' aria-label="Previous testimonial">
                <FaArrowLeft />
              </button>
              <button onClick={showNextTestimonial} className='cursor-pointer rounded border p-3 transition-colors hover:bg-black hover:text-white' aria-label="Next testimonial">
                <FaArrowRight />
              </button>

            </div>
            <div className='flex gap-2' aria-label={`Testimonial ${testimonialIndex + 1} of ${testimonials.length}`}>
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  onClick={() => setTestimonialIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${index === testimonialIndex ? "w-8 bg-black" : "w-2.5 bg-slate-400"}`}
                  aria-label={`Show testimonial from ${testimonial.name}`}
                />
              ))}
            </div>
          </div>
        </section>
        <section id="faq" className="section-9 scroll-mt-20 relative min-h-screen w-full bg-[#780016] px-4 py-20 text-[#e9c0e9] sm:px-6">
          <div className='mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10'>
            <h2 className='text-center text-4xl font-extrabold sm:text-5xl md:text-6xl'>Questions? Answered</h2>

            <div className='flex flex-col md:gap-5 gap-3 justify-center items-center w-[100%]'>

              {/* THIS IS THE IMPORTANT PART.
        This container provides the dark background and rounded corners.
      */}
              <div className="mx-auto my-6 w-full max-w-3xl sm:my-12">
                <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                  {faqs.map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
        <section id="get-started" className="section-10 scroll-mt-20 min-h-screen overflow-hidden bg-[#502274] px-0 pt-28 sm:pt-36 md:pt-60">
          <div className='relative flex flex-col items-center justify-center'>
            <div className='relative z-30 mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-8 px-5 text-center xl:w-[60%]'>
              <h1 className='text-4xl font-extrabold text-[#e9c0e9] sm:text-5xl md:text-6xl min-[1300px]:text-7xl'>Jumpstart your corner of the
                internet today</h1>
              <div className='flex w-full max-w-2xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center' >
                <input value={text} onChange={updateHandle} onKeyDown={(event) => { if (event.key === "Enter") createTree() }} className='min-w-0 flex-1 rounded-lg bg-white p-5' placeholder='linktr.ee/' type="text" aria-label="Claim your handle" aria-describedby={handleError ? "cta-handle-error" : undefined} />
                <button onClick={() => { createTree() }} className='w-full rounded-full bg-[#d2e823] p-5 px-7 font-bold text-black sm:w-auto md:px-12'>Claim your Linktree</button>
              </div>
              {handleError && <p id="cta-handle-error" className='font-semibold text-red-200' role="alert">{handleError}</p>}
            </div>
            <img className='absolute left-[-4rem] top-0 z-20 w-60 rotate-18 opacity-80 min-[400px]:w-70 md:left-0 md:w-90 lg:w-100' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66710696806e843c0058943b_download.svg" alt="" />
            <img className='absolute right-2 top-[320px] z-20 w-30 rotate-18 min-[490px]:right-9 min-[490px]:w-50 min-[550px]:top-[240px] min-[550px]:w-55 lg:top-[400px] lg:w-56' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/666b365b622379ae753964b8_footer-flower.svg" alt="" />

            <footer id="footer" className="relative z-30 mt-48 w-full scroll-mt-20 px-3 py-12 sm:mt-32 sm:px-6 md:mt-40 lg:mt-50 lg:px-8">
              <div className="mx-auto max-w-screen-xl rounded-2xl bg-white p-5 sm:p-8 md:p-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Company</h3>
                    <ul className="space-y-2">
                      {footerLinks.company.map((link) => (
                        <li key={link}>
                          <a href={link === "Contact" ? "mailto:datendiva.mailer@gmail.com" : "#products"} className="text-gray-600 hover:text-black hover:underline">{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Community</h3>
                    <ul className="space-y-2">
                      {footerLinks.community.map((link) => (
                        <li key={link}>
                          <a href="#creators" className="text-gray-600 hover:text-black hover:underline">{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Support</h3>
                    <ul className="space-y-2">
                      {footerLinks.support.map((link) => (
                        <li key={link}>
                          <a href="#faq" className="text-gray-600 hover:text-black hover:underline">{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Trust & Legal</h3>
                    <ul className="space-y-2">
                      {footerLinks.trustLegal.map((link) => (
                        <li key={link}>
                          <a href="#footer" className="text-gray-600 hover:text-black hover:underline">{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
                    <button onClick={openExistingProfile} className="rounded-full border border-gray-300 px-6 py-3 text-center font-semibold hover:bg-gray-100 sm:px-10">
                      Log in
                    </button>
                    <Link className='w-full sm:w-auto' href={'/generate'}><button className="w-full rounded-full bg-[#d2e823] px-6 py-3 font-semibold hover:bg-opacity-80">
                      Get started for free
                    </button></Link>
                  </div>

                  <div className="flex w-full flex-wrap items-center justify-center gap-4 md:w-auto">
                    <a className='w-30 border rounded-full  p-2 bg-[#1e2330] px-3 ' href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store ">
                      <img src="/playStore.svg" alt="App Store" className="h-12" />
                    </a>
                    <a className='w-30 border rounded-full  p-2 bg-[#1e2330] px-3 ' href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
                      <img src="/google.svg" alt="Google Play" className="h-12" />
                    </a>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a href="https://www.spotify.com/" target="_blank" rel="noopener noreferrer" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="Spotify">
                        <FaSpotify size={20} />
                      </a>
                      <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="Tiktok">
                        <FaTiktok size={20} />
                      </a>
                      <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="X formerly Twitter">
                        <BsTwitterX size={20} />
                      </a>
                      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="Instagram">
                        <BsInstagram size={20} />
                      </a>
                      <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="bg-[#1e2330] text-white p-3 rounded-full hover:bg-gray-700" aria-label="YouTube">
                        <FaYoutube size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
