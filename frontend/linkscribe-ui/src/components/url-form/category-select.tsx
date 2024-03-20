"use client"

import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import SearchSelect from "@/components/url-form/search-select"
import ClientImage from "@/components/utils/client-image"
import downArrow from "@public/down-arrow.svg"

export default function CategorySelect (data: {
  category: string
  setCategory: (newCategory: string) => void
  searchPlaceholder: string
  backendUrl: string | undefined
}) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const { data: session } = useSession()
  const router = useRouter()
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

  const handleOnClick = () => {
    if (session) {
      setShowDropdown(true)
    } else {
      router.push("/login", { scroll: false })
    }
  }

  return (
    <div className="relative w-fit">
      <button
        onClick={handleOnClick}
        type="button"
        className="flex flex-row items-center rounded-md bg-[#c1def193] text-[#52525b] font-medium w-fit h-fit text-xs pl-2"
      >
        <div className="max-w-[252px] overflow-hidden text-ellipsis">
          {data.category}
        </div>
        <div className="w-5 h-5 mx-2">
          <ClientImage imageComponent={downArrow} description={"Down Arrow SVG"} />
        </div>
      </button>
      {showDropdown &&
        <div className="absolute pb-2" ref={dropdown}>
          <SearchSelect
            setCategory={data.setCategory}
            setShowDropdown={setShowDropdown}
            searchPlaceholder={data.searchPlaceholder}
            backendUrl={data.backendUrl}
          />
        </div>      
      }
    </div>
  )
}