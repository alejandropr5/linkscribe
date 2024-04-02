"use client"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState, useRef } from "react"
import { readBookmarks } from "@/components/utils/bookmarkAPI"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { BookmarkResponse as Bookmark } from "@/components/utils/constants"
import ClientImage from "@/components/utils/ClientImage"
import optionsSVG from "@public/options.svg"


function EditBookmark ({ bookmark }: {
  bookmark: Bookmark
}) {
  const [ showModal, setShowModal ] = useState<boolean>(false)
  return (
    <>
      <div
        className="px-4 py-2 text-sm text-[#60606b] hover:bg-gray-100 cursor-pointer"
        onClick={() => { setShowModal(true) }}
      >
        Edit
      </div>
      {showModal &&
        <div
          className="absolute min-h-screen inset-0 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center px-6 bg-black/50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="h-auto overflow-hidden rounded-2xl bg-white shadow-2xl w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            woli
          </div>
        </div>
      }
    </>
  )
}


function OptionsButton ({ bookmark }: {
  bookmark: Bookmark
}) {
  const [ showDropdown, setShowDropdown ] = useState<boolean>(false)

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

  return (
    <div className="relative">
      <button
        className="w-7 h-7 p-2 rounded-full my-auto
        hover:bg-[#c1def193]"
        onClick={() => {setShowDropdown(true)}}
      >
        <ClientImage imageComponent={optionsSVG} description={"options SVG"} />
      </button>
      {showDropdown &&
        <div
          className="absolute bg-white right-0 top-[100%] rounded-xl shadow-lg max-w-64 z-10 app-background-color border border-color mt-1 overflow-hidden"
          ref={dropdown}
        >
          <EditBookmark bookmark={bookmark} />
          <div className="px-4 py-2 text-sm text-[#e76c6c] hover:bg-gray-100 cursor-pointer">
            Delete
          </div>          
        </div>
      }      
    </div>
  )
}


function BookmarkComponent ({ bookmark, isFirst, isLast }: {
  bookmark: Bookmark
  isFirst: boolean
  isLast: boolean
}) {
  return (
    <div
      className={`flex flex-row h-20 w-full
      shadow-sm shadow-[#c1def17c]
      ${isFirst ? "rounded-t-2xl" : ""}
      ${isLast ? "rounded-b-2xl" : ""}
      `}
    >
      <div className="flex justify-center items-center overflow-hidden my-1 rounded-lg min-w-32 max-w-32">
        <a className="mx-1 my-auto" href={bookmark.url}>
          <Image
            src={bookmark.image}
            alt={bookmark.name}
            className="w-fit max-h-[72px] rounded-lg"
            height={80}
            width={128}
          />
        </a>
      </div>
      <div
        className="flex flex-row justify-between mx-4 py-4 font-sans w-full"
      >
        <div  className="flex flex-col space-y-2">
          <a
            className="text-base font-normal leading-tight tracking-tight text-[#27272a]
            line-clamp-2 w-fit
            hover:underline"
            href={bookmark.url}
            target="_blank"
          >
            {bookmark.name}
          </a>
        </div>
        <div className="flex h-full items-center">
          <OptionsButton bookmark={bookmark} />
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

  const controllerRef = useRef<AbortController>()

  useEffect(() => {
    if ( controllerRef.current ) {
      controllerRef.current.abort()
    }

    controllerRef.current = new AbortController()
    const signal = controllerRef.current.signal
    
    if (session) {
      readBookmarks(backendUrl, session.user, searchParams, signal)
      .then((result: Bookmark[]) => setBookmarksList(result))
    }
  }, [backendUrl, searchParams, session])

  return (
    <div className="bg-white rounded-2xl w-full">
      {(bookmarksList ?? []).map((bookmark: Bookmark, index) => 
        <BookmarkComponent
          bookmark={bookmark}
          key={bookmark.id}
          isFirst={index == 0}
          isLast={bookmarksList?.length == index + 1}
        />
      )}
    </div>
  )
}
