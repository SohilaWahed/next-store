'use client'
import Navbar from "@/components/ui/Navbar/Navbar";
import Footer from "../../ui/Footer/Footer";
import { Toaster } from "react-hot-toast";
import GetcartconextProvider from "../../ui/Context/getcartconext";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <GetcartconextProvider>
        <Navbar />
        <div className="py-5 container m-auto">
          <Toaster />
          {children}
        </div>
        <Footer />
      </GetcartconextProvider>
    </SessionProvider>
  );
}
