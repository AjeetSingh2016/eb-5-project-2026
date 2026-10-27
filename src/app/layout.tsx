
import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";

import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import { Fraunces } from "next/font/google";

import { Inter } from "next/font/google";

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

const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "EB-5 Paralegal | Your Investors, Our Expertise",
  description:
    "Specialist EB-5 paralegal support for immigration law firms. From source of funds analysis to petition preparation, we work as a white-label extension of your legal team.",
  openGraph: {
    title: "EB-5 Paralegal | Your Investors, Our Expertise",
    description:
      "Specialist paralegal support for your EB-5 practice. Attorney-controlled workflows, organised documentation, and tailored case preparation.",
    siteName: "EB-5 Paralegal",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EB-5 Paralegal — Your Investors, Our Expertise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EB-5 Paralegal | Your Investors, Our Expertise",
    description:
      "Specialist EB-5 paralegal support for immigration law firms. Your Investors, Our Expertise.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} scroll-smooth`}
    >
      <body className="bg-[#FBF7F0] font-[family-name:var(--font-sans)] text-[#15123D] antialiased">
        {children}
      </body>
    </html>
  );
}
