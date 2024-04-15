"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import ClientImage from "@/components/utils/ClientImage"
import downArrow from "@public/down-arrow.svg"
import CategoryTree from "@/components/url-form/bookmark-card/CategoryTree"
import { useBookmarkFormContext } from "@/components/url-form/bookmark-card/BookmarkForm"
import { CategoryNode } from "@/types/types"
import { getUserCategories } from "@/components/utils/categoryAPI"
import { pathNames } from "@/lib/constants"

export default function CategorySelect () {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [categories, setCategories] = useState<CategoryNode>()

  const router = useRouter()
  const dropdown = useRef<HTMLDivElement>(null)
  const {
    bookmark,
    setCategory,
    backendUrl,
    session,
    isSubmitSuccessful
  } = useBookmarkFormContext()

  const bookmarkCategoryNameRef = useRef<string | null>(null);
  const setCategoryRef = useRef<(newCategory: CategoryNode) => void>(() => {});

  useEffect(() => {
    if (session) {
      getUserCategories(backendUrl, session.user as any)
        .then((result: CategoryNode) => {
          const categoryIndex = result.children.findIndex(
            child => child.name === bookmarkCategoryNameRef.current
          )
          if (categoryIndex === -1) {
            result.children.push({
              id: 0,
              name: bookmarkCategoryNameRef.current || "",
              father_id: result.id,
              children: []
            })
          } else {
            setCategoryRef.current(result.children[categoryIndex])
          }
          setCategories(result)
        })
    }
  }, [backendUrl, session])

  useEffect(() => {
    bookmarkCategoryNameRef.current = bookmark?.category?.name || null;
    setCategoryRef.current = setCategory;
  }, [bookmark?.category?.name, setCategory]);

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

  const handleOnClick = () => {
    if (session) {
      setShowDropdown(true)
    } else {
      router.push(pathNames.login, { scroll: false })
    }
  }

  return (
    <div className="relative w-fit">
      <button
        onClick={handleOnClick}
        type="button"
        className="flex flex-row items-center rounded-md bg-[#c1def193] text-[#52525b] font-medium w-fit h-fit text-xs px-2"
        disabled={isSubmitSuccessful ? true : false}
      >
        <div className="flex items-center max-w-[252px] h-5 overflow-hidden text-ellipsis">
          {bookmark?.category?.name}
        </div>
        {!isSubmitSuccessful &&
          <div className="w-5 h-5 ml-2">
            <ClientImage imageComponent={downArrow} description={"Down Arrow SVG"} />
          </div>
        }
      </button>
      {showDropdown &&
        <div className="absolute pb-2" ref={dropdown}>
          <div
            className="w-[300px] mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 space-y-1 text-sm" 
          >
            <div 
              className="max-h-40 overflow-y-auto px-1
              scrollbar-thin"
            >
              <CategoryTree
                categoryNode={categories as any}
                setCategory={setCategory}
                setShowDropdown={setShowDropdown}
                isFirst={true}
                showRoot={true}
              />
            </div>
          </div>
        </div>      
      }
    </div>
  )
}