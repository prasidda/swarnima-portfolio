import type { Metadata } from "next";
import { Nunito, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Swarnima | Handmade Art",
    template: "%s | Swarnima",
  },
  description:
    "Handmade paintings and artwork by Swarnima — made with love, one brushstroke at a time.",
  openGraph: {
    title: "Swarnima | Handmade Art",
    description:
      "Handmade paintings and artwork by Swarnima — made with love, one brushstroke at a time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-bg-primary text-text-primary antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#3d3029",
              border: "1px solid #e8ddd3",
            },
          }}
        />
      </body>
    </html>
  );
}
