import React, { Suspense } from "react"
import Bookmarks from "@/components/saved-page/bookmarks/Bookmarks"


export default function SavedPage() {
  const BACKEND_URL = process.env.BACKEND_URL
  return (
    <div className="pt-4 px-6 pb-14 w-full">      
      <Suspense>
        <Bookmarks backendUrl={BACKEND_URL} />
      </Suspense>
    </div>
  )
}
