import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter, Space_Grotesk as SpaceGrotesk } from "next/font/google";
import React from "react";
import { PHProvider } from "./providers";

import PostHogPageView from "@/components/shared/PostHogPageView";
import { ThemeProvider } from "@/context/ThemeProvider";
import "../styles/prism.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "NextJs 14 with Clerk",
  description: "Stackoverflow clone with NextJs 14 and Clerk",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <PHProvider>
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          <PostHogPageView />
          <ClerkProvider
            appearance={{
              elements: {
                formButtonPrimary: "primary-gradient",
                footerActionLink:
                  "primary-text-gradient hover: text-primary-500",
              },
            }}
          >
            <ThemeProvider>{children}</ThemeProvider>
          </ClerkProvider>
        </body>
      </PHProvider>
    </html>
  );
};

export default RootLayout;
