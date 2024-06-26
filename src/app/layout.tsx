import type { Metadata } from "next";
import { Caladea } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import { WixClientContextProvider } from "@/context/wixContext";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import { Weight } from "lucide-react";
import AnimatedCursor from "react-animated-cursor";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Footer from "@/components/Footer";

const font = Caladea({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quinton",
  description: "eshop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(font.className, "bg-white dark:bg-gray-900 ")}>
        <WixClientContextProvider>
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="dark:hidden max-md:hidden">
              <AnimatedCursor
                innerSize={3}
                outerSize={25}
                innerStyle={{
                  border: "3px solid black",
                }}
                outerStyle={{
                  border: "1px solid black",
                  background: "transparent",
                }}
                outerAlpha={0.2}
                innerScale={0.7}
                outerScale={1.4}
              />
            </div>
            <div className="hidden dark:block max-md:hidden">
              <AnimatedCursor
                innerSize={3}
                outerSize={25}
                innerStyle={{
                  border: "3px solid white",
                }}
                outerStyle={{
                  border: "1px solid white",
                  background: "transparent",
                }}
                outerAlpha={0.2}
                innerScale={0.7}
                outerScale={1.4}
              />
            </div>
            <div className="">
              <Navbar />
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </WixClientContextProvider>
      </body>
    </html>
  );
}
