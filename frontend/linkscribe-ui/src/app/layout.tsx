import type { Metadata } from "next";
import "./globals.css";
import PageWrapper from "@/components/layout/PageWrapper";
import Header from "@/components/layout/Header";
import Provider from "@/components/auth/Provider";
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
        <Provider>
          {auth}
          <Header/>
          <PageWrapper>
            {children}
          </PageWrapper>
        </Provider>
      </body>
    </html>
  );
}
