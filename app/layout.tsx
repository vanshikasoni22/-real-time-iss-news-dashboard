import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vanshika | Developer Portfolio",
  description: "A Netflix-inspired portfolio showcasing Vanshika's AI, web, experimental, and ongoing projects.",
  openGraph: {
    title: "Vanshika | Developer Portfolio",
    description: "Streaming-platform style portfolio for developer projects.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
