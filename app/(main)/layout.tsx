"use client";
import { useEffect } from "react";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { rewriteLocalStorageSetItem } from "@/lib/utils";
export default function MainLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    rewriteLocalStorageSetItem();
  }, []);
  return (
    <div className="flex flex-col h-full">
      <Header></Header>
      <main className="flex-grow">{children}</main>
      <Footer></Footer>
    </div>
  );
}
