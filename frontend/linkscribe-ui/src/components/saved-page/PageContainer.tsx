"use client"

import React, { useState } from "react"
import ClientImage from "../utils/ClientImage"
import rightArrowSVG from "@public/right-arrow.svg"
import leftArrowSVG from "@public/left-arrow.svg"

export function SidebarContainer ({
  children
} : {
  children: React.ReactNode
}) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false)
  return (
    <div
      className="fixed flex-row flex top-[56px] z-40 max-h-[calc(100vh-56px)] h-full
      max-lg:shadow-xl max-lg:shadow-[#38444d60]"
    >
      <div
        className={`flex sm:flex-col flex-col-reverse sm:h-full z-30
        lg:border-r-[1px] border-r-[#eaecf0] max-lg:bg-white        
        transition-all overflow-x-hidden
        lg:w-[300px] 3xl:w-[350px]
        ${ showSidebar ? "w-[300px]" : "w-0" }`}
      >
        { children }
      </div>
      <div className="flex items-center lg:hidden">
        <button
          onClick={() => setShowSidebar(showSidebar => !showSidebar)}
          type="button"
          className="absolute -right-6 top-1/2 transform -translate-y-1/2
          w-6 h-16 px-1 z-20
          bg-white shadow-lg shadow-[#38444d60]
          rounded-r-3xl border-[1px] border-r-[#eaecf0] border-l-white"
        >
          <ClientImage
            imageComponent={showSidebar ? leftArrowSVG : rightArrowSVG}
            description={"Toggle sidebar view"}
          />
        </button>
      </div>
    </div>
  )
}

export function ContentContainer ({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <div
      className="flex flex-col min-h-full h-fit z-0 items-center
      lg:ml-[300px] 3xl:ml-[350px]
      px-1 sm:px-6 xl:px-16 2xl:px-24  3xl:px-32
      flex-grow"
    >
      { children }
    </div>
  )
}
