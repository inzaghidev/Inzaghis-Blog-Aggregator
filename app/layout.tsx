import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Inzaghi's Blog — Ideas worth building",
    template: "%s | Inzaghi's Blog",
  },
  description:
    "A modern developer and technology publication, curated from Inzaghi's Blog, Teknoblog, and Miniblog.",
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
