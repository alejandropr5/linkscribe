"use client"
import React, { useEffect, useState } from "react"
import queryString from "query-string"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import ClientImage from "@/components/utils/ClientImage"
import searchSVG from "@public/search.svg"

export default function SearchInput() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = queryString.parse(searchParams?.toString() ?? "")
  const [searchInput, setSearchInput] = useState<string>(
    typeof params.search === "string" ? params.search : ""
  )

  const handleOnChange = (even: any) => {
    setSearchInput(even.target.value)
  }

  useEffect(() => {
    params.search = (searchInput !== "" ? searchInput : null)

    const stringfiedParams = queryString.stringify(params, { skipNull: true })
    router.push(pathname + (stringfiedParams ? `?${stringfiedParams}` : ""))

  }, [params, searchInput])

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        autoComplete="text"
        className="px-14 w-full bottom-6 h-14 rounded-full bg-white shadow-md shadow-[#c1def193]
        text-[#27272a] font-sans text-sm min-[500px]:text-base font-normal placeholder-shown:font-medium
        focus:outline-none focus:border-[#c1def1] border-[1.5px] focus:border-2"
        value={searchInput}
        onChange={handleOnChange}
      />
      <button
        type="submit"
        className="absolute top-1/2 transform -translate-y-1/2 w-9 h-9 left-4 rounded-full p-2
        hover:bg-[#c1def193]"
      >
        <ClientImage imageComponent={searchSVG} description={"Search SVG"} />
      </button>
    </>
  )
}
