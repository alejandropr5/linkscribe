import React, { Suspense } from "react"
import SideBarForm from "@/components/saved-page/sidebar/CategoryForm"
import BookmarkFolder from "@/components/saved-page/sidebar/BookmarkFolder"
import SyncDataUrl from "@/components/saved-page/sidebar/SyncDataUrl"


export default function SidebarPage() {
  return (
    <>
      <SyncDataUrl />
      <Suspense>
        <BookmarkFolder />
      </Suspense>
    </>
  )
}
