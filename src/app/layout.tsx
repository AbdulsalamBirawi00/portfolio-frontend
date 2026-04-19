import type { Metadata } from "next";
import { inter, orbitron, spaceMono } from "@/lib/fonts";
import LoadingScreen from "@/components/layout/LoadingScreen";
import CustomCursor from "@/components/layout/CustomCursor";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GSAPProvider from "@/components/layout/GSAPProvider";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abdalsalam Al Birawi — Front-End Developer",
    template: "%s | Abdalsalam Al Birawi",
  },
  description:
    "Front-End Developer specializing in React, Next.js, and TypeScript. 5+ years building performant, beautiful web applications for fintech and enterprise.",
  keywords: [
    "Front-End Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Software Engineer",
    "Abdalsalam Al Birawi",
    "Portfolio",
    "Fintech",
    "Web Development",
  ],
  authors: [
    {
      name: "Abdalsalam Al Birawi",
      url: "https://linkedin.com/in/abdalsalam-albirawi",
    },
  ],
  creator: "Abdalsalam Al Birawi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Abdalsalam Al Birawi Portfolio",
    title: "Abdalsalam Al Birawi — Front-End Developer",
    description:
      "Journey through the universe of React, Next.js and TypeScript. 5+ years crafting stellar digital experiences.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Abdalsalam Al Birawi Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdalsalam Al Birawi — Front-End Developer",
    description:
      "Journey through the universe of React, Next.js and TypeScript.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdalsalam Al Birawi",
  jobTitle: "Front-End Developer",
  email: "abdalsalamalbirawi@gmail.com",
  telephone: "+963932583562",
  url: siteUrl,
  sameAs: ["https://linkedin.com/in/abdalsalam-albirawi"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Aleppo University",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Angular",
    "React Native",
    "Node.js",
    "Web Development",
    "Fintech",
  ],
  worksFor: {
    "@type": "Organization",
    name: "MOOLA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} ${spaceMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="bg-space-black text-space-star overflow-x-hidden">
        <LoadingScreen />
        <CustomCursor />
        <GSAPProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </GSAPProvider>
      </body>
    </html>
  );
}
