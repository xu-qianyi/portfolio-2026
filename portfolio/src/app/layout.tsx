import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";
import ClarityProvider from "@/components/ClarityProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Martta Xu",
  description:
    "I design access. Product designer with roots in consulting and a bias for clarity.",
  icons: {
    icon: `${BASE}/images/favicon-sunflower.svg`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <noscript>
          <style>{`.case-scroll-reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <ClarityProvider />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
