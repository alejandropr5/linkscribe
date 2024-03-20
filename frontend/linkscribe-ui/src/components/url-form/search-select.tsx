"use client"
import React, { useState, useEffect } from "react"
import { APIConstants } from "@/components/utils/constants"
import { useSession } from "next-auth/react"
import { CategoryNode } from "@/components/utils/constants"
import CategoryTree from "./category-tree"


export default function SelectList (data: {
  setCategory: (newCategory: string) => void
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
  searchPlaceholder: string
  backendUrl: string | undefined
}) {
  // const [search, setSearch] = useState<string>("")
  const [categories, setCategories] = useState<CategoryNode>()
  const { data: session } = useSession()

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      session?.user?.token_type + " " + session?.user?.access_token
    );
    
    fetch(data.backendUrl + APIConstants.READ_USER_CATEGORY_ROOT, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        setCategories(result)
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }, [data.backendUrl, session?.user?.token_type, session?.user?.access_token])

  return (
      <div
        className="w-[300px] mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 space-y-1 text-sm" 
      >
        {/* <div className="sticky top-0 bg-white pt-2 px-1">
          <input
            className="w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
            type="text"
            placeholder={data.searchPlaceholder}
            autoComplete="off"
            onChange={(e) => {setSearch(e.target.value)}}
          />
        </div> */}
        <CategoryTree 
          children={categories?.children}
          father_id={categories?.father_id}
          id={categories?.id}
          name={categories?.name}
          setCategory={data.setCategory}
          setShowDropdown={data.setShowDropdown}
        />
      </div>
  )
}