import React, { Suspense } from "react"
import SearchInput from "@/components/saved-page/search/SearchInput"
import ToggleListGrid from "@/components/saved-page/search/ToggleListGrid"

export default function SearchPage() {
  return (
    <div className="sticky top-14 w-full z-40 inset-0 my-3">
      <Suspense>
        <SearchInput />
      </Suspense>
      {/* <ToggleListGrid /> */}
    </div>
  )
}
