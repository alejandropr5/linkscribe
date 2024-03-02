"use client"

import { useEffect, useRef, useState } from "react"
import ClientImage from "@/components/utils/client-image"
import userSVG from "@public/user.svg"

export default function UserButton (data: {
  onClick: () => void
}) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const dropdown = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!dropdown.current?.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    window.addEventListener("mousedown", handleOutSideClick)

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick)
    }
  }, [dropdown])
  return (
    <div className="flex relative justify-between">
      <button
        className="w-8 h-8"
        onClick={() => {setShowDropdown(true)}}
      >
        <ClientImage description="User icon SVG" imageComponent={userSVG}/>
      </button>    
      {showDropdown &&
        <div
          className="absolute bg-white right-0 top-[100%] rounded-xl shadow-lg py-1 w-64 z-10 app-background-color border border-color mt-1"
          ref={dropdown}
        >
          <div
            onClick={data.onClick}
            className="block py-2 mx-1 font-medium text-[#27272a] hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-xl"
          >
            <div className="mx-4 overflow-hidden text-ellipsis">
              Sign Out
            </div>
          </div>
          <div className="px-4 py-2 text-sm text-[#60606b] truncate border-t border-color-subtle mt-1">
            alejandro.perdomo@uao.edu.co
          </div>          
        </div>
      }
    </div>

  )
}