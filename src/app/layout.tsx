import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StoreFooter } from "@/components/store-footer";
import { StoreHeader } from "@/components/store-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sugar & Swirl Bakery",
  description: "A cute multi-page bakery site with pastel styling, product images, and a lively menu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fff8fb] text-rose-950">
        <StoreHeader />
        <div className="flex-1">{children}</div>
        <StoreFooter />
      </body>
    </html>
  );
}
