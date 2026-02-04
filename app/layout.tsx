import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Makati Adventures - My Travel Journey",
  description: "My personal website showcasing travel pictures and experiences in Makati City, Philippines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
