import React from "react"

export default function SideBarContainer({ children }: {children: React.ReactNode}) {
  return (
    <div
      className="sticky -order-1 top-[56px] flex flex-col
      w-[350px] 2xl:w-[370px] 3xl:w-[400px]
      border-r-[1px] border-r-[#eaecf0] h-[calc(100vh-56px)] overflow-y-auto"
    >
      {children}
    </div>
  )
}
