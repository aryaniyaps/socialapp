import QueryProvider from "@/components/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: APP_NAME,
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <QueryProvider>{children}</QueryProvider>
        {/* toaster goes here */}
        <Toaster />
      </body>
    </html>
  );
}
