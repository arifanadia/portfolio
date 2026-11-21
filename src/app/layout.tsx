import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Arifa Nadia | Full Stack Developer & Graphic Designer",
  description:
    "Portfolio of Arifa Nadia — Full Stack Developer since 2023 and Graphic Designer since 2021. I build modern, animated web experiences.",
  openGraph: {
    title: "Arifa Nadia | Full Stack Developer & Graphic Designer",
    description:
      "Portfolio of Arifa Nadia — Full Stack Developer & Graphic Designer.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0f0f14] text-[#f2f2f5]">
        {children}
      </body>
    </html>
  );
}
