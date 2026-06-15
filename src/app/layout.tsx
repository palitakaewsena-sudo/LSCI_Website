import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Zycel | ระบบต้นแบบคัดกรองความเสี่ยงหัวใจและหลอดเลือดแบบไม่รุกราน",
  description:
    "ระบบวิจัยต้นแบบสำหรับวิเคราะห์สัญญาณทางสรีรวิทยาจากวิดีโอ Laser Speckle Contrast Imaging (LSCI) เพื่อคัดกรองความเสี่ยงทางหัวใจและหลอดเลือดด้วยเทคนิค Machine Learning",
  keywords: [
    "LSCI",
    "Laser Speckle Contrast Imaging",
    "SPG",
    "NIR-iPPG",
    "Cardiovascular Screening",
    "Machine Learning",
    "Zycel",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
