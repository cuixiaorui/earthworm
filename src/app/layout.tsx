import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "earthworm",
  description:
    "Learning English through the method of constructing sentences with conjunctions",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          {" "}
          <div className="flex flex-col">
            <div className="mb-18">{children} </div>
            <Footer />{" "}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
