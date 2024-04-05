import React from "react"
import BookmarkEditModal from "@/components/saved-page/bookmarks/BookmarkEdit"

export default function BookmarkEdit() {
  const BACKEND_URL = process.env.BACKEND_URL
  return (
    <div>
      <BookmarkEditModal backendUrl={BACKEND_URL} />
    </div>
  )
}
