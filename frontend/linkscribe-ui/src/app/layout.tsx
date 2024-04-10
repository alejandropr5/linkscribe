import type { Metadata } from "next"
import "./globals.css"
import texts from "@messages/en.json"


export const metadata: Metadata = {
  title: texts.Metadata.title,
  description: texts.Metadata.description,
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className="bg-white font-jakarta flex max-w-screen h-fit flex-col items-center justify-between"
      >
        { children }
      </body>
    </html>
  );
}
