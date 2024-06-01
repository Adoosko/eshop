import type { Metadata } from "next";

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import { WixClientContextProvider } from "@/context/wixContext";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

const font = localFont({ src: "Chillax-Regular.woff2" });

export const metadata: Metadata = {
  title: "Lama Dev E-Commerce Application",
  description: "A complete e-commerce application with Next.js and Wix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(font.className, "bg-background")}>
        <WixClientContextProvider>
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />

            {children}
          </ThemeProvider>
        </WixClientContextProvider>
      </body>
    </html>
  );
}
