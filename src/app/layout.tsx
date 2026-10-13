import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";

// Add both variables to your existing html element

import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import { Fraunces } from "next/font/google";

import { Inter } from "next/font/google";

// <body className={inter.variable}>

// <body className={fraunces.variable}>
import "./globals.css";
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const display = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = {
  title: "EB-5 investor immigration| Lawyers on Call",
  description: "Clear, transparent support through every stage of the EB-5 process, from consultation to ongoing case support.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} scroll-smooth`}>
      <body className="bg-[#FBF7F0] font-[family-name:var(--font-sans)] text-[#15123D] antialiased">{children}</body>
    </html>
  );
}

<html lang="en" className={`${manrope.variable} ${newsreader.variable}`}></html>