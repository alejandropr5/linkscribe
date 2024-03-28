"use client"
import React, { Suspense, useEffect, useState } from "react"
import { useSideBarFormContext } from "@/components/saved-page/sidebar/SideBarFormContext"
import CategoryTree from "@/components/saved-page/sidebar/CategoryTree"
import { getUserCategories } from "@/components/utils/categoryAPI"
import { CategoryNode } from "@/components/utils/constants"
import BookmarkFolderSkeleton from "@/components/saved-page/sidebar/BookmarkFolderSkeleton"

export default function BookmarkFolder() {
  const { backendUrl, session } = useSideBarFormContext()
  const [categories, setCategories] = useState<CategoryNode>()

  useEffect(() => {
    if (session) {
      getUserCategories(backendUrl, session.user as any)
      .then((result: CategoryNode) => setCategories(result))
    }
  }, [backendUrl, session])  

  return (
    <div className="mr-1 overflow-y-auto">
      {categories ? (
        <CategoryTree
          categoryNode={categories as any}
          isFirst={true}
        />
      ) : (
        <BookmarkFolderSkeleton />
      )
      }
      {/* <Suspense fallback={ <BookmarkFolderSkeleton /> }>
        <CategoryTree
          categoryNode={categories as any}
          isFirst={true}
        />
      </Suspense>
      <BookmarkFolderSkeleton /> */}
    </div>
  )
}
