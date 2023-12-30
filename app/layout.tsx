import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";
// export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "earthworm",
  description:
    "Learning English through the method of constructing sentences with conjunctions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster></Toaster>
      </body>
    </html>
  );
}
