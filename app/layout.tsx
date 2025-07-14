import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Secure Vault",
  description: "Secure your passwords in a single place of truth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
      <html lang="en">
        <body className={`${nunito.className} antialiased`}>
          <main className="max-w-7xl mx-auto px-5">
            <Navbar />
            {children}
            <Toaster />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
