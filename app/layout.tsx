import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    absolute: "Help2Teach",
    default: "Help2Teach",
    template: "%s | Help2Teach",
  },
  description: "Klassenmanagement neu gedacht",
  authors: [{ name: "Kevin Eberhardt", url: "https://kevin-eberhardt.de" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
