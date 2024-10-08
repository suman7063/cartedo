import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AddCourses from "@/components/AddCourses";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "All Courses",
  description: "Generated by Cartedo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header/>
      <div className="flex items-start mt-[55px] max-w-[1500px] mx-auto">
      <AddCourses/>
      {children}
      </div>

       
        </body>
    </html>
  );
}
