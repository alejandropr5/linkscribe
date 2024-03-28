import type { Metadata } from "next";
import "./globals.css";
import PageWrapper from "@/components/layout/PageWrapper";
import Header from "@/components/layout/Header";
import Provider from "@/components/auth/Provider";
import texts from "@messages/en.json"
import { ToastContainer, Flip } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
        className="bg-white font-jakarta flex h-screen flex-col"
      >
        <Provider>
          {auth}
          <Header/>
          <PageWrapper>
            {children}
          </PageWrapper>
        </Provider>
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
