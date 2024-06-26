"use client"

import React from "react"
import Image from "next/image"
import { Bookmark } from "@/types/types"
import { useBookmarkFormContext } from "@/components/url-form/bookmark-card/BookmarkForm"
import ClientImage from "@/components/utils/ClientImage"
import CircleCheck from "@public/check-circle.svg"

export default function BookmarkCard({ children, bookmark }: {
  children?: React.ReactNode,
  bookmark: Bookmark
}) {
  const { isSubmitSuccessful } = useBookmarkFormContext()
  return (
    <div
      className="flex flex-col sm:flex-row bg-white rounded-lg sm:h-40 sm:w-[580px]
      shadow-sm shadow-[#c1def193] border-[#c1def193]"
    >
      <div className="flex justify-center items-center overflow-hidden my-1 rounded-lg sm:min-w-64 sm:max-w-64">
        <div className="mx-1 my-auto">
          <Image
            src={bookmark.image}
            alt={bookmark.title}
            className="w-fit max-h-[152px] rounded-lg"
            height={160}
            width={256}
          />
        </div>
      </div>
      <div
        className="flex flex-col max-sm:h-[140px] justify-between px-4 py-4 font-sans w-full text-sm sm:text-base"
      >
        <div className="flex flex-col space-y-2 sm:max-w-[292px]">
          <a
            className="font-normal leading-tight tracking-tight text-[#27272a]
            line-clamp-2
            hover:underline"
            href={bookmark.url}
            target="_blank"
          >
            {bookmark.title}
          </a>
          {children}
        </div>
          {isSubmitSuccessful ? (
              <button
                type="submit"
                className="flex flex-row justify-center items-center px-6 py-1 rounded-full font-medium bg-[#8cb394] text-white w-full"
                disabled
              >
                <span>bookmark saved</span>
                <div className="w-5 h-5 ml-2">
                  <ClientImage imageComponent={CircleCheck} description={"Circle check SVG"} />
                </div>               
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-1 rounded-full font-medium bg-[#00152a] text-white w-full"
              >
                <span>save bookmark</span>             
              </button>
            )
          }
      </div>
    </div>
  )
}