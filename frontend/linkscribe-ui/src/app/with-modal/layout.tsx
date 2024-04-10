import React from "react"
import { ToastContainer, Flip } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import BookmarkEditModal from "@/components/saved-page/bookmarks/BookmarkEditRSC"
import Header from "@/components/layout/Header"
import Provider from "@/components/auth/Provider"

export default function WithModalLayout ({
  children,
  auth
}: {
  children: React.ReactNode,
  auth: React.ReactNode;
}) {
  return (
    <>
      <Provider>
        { auth }
        <Header withSignButton={true} />
        <div className="flex flex-row min-h-[calc(100vh-56px)] w-full bg-gradient-to-br from-white to-[#f3f8fc]">
          { children }
        </div>
        <BookmarkEditModal />
      </Provider>
      <ToastContainer
        position="bottom-center"
        autoClose={3500}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={false}
        theme="colored"
        transition={Flip}
      />
    </>
  )
}
