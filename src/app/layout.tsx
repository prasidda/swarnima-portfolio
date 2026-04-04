import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Swarnima | Art Portfolio",
    template: "%s | Swarnima",
  },
  description:
    "Original artwork by Swarnima — exploring color, emotion, and form.",
  openGraph: {
    title: "Swarnima | Art Portfolio",
    description:
      "Original artwork by Swarnima — exploring color, emotion, and form.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-bg-primary text-text-primary antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1a1a1a",
              color: "#f5f0eb",
              border: "1px solid #262626",
            },
          }}
        />
      </body>
    </html>
  );
}
