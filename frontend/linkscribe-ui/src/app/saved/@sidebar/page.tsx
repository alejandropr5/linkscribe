import React, { Suspense } from "react"
import SideBarForm from "@/components/saved-page/sidebar/CategoryForm"
import BookmarkFolder from "@/components/saved-page/sidebar/BookmarkFolder"
import BookmarkFolderSkeleton from "@/components/saved-page/sidebar/BookmarkFolderSkeleton"


export default function SidebarPage() {
  const BACKEND_URL = process.env.BACKEND_URL
  return (
    <SideBarForm 
      backendUrl={BACKEND_URL}
    >
      <Suspense>
        <BookmarkFolder />
      </Suspense>
    </SideBarForm>
  )
}
