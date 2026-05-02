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
    default: "The Adhikari Collection | Handmade Art",
    template: "%s | The Adhikari Collection",
  },
  description:
    "The Adhikari Collection — handmade paintings and artwork by Swarnima and Samana.",
  openGraph: {
    title: "The Adhikari Collection | Handmade Art",
    description:
      "The Adhikari Collection — handmade paintings and artwork by Swarnima and Samana.",
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
