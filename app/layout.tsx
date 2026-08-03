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
    "An Inzaghi's Blog Aggregator that aggregates content from Inzaghi's Blog Legacy, Teknoblog and Miniblog.",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/icons/inzaghis-blog-36x36.png",
    shortcut: "/icons/inzaghis-blog-36x36.png",
    apple: "/icons/inzaghis-blog-36x36.png",
  },
  openGraph: {
    type: "website",
    siteName: "Inzaghi's Blog",
    locale: "en_US, en_GB, id_ID",
  },
  twitter: { card: "summary_large_image" },
  verification: {
    google: "0U4PwP14dUkc0abyH0LHWr1H2_z0dlGpcR_tgM0K5ks",
  },
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
