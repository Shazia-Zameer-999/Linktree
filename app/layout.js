import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://shop.datendiva.me");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Linktree Clone by Shazia Zameer",
    template: "%s | Linktree Clone",
  },
  description: "Create and share a responsive link-in-bio profile built with Next.js 15, React 19, Tailwind CSS 4, and MongoDB.",
  applicationName: "Linktree Clone",
  authors: [{ name: "Shazia Zameer", url: "https://portfolio-dd-ebon.vercel.app/" }],
  keywords: ["link in bio", "creator profile", "Next.js", "MongoDB"],
  openGraph: {
    title: "Linktree Clone by Shazia Zameer",
    description: "Build one polished page for all of your important links.",
    type: "website",
    images: [{ url: "/show1.png", width: 1200, height: 672, alt: "Linktree Clone preview" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
