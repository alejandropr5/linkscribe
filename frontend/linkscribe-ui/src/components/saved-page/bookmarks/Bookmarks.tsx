"use client"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { readBookmarks } from "@/components/utils/bookmarkAPI"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { BookmarkResponse as Bookmark } from "@/components/utils/constants"


function BookmarkComponent({ bookmark }: {
  bookmark: Bookmark
}) {
  return (
    <div
      className="flex flex-row bg-white rounded-lg h-40 mx-10 w-full
      shadow-md shadow-[#c1def193] border-[#c1def193]"
    >
      <div className="flex justify-center items-center overflow-hidden my-1 rounded-lg min-w-64 max-w-64">
        <div className="mx-1 my-auto">
          <Image
            src={bookmark.image}
            alt={bookmark.name}
            className="w-fit max-h-[152px] rounded-lg"
            height={160}
            width={256}
          />
        </div>
      </div>
      <div
        className="flex flex-col justify-between mx-4 py-4 font-sans w-full"
      >
        <div  className="flex flex-col space-y-2">
          <a
            className="text-base font-normal leading-tight tracking-tight text-[#27272a]
            line-clamp-2
            hover:underline"
            href={bookmark.url}
            target="_blank"
          >
            {bookmark.name}
          </a>
          <button
            type="button"
            className="flex flex-row items-center rounded-md bg-[#c1def193] text-[#52525b] font-medium w-fit h-fit text-xs px-2"
          >
            <div className="flex items-center max-w-[252px] h-5 overflow-hidden text-ellipsis">
              {bookmark?.category_id}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}


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
