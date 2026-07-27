import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Inzaghi's Blog — Blog Post Aggregator",
    template: "%s | Inzaghi's Blog",
  },
  description:
    "A modern developer and technology publication, curated from Inzaghi's Blog, Teknoblog, and Miniblog.",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/icons/inzaghis-blog-36x36.png",
    shortcut: "/icons/inzaghis-blog-36x36.png",
    apple: "/icons/inzaghis-blog-36x36.png",
  },
  openGraph: { type: "website", siteName: "Inzaghi's Blog", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
