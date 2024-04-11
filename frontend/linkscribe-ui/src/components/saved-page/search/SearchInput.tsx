"use client"
import React, { useRef } from "react"
import queryString from "query-string"
import { useSearchParams } from "next/navigation"
import ClientImage from "@/components/utils/ClientImage"
import searchSVG from "@public/search.svg"
import { useCategoryFormContext } from "@/components/saved-page/sidebar/CategoryForm"

export default function SearchInput() {
  const { register } = useCategoryFormContext()
  const searchParams = useSearchParams()
  const params = queryString.parse(searchParams?.toString() ?? "")
  const searchInput = useRef<string>(
    typeof params.search === "string" ? params.search : ""
  )

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        autoComplete="text"
        className="px-14 w-full bottom-6 h-14 rounded-full bg-white shadow-md shadow-[#c1def193]
        text-[#27272a] font-sans text-sm min-[500px]:text-base font-normal placeholder-shown:font-medium
        focus:outline-none focus:border-[#c1def1] border-[1.5px] focus:border-2"
        { ...register("search", {
          value: searchInput.current
        }) }
      />
      <button
        type="button"
        className="absolute top-1/2 transform -translate-y-1/2 w-9 h-9 left-4 rounded-full p-2
        hover:bg-[#c1def193]"
      >
        <ClientImage imageComponent={searchSVG} description={"Search SVG"} />
      </button>
    </>
  )
}
