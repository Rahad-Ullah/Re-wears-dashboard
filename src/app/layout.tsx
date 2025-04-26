import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Re-Wears | Dashboard",
  description: "Multivendor e-commerce platform for second-hand clothing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-gradient-to-tl from-[#e9e9e2] to-[#ebe9e0] min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
