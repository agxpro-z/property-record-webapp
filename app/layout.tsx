import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "./components/ui/sidebar";

export const metadata: Metadata = {
  title: "Property Record App",
  description: "Hyperledger Fabric Property Record App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <SidebarProvider>
          <div className="fixed w-full z-50">
            <Navbar />
          </div>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
