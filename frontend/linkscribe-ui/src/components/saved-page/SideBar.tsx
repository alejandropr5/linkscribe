"use client"
import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import CategoryTree from "@/components/url-form/bookmark-card/CategoryTree"
import { CategoryNode } from "@/components/utils/constants"

export default function SideBar() {
  // const { handleSubmit, formState: { isSubmitSuccessful } } = useForm({ mode: "all" })
  // const { data: session } = useSession()
  // const [categories, setCategories] = useState<CategoryNode>()
  // const router = useRouter()

  // useEffect(() => {
  //   getUserCategories(backendUrl, session)
  //     .then((result: CategoryNode) => {
  //       console.log(result)
  //       const categoryIndex = result.children.findIndex(
  //         child => child.name === bookmark.category?.name
  //       )

  //       if (categoryIndex === -1) {
  //         result.children.push({
  //           id: 0,
  //           name: bookmark.category?.name,
  //           father_id: result.id,
  //           children: []
  //         })
  //       } else {
  //         setCategory(result.children[categoryIndex])
  //       }

  //       setCategories(result)
  //     })
  //     .catch(error => console.log('error', error))
  // }, [session?.user?.token_type, session?.user?.access_token])  
  return ( null
    // <div className="w-60 h-full">
    //   <div
    //     className="w-[300px] mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 space-y-1 text-sm" 
    //   >
    //     <div 
    //       className="max-h-40 overflow-y-auto px-1
    //       scrollbar-thin"
    //     >
    //       <CategoryTree
    //         categoryNode={categories as any}
    //         setCategory={setCategory}
    //         setShowDropdown={setShowDropdown}
    //         isFirst={true}
    //       />
    //     </div>
    //   </div>
    // </div>
  )
}
