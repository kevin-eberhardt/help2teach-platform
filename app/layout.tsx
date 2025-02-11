import { GoogleTagManager } from "@next/third-parties/google";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export function generateMetadata(): Metadata {
  return {
    title: {
      default: process.env.NEXT_PUBLIC_WEBSITE_NAME ?? "Help2Teach",
      template: `%s | ${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? "Help2Teach"}`,
    },
    description: process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION ?? "Help2Teach",
    authors: [{ name: "Kevin Eberhardt", url: undefined }],
    robots: {
      index: true,
      follow: true,
    },
    category: "education",
    keywords: [
      "Help2Teach",
      "Klassenmanagement",
      "Sitzpläne",
      "Lehrer",
      "Online-Tool",
    ],
    alternates: {
      canonical: "https://help2teach.de",
      languages: {
        de: "https://help2teach.de/de",
        en: "https://help2teach.de/en",
      },
    },
    applicationName: process.env.NEXT_PUBLIC_WEBSITE_NAME ?? "Help2Teach",
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: process.env.NEXT_PUBLIC_WEBSITE_NAME ?? "Help2Teach",
      description: process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION ?? "Help2Teach",
      url: "https://help2teach.de",
      siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME ?? "Help2Teach",
      images: [{ url: "/og-image.png" }],
      locale: "de",
      type: "website",
    },
  };
}

export default async function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <GoogleTagManager gtmId="GTM-KZCZMGNL" />
      <body>{children}</body>
    </html>
  );
}
