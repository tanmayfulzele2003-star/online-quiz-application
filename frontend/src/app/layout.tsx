import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "QuizNest — Online Quiz Application",
    template: "%s · QuizNest",
  },
  description:
    "Take timed quizzes, track your scores, and manage quiz content with QuizNest, an online quiz platform.",
  openGraph: {
    title: "QuizNest — Online Quiz Application",
    description:
      "Take timed quizzes, track your scores, and manage quiz content with QuizNest, an online quiz platform.",
    url: siteUrl,
    siteName: "QuizNest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuizNest — Online Quiz Application",
    description:
      "Take timed quizzes, track your scores, and manage quiz content with QuizNest, an online quiz platform.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
