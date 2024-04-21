import type { Metadata, Viewport } from "next"
import "./globals.css"
import texts from "@messages/en.json"
import { ToastContainer, Flip } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


export const metadata: Metadata = {
  title: texts.Metadata.title,
  description: texts.Metadata.description,
};

export const viewport: Viewport = {
  viewportFit: "cover"
}

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
      <ToastContainer
        position="bottom-center"
        autoClose={3500}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={false}
        theme="colored"
        transition={Flip}
      />
      </body>
    </html>
  );
}
