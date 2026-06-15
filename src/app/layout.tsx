import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AetherLSCI | AI-Powered Non-Invasive Lipid Screening Device",
  description: "Advanced cardiovascular risk assessment using Laser Speckle Contrast Imaging (LSCI) and machine learning models for early screening of lipid disorders.",
  keywords: ["LSCI", "Laser Speckle Contrast Imaging", "Lipid Screening", "Cardiovascular Risk", "Machine Learning Healthcare", "Atherosclerosis"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
