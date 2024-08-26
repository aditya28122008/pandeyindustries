import { Inter } from "next/font/google";
import "./globals.css";
// import { useState } from "react";
import Header from "@/Components/Header";
import LoadingBarWrapper from "@/context/LoadingBar/LoadingBarWrapper";
import CartWrapper from "@/context/Cart/CartWrapper";
import SessionWrapper from "@/Components/SessionWrapper";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ModeProvider from "@/Components/ModeProvider";
// import LoadingBar from "react-top-loading-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pandey Industries",
  description: "A rhobust merchendise from the Pandey Industries",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/Favicon.svg" type="image/x-icon" />
      </head>
      <body>
        <ModeProvider>
          <SessionWrapper>
            <LoadingBarWrapper>
              <CartWrapper>
                {/* <LoadingBarComponent> */}
                <div className="dark:bg-gray-900 dark:text-white">
                  <Header />
                  <div className="lg:pt-20 md:py-32 pt-40">
                    {children}
                    <Analytics />
                    <SpeedInsights />
                  </div>
                </div>
                {/* </LoadingBarComponent> */}
              </CartWrapper>
            </LoadingBarWrapper>
          </SessionWrapper>
        </ModeProvider>
      </body>
    </html>
  );
}
