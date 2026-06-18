import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { Scene3D } from "@/components/ui/scene3d";
import { ScrollProgressBar } from "@/components/ui/scroll-progress-bar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Aravinthan G | Aspiring Data Scientist & Analyst",
  description: "Turning Complex Data into Powerful Insights with AI. Portfolio of Aravinthan G detailing hands-free eye-tracking HCI, deep learning certificates verification, and quantitative stock market forecasts.",
  keywords: [
    "Aravinthan G",
    "Data Scientist",
    "Data Analyst",
    "Machine Learning",
    "Deep Learning",
    "Gaze Tracking HCI",
    "Python",
    "Tableau",
    "Next.js Portfolio",
    "Trichy"
  ],
  authors: [{ name: "Aravinthan G" }],
  openGraph: {
    title: "Aravinthan G | Aspiring Data Scientist & Analyst",
    description: "Turning Complex Data into Powerful Insights with AI. Explore Aravinthan's interactive ML/DL portfolio.",
    url: "https://github.com/Aravinthan-G-23",
    siteName: "Aravinthan G Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aravinthan G | Aspiring Data Scientist & Analyst",
    description: "Turning Complex Data into Powerful Insights with AI. Explore Aravinthan's interactive ML/DL portfolio.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Aravinthan G",
  "jobTitle": "Aspiring Data Scientist & Analyst",
  "email": "aravinthang06@gmail.com",
  "telephone": "+91 83444 76965",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Trichy",
    "addressRegion": "Tamil Nadu",
    "addressCountry": "India"
  },
  "url": "https://github.com/Aravinthan-G-23",
  "sameAs": [
    "https://github.com/Aravinthan-G-23",
    "https://www.linkedin.com/in/aravinthan-g-b98088281/"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col relative text-white bg-[#050816] overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
        <SmoothScroll>
          <ScrollProgressBar />
          <Scene3D />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
