"use client"
import React, { useState } from "react"

export default function SelectList (data: {
  setCategory: (newCategory: string) => void
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
  searchPlaceholder: string
}) {
  const [search, setSearch] = useState<string>("")
  
  const categories: string[] = ([
    "Uppercase",
    "Lowercase",
    "Camel Case",
    "Kebab Case"
  ])

  return (
      <div
        className="w-[300px] mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 pb-1 space-y-1 text-sm" 
      >
        <div className="sticky top-0 bg-white pt-2 px-1">
          <input
            className="w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
            type="text"
            placeholder={data.searchPlaceholder}
            autoComplete="off"
            onChange={(e) => {setSearch(e.target.value)}}
          />
        </div>
        <div
          className="max-h-36 overflow-y-auto px-1
          scrollbar-thin"
        >
          {categories.filter((category) => {
            return (
              search.toLocaleLowerCase() === ""
              ? category
              : category.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            )
            }).map((category) => {
              const handleOnClick = () => {
                data.setCategory(category)
                data.setShowDropdown(false)
              }
              return (
                <div
                  key={category}
                  onClick={handleOnClick}
                  className="block py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md overflow-hidden"
                >
                  <div className="mx-4 overflow-hidden text-ellipsis">
                    {category}
                  </div>
                </div>
              )
          })}
        </div>
      </div>
  )
}