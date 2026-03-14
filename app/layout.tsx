import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "./footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "mahesh's portfolio",
  description: "welcome to my portfolio, here you'll get to learn about my professional background, skillset, and experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground transition-colors`}
      >
        <Footer />
        {children}
      </body>
    </html>
  );
}
