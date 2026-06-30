"use client"

import React, { useEffect, useRef, useState } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const navLinks = [
    { label: "Products", href: "/#products", section: "products" },
    { label: "Templates", href: "/#templates", section: "templates" },
    { label: "Marketplace", href: "/#creators", section: "creators" },
    { label: "Learn", href: "/#faq", section: "faq" },
    { label: "Pricing", href: "/#pricing", section: "pricing" },
]

const Navbar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const navRef = useRef(null)
    const lastScrollY = useRef(0)

    const [isVisible, setIsVisible] = useState(true)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [loginHandle, setLoginHandle] = useState("")
    const [loginError, setLoginError] = useState("")
    const [activeSection, setActiveSection] = useState("")

    const showNavbar = ["/", "/generate"].includes(pathname)

    const closePanels = () => {
        setIsMenuOpen(false)
        setIsLoginOpen(false)
        setLoginError("")
    }

    const toggleMenu = () => {
        setIsMenuOpen((current) => !current)
        setIsLoginOpen(false)
        setLoginError("")
        setIsVisible(true)
    }

    const toggleLogin = () => {
        setIsLoginOpen((current) => !current)
        setIsMenuOpen(false)
        setLoginError("")
        setIsVisible(true)
    }

    const openExistingProfile = (event) => {
        event.preventDefault()
        const cleanHandle = loginHandle.trim().replace(/^@/, "")

        if (!cleanHandle) {
            setLoginError("Please enter your handle.")
            return
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(cleanHandle)) {
            setLoginError("Use only letters, numbers, underscores, or hyphens.")
            return
        }

        closePanels()
        setLoginHandle("")
        router.push(`/${encodeURIComponent(cleanHandle)}`)
    }

    useEffect(() => {
        closePanels()
    }, [pathname])

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                closePanels()
            }
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") closePanels()
        }

        document.addEventListener("mousedown", handlePointerDown)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("mousedown", handlePointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            const threshold = window.innerHeight * 0.05

            if (isMenuOpen || isLoginOpen || currentScrollY <= threshold) {
                setIsVisible(true)
                lastScrollY.current = currentScrollY
                return
            }

            setIsVisible(currentScrollY <= lastScrollY.current)
            lastScrollY.current = currentScrollY
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isLoginOpen, isMenuOpen])

    useEffect(() => {
        if (pathname !== "/") {
            setActiveSection("")
            return
        }

        const sections = navLinks
            .map((item) => document.getElementById(item.section))
            .filter(Boolean)

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSection = entries.find((entry) => entry.isIntersecting)
                if (visibleSection) setActiveSection(visibleSection.target.id)
            },
            { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
        )

        sections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [pathname])

    if (!showNavbar) return null

    return (
        <nav
            ref={navRef}
            aria-label="Main navigation"
            className={`fixed left-1/2 top-3 z-50 flex w-[calc(100%-1rem)] max-w-[1440px] -translate-x-1/2 items-center justify-between rounded-full bg-white p-2 pl-3 shadow-sm transition-transform duration-300 ease-in-out sm:top-4 sm:w-[90vw] sm:pl-5 md:px-6 md:pr-3 ${isVisible ? "translate-y-0" : "-translate-y-[calc(100%+2rem)]"}`}
        >
            <div className="logo flex min-w-0 items-center gap-3 min-[1180px]:gap-8">
                <Link href="/" onClick={closePanels} aria-label="Go to homepage" className="shrink-0">
                    <img className="hidden w-28 cursor-pointer sm:block md:w-32" src="/logo.svg" alt="Linktree" />
                    <img className="block w-8 sm:hidden" src="/logo2.svg" alt="Linktree" />
                </Link>

                <ul className="hidden items-center justify-center text-[15px] min-[1180px]:flex">
                    {navLinks.map((item) => {
                        const isActive = pathname === "/" && activeSection === item.section

                        return (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    onClick={closePanels}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`block rounded-lg px-4 py-3 transition-colors hover:bg-[#eff0ec] ${isActive ? "bg-[#eff0ec] font-semibold" : ""}`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="btns flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3">
                <button
                    type="button"
                    onClick={toggleLogin}
                    aria-expanded={isLoginOpen}
                    aria-controls="profile-login-panel"
                    className="LogInBtn cursor-pointer rounded-lg bg-[#eff0ec] px-2 py-2 text-xs font-medium transition-colors hover:bg-[#e3e4df] sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4 md:text-lg"
                >
                    Log in
                </button>
                <Link
                    href="/generate"
                    onClick={closePanels}
                    className="signIn cursor-pointer whitespace-nowrap rounded-full bg-black px-2.5 py-2.5 text-[10px] font-medium text-white transition-colors hover:bg-[#262d3e] sm:px-4 sm:py-3.5 sm:text-xs md:px-6 md:py-4 md:text-base"
                >
                    Sign up free
                </Link>
                <button
                    type="button"
                    onClick={toggleMenu}
                    className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-gray-200 sm:h-11 sm:w-11 min-[1180px]:hidden"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                >
                    {isMenuOpen ? <HiX size={26} /> : <HiMenu size={28} />}
                </button>
            </div>

            {isMenuOpen && (
                <div id="mobile-navigation" className="absolute left-0 right-0 top-[calc(100%+0.75rem)] max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl bg-white p-3 shadow-2xl min-[1180px]:hidden sm:p-4">
                    <ul className="grid gap-1">
                        {navLinks.map((item) => {
                            const isActive = pathname === "/" && activeSection === item.section

                            return (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        onClick={closePanels}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`block rounded-xl px-4 py-3 font-medium transition-colors hover:bg-[#eff0ec] ${isActive ? "bg-[#eff0ec]" : ""}`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}

            {isLoginOpen && (
                <div id="profile-login-panel" className="absolute left-0 right-0 top-[calc(100%+0.75rem)] rounded-3xl bg-white p-5 shadow-2xl sm:left-auto sm:w-[380px] sm:p-6">
                    <form onSubmit={openExistingProfile} className="grid gap-4">
                        <div>
                            <h2 className="text-xl font-bold">Open your profile</h2>
                            <p className="mt-1 text-sm text-gray-600">Enter the handle of an existing Linktree.</p>
                        </div>
                        <label className="grid gap-2 text-sm font-semibold" htmlFor="navbar-login-handle">
                            Handle
                            <div className="flex items-center rounded-xl border border-gray-300 bg-white px-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                                <span className="text-gray-500">@</span>
                                <input
                                    id="navbar-login-handle"
                                    autoFocus
                                    value={loginHandle}
                                    onChange={(event) => {
                                        setLoginHandle(event.target.value)
                                        if (loginError) setLoginError("")
                                    }}
                                    className="min-w-0 flex-1 bg-transparent px-1 py-3 outline-none"
                                    placeholder="your-handle"
                                    autoComplete="username"
                                    aria-describedby={loginError ? "navbar-login-error" : undefined}
                                />
                            </div>
                        </label>
                        {loginError && <p id="navbar-login-error" className="text-sm font-semibold text-red-600" role="alert">{loginError}</p>}
                        <button type="submit" className="rounded-full bg-black px-5 py-3 font-semibold text-white transition-colors hover:bg-[#262d3e]">
                            View profile
                        </button>
                    </form>
                </div>
            )}
        </nav>
    )
}

export default Navbar
