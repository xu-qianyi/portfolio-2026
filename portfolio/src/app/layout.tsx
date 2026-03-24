import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Martta Xu",
  description:
    "I design access. Product designer with roots in consulting and a bias for clarity.",
  icons: {
    icon: "/images/favicon-sunflower.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
