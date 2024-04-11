import React from "react"
import Header from "@/components/layout/Header"
import Provider from "@/components/auth/Provider"

export default function WithModalLayout ({
  children,
  auth
}: {
  children: React.ReactNode,
  auth: React.ReactNode;
}) {
  return (
    <>
      { auth }
      <Provider>
        <Header withSignButton={true} />
        <div className="flex flex-row min-h-[calc(100vh-56px)] w-full bg-gradient-to-br from-white to-[#f3f8fc]">
          { children }
        </div>
      </Provider>
    </>
  )
}
