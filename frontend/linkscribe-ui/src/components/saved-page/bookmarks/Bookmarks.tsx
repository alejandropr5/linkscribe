"use client"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { readBookmarks } from "@/components/utils/bookmarkAPI"
import { useSession } from "next-auth/react"
import BookmarkComponent from "@/components/saved-page/bookmarks/Bookmark"
import { BookmarkResponse as Bookmark } from "@/components/utils/constants"


export default function Bookmarks({
  backendUrl
}: {
  backendUrl: string | undefined
}) {
  const searchParams = useSearchParams()
  const [ bookmarksList, setBookmarksList ] = useState<Bookmark[]>()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      readBookmarks(backendUrl, session.user, searchParams)
      .then((result: Bookmark[]) => setBookmarksList(result))
    }
  }, [backendUrl, searchParams, session])

  return (
    <div className="space-y-4">
      {(bookmarksList ?? []).map((bookmark: Bookmark) => 
        <BookmarkComponent
          bookmark={bookmark}
          key={bookmark.id}
        />
      )}
    </div>
  )
}
