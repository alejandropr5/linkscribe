"use client"

import React from "react"

export default function BookmarkCard(data: {
  url: string
  imgScr: string
  title: string
  category: string
}) {
  return (
    <a
      href={data.url}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"
      rel="noopener noreferrer nofollow external"
      target="_blank"
    >
      <img
        className="object-cover w-auto rounded-t-lg h-96 md:h-auto md:w-64 md:rounded-none md:rounded-s-lg"
        src={data.imgScr}
        alt={data.title}
      />
      <div
        className="flex flex-col justify-between mx-4 py-1 text-base font-semibold tracking-tight text-[#27272a]
        font-jakarta overflow-x-hidden text-ellipsis"
      >
        {data.title}
      </div>
    </a>
  )
}