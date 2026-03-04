import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Martta Xu",
  description:
    "I design access. Product designer with roots in consulting and a bias for clarity.",
  icons: {
    icon: "/images/pixel pony.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${playfairDisplay.variable} antialiased`}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
