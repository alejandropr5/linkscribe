"use client"
import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { APIConstants, CategoryNode } from "@/components/utils/constants"
import CategoryTree from "@/components/url-form/bookmark-card/CategoryNode"


export default function SelectList (data: {
  category: string
  setCategory: (newCategory: string) => void
  categories: CategoryNode | undefined
  setCategories: React.Dispatch<React.SetStateAction<CategoryNode | undefined>>
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
  searchPlaceholder: string
  backendUrl: string | undefined
}) {
  
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
      .then((result: CategoryNode) => {
        console.log(result)
        const hasCategory = result.children.some(child => child.name === data.category)

        if (!hasCategory) {
          result.children.push({
            id: 0,
            name: data.category,
            father_id: result.id,
            children: []
          })
        }

        data.setCategories(result)
      })
      .catch(error => console.log('error', error));
  }, [session?.user?.token_type, session?.user?.access_token])

  return (
      <div
        className="w-[300px] mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 space-y-1 text-sm" 
      >
        <div 
          className="max-h-40 overflow-y-auto px-1
          scrollbar-thin"
        >
          <CategoryTree
            children={data.categories?.children}
            father_id={data.categories?.father_id}
            id={data.categories?.id}
            name={data.categories?.name}
            setCategory={data.setCategory}
            setShowDropdown={data.setShowDropdown}
            isFirst={true}
          />
        </div>
      </div>
  )
}