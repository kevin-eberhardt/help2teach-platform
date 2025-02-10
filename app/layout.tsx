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
      <body>{children}</body>
    </html>
  );
}
