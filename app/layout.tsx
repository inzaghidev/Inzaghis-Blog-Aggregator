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
    title: "Inzaghi's Blog — Blog Post Aggregator",
    description:
      "An Inzaghi's Blog Aggregator that aggregates content from Inzaghi's Blog Legacy, Teknoblog and Miniblog.",
    images: [
      {
        url: "/images/inzaghis-blog-aggregator.png",
        width: 1200,
        height: 630,
        alt: "Inzaghi's Blog Aggregator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inzaghi's Blog — Blog Post Aggregator",
    description:
      "An Inzaghi's Blog Aggregator that aggregates content from Inzaghi's Blog Legacy, Teknoblog and Miniblog.",
    images: ["/images/inzaghis-blog-aggregator.png"],
  },
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
