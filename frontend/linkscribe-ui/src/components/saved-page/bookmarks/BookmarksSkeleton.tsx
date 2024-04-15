import React from "react"

function BookmarkComponent ({ isFirst, isLast }: {
  isFirst: boolean
  isLast: boolean
}) {
  return (
    <div
      className={`flex flex-row h-14 sm:h-20 w-full
      shadow-sm shadow-[#c1def17c]
      ${isFirst ? "rounded-t-2xl" : ""}
      ${isLast ? "rounded-b-2xl" : ""}
      `}
    >
      <div
        className="flex justify-center items-center overflow-hidden my-1 rounded-lg
        sm:min-w-32 sm:max-w-32 min-w-16 max-w-16"
      >
        <div
          className="mx-1 my-auto"
        >
          <div
            className="w-28 h-10 sm:h-[70px] rounded-lg bg-[#f1f6ff] animate-pulse"
          />
        </div>
      </div>
      <div
        className="flex flex-row justify-between font-sans w-full
        mx-2 sm:mx-4 py-3 sm:py-4 space-x-2 sm:space-x-4"
      >
        <div  className="relative flex w-full overflow-hidden">
          <div
            className="absolute font-normal leading-tight tracking-tight text-[#27272a]
            bg-[#f1f6ff] animate-pulse
            line-clamp-2 sm:text-base text-xs
            hover:underline
            w-full h-8 rounded-lg"
          >
          </div>
        </div>
      </div>
    </div>
  )
}


export default function BookmarksSkeleton() {
  var bookmarkSkeletons = []
  const n = 8

  for (var i = 0; i < n; i++) {
    bookmarkSkeletons.push(
      <BookmarkComponent
        isFirst={i == 0}
        isLast={n == i + 1}
        key={i}
      />
    )
  }

  return bookmarkSkeletons
}
