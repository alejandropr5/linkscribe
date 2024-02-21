import type { Metadata } from "next";
import "./globals.css";
import PageWrapper from "@/components/layout/page-wrapper";
import Header from "@/components/layout/header";
import texts from "@messages/en.json"

export const metadata: Metadata = {
  title: texts.Metadata.title,
  description: texts.Metadata.description,
};

export default function RootLayout({
  children,
  auth
}: {
  children: React.ReactNode,
  auth: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="bg-white font-jakarta flex h-screen flex-col items-center justify-between"
      >
        {auth}
        <Header/>
        <PageWrapper>
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}
