"use client"
import React, { useState } from "react"
import ClientImage from "@/components/utils/ClientImage"
import listSVG from "@public/list.svg"
import gridSVG from "@public/grid.svg"
import downArrowSVG from "@public/down-arrow.svg"

export default function ToggleListGrid() {
  const [ showList, setShowList ] = useState<boolean>(true)

  const handleOnClick = () => {
    setShowList(!showList)
  }

  return (
    <div className="absolute flex-row flex right-5 top-1/2 transform -translate-y-1/2 h-9">
      <div className="w-fit h-fit border-r-2">
        <button
          type="button"
          className="w-9 h-9 p-2 rounded-l-md
          hover:bg-[#c1def193]"
          onClick={handleOnClick}
        >
          {showList ? (            
            <ClientImage imageComponent={listSVG} description={"list SVG"} />
          ) : (
            <ClientImage imageComponent={gridSVG} description={"grid SVG"} />
          )}
        </button>

      </div>
      <div className="w-fit h-full">
       <button
          type="button"
          className="w-fit h-full rounded-r-md px-1
          hover:bg-[#c1def193]"
        >
          <div className="w-5 h-5">
            <ClientImage imageComponent={downArrowSVG} description={"down arrow SVG"} />
          </div>
        </button>
      </div>
    </div>
  )
}
