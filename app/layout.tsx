import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Inter } from "next/font/google";
import "./globals.css";
import FontLoader from "./components/FontLoader";
import AnimationWrapper from "./animations/providers/AnimationWrapper";
import LayoutWrapper from "./components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WOB Studios - Leading Independent Software Product Studio",
  description: "We help forward thinking busy professionals, early stage founders, & businesses turn their ideas into a market & investor ready product.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${inter.variable} antialiased`}
      >
        <FontLoader />
        <AnimationWrapper>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AnimationWrapper>
      </body>
    </html>
  );
}
