import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Navbar from "@/components/shared/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Metadata, Viewport } from "next";
import React from "react";

export const metadata: Metadata = {
  applicationName: "Dev Overflow",
  title: "Dev Overflow",
  description:
    "Dev Overflow is a platform for developers to ask and answer questions",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dev Overflow",
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    apple: [
      {
        url: "/",
        sizes: "192x192",
        href: "/assets/pwa/192.png",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#FF7000",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
      <Toaster richColors />
    </main>
  );
};

export default Layout;
