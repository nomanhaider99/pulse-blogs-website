import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/layouts/Footer";
import { currentUser } from "./actions/currentUser";

const font = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "PULSE | Read, Write & Create",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = currentUser();
  console.log(user);
  return (
    <html lang="en">
      <body
        className={`${font.className} w-full min-h-screen flex flex-col justify-between bg-white`}
      >
        <div className="w-full min-h-screen flex flex-col justify-between bg-white">
          {/* <Header /> */}
          <div className="py-5">{children}</div>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
