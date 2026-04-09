import type { Metadata } from "next";
import { Lacquer, Permanent_Marker } from "next/font/google";
import "./globals.css";

const lacquer = Lacquer({
  variable: "--font-lacquer",
  weight: "400",
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bosco Ng",
  description:
    "Portfolio of Bosco Ng — a software engineer who turns ideas into products that serve thousands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lacquer.variable} ${permanentMarker.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
