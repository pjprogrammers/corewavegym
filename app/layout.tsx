import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ResourceHints } from "@/components/ResourceHints";
import { Header } from "@/components/Header";
import { OfferTicker } from "@/components/OfferTicker";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { CustomCursor } from "@/components/CustomCursor";
import { businessSchema } from "@/lib/schema";
import { i18n, site } from "@/lib/data";

const en = i18n.en as Record<string, any>;

export const metadata: Metadata = {
  title: {
    default: en.meta.homeTitle,
    template: "%s",
  },
  description: en.meta.homeDesc,
  authors: [{ name: site.business.name }],
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ResourceHints />
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <OfferTicker />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <FloatingActions />
          <CustomCursor />
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </body>
    </html>
  );
}
