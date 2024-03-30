import React from "react"
import Bookmarks from "@/components/saved-page/bookmarks/Bookmarks"


export default function SavedPage() {
  const BACKEND_URL = process.env.BACKEND_URL
  return (
    <div className="py-6">
      <Bookmarks backendUrl={BACKEND_URL} />
    </div>
  )
}
