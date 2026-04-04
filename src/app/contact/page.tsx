import { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about artwork inquiries or commissions.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 px-6 lg:px-8 max-w-2xl mx-auto">
        <Suspense>
          <ContactForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
