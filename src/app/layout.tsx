//import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

//const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://commvergent.com";

export const metadata = {
  metadataBase: new URL("https://commvergent.com"), // your prod URL
  title: "CommVergent Technologies",
  description:
    "Building the Future Through Technology and Ideas.",
  openGraph: {
    type: "website",
    url: "https://commvergent.com",
    title: "CommVergent Technologies",
    description:
      "Building the Future Through Technology and Ideas.",
    images: [
      {
        url: "/og.jpg",       // 1200×630
        width: 1200,
        height: 630,
        alt: "CommVergent Technologies wordmark and tagline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CommVergent Technologies",
    description:
      "Building the Future Through Technology and Ideas.",
    images: ["/og.jpg"],      // Twitter/X prefers 2:1-ish; 1200×630 is perfect
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[var(--brand-black)]">
        <Header />
        <main id="main" className="mx-auto max-w-6xl px-6 py-12">{children}</main>
        <Footer />
      </body>
      <script type="application/ld+json" suppressHydrationWarning>
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CommVergent Technologies",
            "url": "https://commvergent.com",
            "logo": "https://commvergent.com/brand/wordmark.png",
            "sameAs": ["https://automation.commvergent.com"]
          })}
      </script>
    </html>
      );
    }
