import type { Metadata } from "next";
import "./globals.css";
import { Inter, Work_Sans } from 'next/font/google';
import { GoogleAnalytics } from '@/components/analytics';

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
  description:
    "Find the best study spaces near you for the University of Manchester students. Discover quiet study areas, group study rooms, and creative spaces designed to boost your productivity.",
  manifest: "/manifest.json",
  icons: {
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    shortcut: ["/icons/favicon.ico"]
  },
  appleWebApp: {
    capable: true,
    title: "StudyMapper",
    statusBarStyle: "black-translucent"
  },
  keywords: [
    "Study spaces",
    "University of Manchester",
    "Study rooms",
    "Group study",
    "Quiet study areas",
    "Academic spaces"
  ],
  authors: [
    {
      name: "Noah Pham phamtrankhoinguyen",
      url: "https://www.studymapper.vercel.app"
    }
  ],
  creator: "StudyMapper Team",
  openGraph: {
    type: "website",
    url: "https://www.studymapper.vercel.app",
    title: "StudyMapper - Find the Best Study Spaces Near You",
    description:
      "Discover and navigate the best study spaces around the University of Manchester all in one platform.",
    siteName: "StudyMapper",
    images: [
      {
        url: "https://studymapper.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StudyMapper preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyMapper - Best Study Spaces Near You",
    description:
      "Find your ideal study spot near the University of Manchester with StudyMapper. Perfect for solo and group sessions.",
    images: ["https://studymapper.com/twitter-image.jpg"],
    creator: "@StudyMapper"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="StudyMapper" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} ${workSans.variable} font-sans antialiased`}>
        {children}
        <GoogleAnalytics 
          GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} 
        />
      </body>
    </html>
  );
}
