import type { Metadata } from "next";
import "./globals.css";
import { Inter, Work_Sans } from 'next/font/google';

// Initialize the fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
});

export const metadata: Metadata = {
  title: "StudyMapper",
  description: "Find the best study spaces near you for the University of Manchester students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${workSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
