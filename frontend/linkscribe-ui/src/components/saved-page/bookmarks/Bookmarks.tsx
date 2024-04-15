"use client"
import { useSearchParams, usePathname } from "next/navigation"
import React, { useEffect, useState, useRef, createContext, useContext } from "react"
import { deleteUserBookmark, readBookmarks } from "@/components/utils/bookmarkAPI"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "react-toastify"

import { BookmarkResponse as Bookmark, CategoryNode } from "@/types/types"
import useBookmarkData from "@/hooks/useBookmarkData"
import ClientImage from "@/components/utils/ClientImage"
import optionsSVG from "@public/options.svg"
import { useCategoryFormContext } from "../sidebar/CategoryForm"
import useCategoriesData from "@/hooks/useCategoriesData"
import queryString from "query-string"
import { searchCategory } from "@/components/utils/functions"
import folderSVG from "@public/folder-blue.svg"

interface ContextProps {
  forceUpdate: () => void
}

function OptionsDropdown ({ bookmark, setShowDropdown }: {
  bookmark: Bookmark,
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { setBookmark } = useBookmarkData()
  const { backendUrl, session } = useCategoryFormContext()
  const { forceUpdate } = useBookmarksContext()
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
  }, [dropdown, setShowDropdown])

  const handleEditButton = () => {
    setBookmark(bookmark)
    setShowDropdown(false)
  }

  const handleDeleteButton = async () => {
    await deleteUserBookmark(backendUrl, session?.user as any, bookmark.id)
    toast.info(`\"${bookmark.name}\" deleted`)
    forceUpdate()
  }

  return (  
    <div
      className="absolute bg-white right-0 top-[100%] rounded-xl shadow-lg max-w-64 z-10 app-background-color border border-color mt-1 overflow-hidden"
      ref={dropdown}
    >
      <div
        className="px-4 py-2 text-sm text-[#60606b] hover:bg-gray-100 cursor-pointer"
        onClick={handleEditButton}
      >
        Edit
      </div>
      <div
        className="px-4 py-2 text-sm text-[#e76c6c] hover:bg-gray-100 cursor-pointer"
        onClick={handleDeleteButton}
      >
        Delete
      </div>          
    </div>
  )
}


function OptionsButton ({ bookmark }: {
  bookmark: Bookmark
}) {
  const [ showDropdown, setShowDropdown ] = useState<boolean>(false)
  return (
    <div className="relative">
      <button
        type="button"
        className="w-7 h-7 p-2 rounded-full my-auto
        hover:bg-[#c1def193]"
        onClick={() => setShowDropdown(true)}
      >
        <ClientImage imageComponent={optionsSVG} description={"options SVG"} />
      </button>
      {showDropdown &&
        <OptionsDropdown bookmark={bookmark} setShowDropdown={setShowDropdown} />
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
        <a
          className="mx-1 my-auto"
          href={bookmark.url}
          target="_blank"
        >
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
        className="flex flex-row justify-between mx-4 py-4 font-sans w-full space-x-4"
      >
        <div  className="relative flex w-full overflow-hidden">
          <a
            className="absolute text-base font-normal leading-tight tracking-tight text-[#27272a]
            line-clamp-2
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


const BookmarksContext = createContext<ContextProps>({
  forceUpdate: null as any
})


function BookmarkProvider ({
  children,
  forceUpdate
} : {
  children: React.ReactNode
  forceUpdate: React.DispatchWithoutAction
}) {
  return (
    <BookmarksContext.Provider 
      value={{
        forceUpdate
      }}
    >
      { children }
    </BookmarksContext.Provider>
  )
}

const useBookmarksContext = () => useContext(BookmarksContext)


function FolderComponent ({ category, pathName, isFirst, isLast }: {
  category: CategoryNode
  pathName: string | null
  isFirst: boolean
  isLast: boolean
}) {
  return (
    <Link
      className={`flex flex-row h-20 w-full
      shadow-sm shadow-[#c1def17c] hover:bg-gray-100
      ${isFirst ? "rounded-t-2xl" : ""}
      ${isLast ? "rounded-b-2xl" : ""}
      `}
      href={`${pathName}?cat=${category.id}`}
    >
      <div className="flex justify-center items-center overflow-hidden my-1 rounded-lg min-w-32 max-w-32">
        <div
          className="mx-1 my-auto"
        >
          <Image
            src={folderSVG}
            alt="Folder icon"
            className="w-fit h-[72px] rounded-lg"
            height={100}
            width={100}
          />
        </div>
      </div>
      <div
        className="flex flex-row justify-between mx-4 py-4 font-sans w-full space-x-4"
      >
        <div  className="relative flex w-full overflow-hidden items-center">
          <span
            className="absolute text-base font-medium leading-tight tracking-tight text-[#27272a]
            line-clamp-2"
          >
            {category.name}
          </span>
        </div>
      </div>
    </Link>
  )
}


export default function Bookmarks({
  backendUrl
}: {
  backendUrl: string | undefined
}) {
  const [parentCategory, setParentCategory] = useState<CategoryNode | null>(null)
  const [bookmarksList, setBookmarksList] = useState<Bookmark[]>()
  const [value, setValue] = useState<number>(0)
  const controllerRef = useRef<AbortController>()

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { bookmark } = useBookmarkData()
  const { categories } = useCategoriesData()
  const { data: session } = useSession()

  const params = queryString.parse(searchParams?.toString() ?? "")
  const cat = typeof params.cat === "string" ? params.cat : ""
  const search = typeof params.search === "string" ? params.search : undefined

  useEffect(() => {
    setParentCategory(searchCategory(categories as CategoryNode, Number(cat)))
  }, [cat, categories])

  useEffect(() => {
    if (!bookmark) {
      if ( controllerRef.current ) {
        controllerRef.current.abort()
      }
  
      controllerRef.current = new AbortController()
      const signal = controllerRef.current.signal
      
      if (session) {
        readBookmarks(backendUrl, session.user, searchParams, signal)
        .then((result: Bookmark[]) => setBookmarksList(result))
      }
    }
  }, [backendUrl, searchParams, session, bookmark, value])

  const forceUpdate = () => {
    setValue(value => value + 1)
  }

  return (
    <div className="bg-white rounded-2xl w-full">
      <BookmarkProvider forceUpdate={ forceUpdate } >
        {(bookmarksList ?? []).map((bookmark: Bookmark, index) =>
          <BookmarkComponent
            bookmark={bookmark}
            isFirst={index == 0}
            isLast={
              bookmarksList?.length == index + 1 && (parentCategory?.children ?? []).length == 0 
            }
            key={bookmark.id}
          />
        )}
      </BookmarkProvider>
      {!search && (parentCategory?.children ?? []).map(
        (category: CategoryNode, index) => 
        <FolderComponent
          category={category}
          pathName={pathname}
          isFirst={index == 0 && (bookmarksList ?? []).length == 0}
          isLast={parentCategory?.children.length == index + 1}
          key={category.id}
        />
      )}
    </div>
  )
}
