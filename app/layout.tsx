import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Inter, Comfortaa } from "next/font/google";
import { Halant, Onest } from "next/font/google";
import "./globals.css";
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

const halant = Halant({
  variable: "--font-halant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["400", "700"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${inter.variable} ${halant.variable} ${onest.variable} ${comfortaa.variable} antialiased`}
      >
        <AnimationWrapper>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AnimationWrapper>
      </body>
    </html>
  );
}
