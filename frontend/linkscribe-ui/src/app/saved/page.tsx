import React from "react"
import SavedForm from "@/components/saved-page/sidebar/SideBarFormContext"
import SideBar from "@/components/saved-page/sidebar/SideBarContainer"
import BookmarkFolder from "@/components/saved-page/sidebar/BookmarkFolder"
import Bookmarks from "@/components/saved-page/bookmarks/Bookmarks"

export default function SavedPage() {
  const BACKEND_URL = process.env.BACKEND_URL
  return (
    // <div
    //   className="lg:sticky -order-1 top-[56px] flex flex-col
    //   w-full
    //   border-r-[1px] border-r-[#eaecf0] h-[calc(100vh-56px)] overflow-y-auto"
    // >
      <Bookmarks backendUrl={BACKEND_URL} />
    // </div>
  )
}
