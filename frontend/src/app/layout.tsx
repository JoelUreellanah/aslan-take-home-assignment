import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import Providers from "@/app/providers";
import { NavigationBar } from "@/components/Nav/Nav";

export const metadata: Metadata = {
  title: "Aslan Products",
  description: "Browse your products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavigationBar />
        <Providers>
          <main className="max-w-6xl mx-auto mt-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
