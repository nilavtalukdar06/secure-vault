import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "./Navbar";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "Secure Vault",
  description: "Secure your sensetive informations at one place",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className={`${outfit.className} antialiased`}>
          <main className="min-h-screen max-w-screen overflow-x-hidden relative">
            <Navbar />
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
