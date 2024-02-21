"use client"

import React from "react"
import Image from "next/image"

export default function BookmarkCard(data: {
  children?: React.ReactNode
  url: string
  imgScr: string
  title: string
}) {
  return (
    <div className="py-8 md:py-10 xl:py-12 2xl:py-14">
      <div
        className="flex flex-row bg-white rounded-lg h-40 w-[580px]
        shadow-md shadow-[#c1def193] border-[#c1def193]"
      >
        <div className="flex justify-center items-center overflow-hidden my-1 rounded-lg min-w-64 max-w-64">
          <div className="mx-1 my-auto">
            <Image
              src={data.imgScr}
              alt={data.title}
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
              max-w-[292px] line-clamp-2
              hover:underline"
              href={data.url}
              target="_blank"
            >
              {data.title}
            </a>
            {data.children}
          </div>
          <button type="submit" className="px-6 py-1 rounded-full font-medium bg-[#00152a] text-white w-full">
            <span>save bookmark</span>
          </button>
        </div>
      </div>
    </div>
  )
}