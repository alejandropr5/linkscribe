import React, { Suspense } from "react"
import SideBarForm from "@/components/saved-page/sidebar/SideBarFormContext"
import BookmarkFolder from "@/components/saved-page/sidebar/BookmarkFolder"
import BookmarkFolderSkeleton from "@/components/saved-page/sidebar/BookmarkFolderSkeleton"


export default function SidebarPage() {
  const BACKEND_URL = process.env.BACKEND_URL
  return (
    <SideBarForm 
      backendUrl={BACKEND_URL}
    >
      <Suspense fallback={ <BookmarkFolderSkeleton /> }>
        <BookmarkFolder />
      </Suspense>
    </SideBarForm>
  )
}
