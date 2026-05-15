import type { Metadata } from "next";
import {
  Cinzel,
  Crimson_Text,
  JetBrains_Mono,
  Inter,
} from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ui/NavBar";

const displayFont = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Crimson_Text({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const uiFont = Inter({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Infinite Towers Online",
  description:
    "Dark fantasy terminal prototype for hero summoning, tower raids, and evolution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} ${uiFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg-terminal)] text-[var(--text-primary)]">
        <div className="min-h-full">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
