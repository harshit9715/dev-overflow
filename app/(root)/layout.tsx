import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Navbar from "@/components/shared/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dev Overflow",
  description:
    "Dev Overflow is a platform for developers to ask and answer questions",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
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
