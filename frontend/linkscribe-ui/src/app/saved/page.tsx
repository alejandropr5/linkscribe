import React from "react"
import Bookmarks from "@/components/saved-page/bookmarks/Bookmarks"


export default function SavedPage() {
  const BACKEND_URL = process.env.BACKEND_URL
  return (
    <div className="pt-6 px-6 pb-14 w-full">
      <Bookmarks backendUrl={BACKEND_URL} />
    </div>
  )
}
