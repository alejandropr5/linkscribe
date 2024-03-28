import React from "react"
import SideBarForm from "@/components/saved-page/sidebar/SideBarFormContext"
import BookmarkFolder from "@/components/saved-page/sidebar/BookmarkFolder"

export default function sidebarPage() {
  const BACKEND_URL = process.env.BACKEND_URL
  return (
    <SideBarForm 
      backendUrl={BACKEND_URL}
    >
      <BookmarkFolder />
    </SideBarForm>
  )
}
