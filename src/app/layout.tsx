import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://commvergent.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CommVergent Technologies",
    template: "%s — CommVergent Technologies",
  },
  description: "A senior engineering studio for software, data, and product.",
  openGraph: {
    type: "website",
    siteName: "CommVergent Technologies",
    images: [
      {
        url: "/og.jpg",          // resolved against metadataBase
        width: 1200,
        height: 630,
        alt: "CommVergent Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
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
