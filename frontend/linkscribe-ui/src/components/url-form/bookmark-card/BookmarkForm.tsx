"use client"
import React, { ReactNode, createContext, useContext, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Session } from "next-auth"
import { useForm } from "react-hook-form"
import { Bookmark, CategoryNode } from "@/components/utils/constants"
import { createUserBookmark } from "@/components/utils/bookmarkAPI"
import { createUserCategory } from "@/components/utils/categoryAPI"

interface ContextProps {
  bookmark: Bookmark | undefined
  setCategory: (newCategory: CategoryNode) => void
  session: Session | null
  backendUrl: string | undefined
  isSubmitSuccessful: boolean
}

const BookmarkFormContext = createContext<ContextProps>({
  bookmark: undefined,
  setCategory: () => {},
  backendUrl: undefined,
  session: null,
  isSubmitSuccessful: false
})

export default function BookmarkForm({
  children,
  backendUrl,
  setCategory,
  bookmark
}: {
  children: ReactNode
  backendUrl: string | undefined
  setCategory: (newCategory: CategoryNode) => void
  bookmark: Bookmark
}) {
  const { handleSubmit, formState: { isSubmitSuccessful } } = useForm({ mode: "all" })
  const { data: session } = useSession()
  const router = useRouter()

  const onSubmit = async () => {
    var categoryId = bookmark.category.id

    if (session) {
       if (categoryId === 0){
        await createUserCategory(backendUrl, session as any, bookmark)
          .then((result: CategoryNode) => {
            categoryId = result.id
          })
          .catch(error => console.log('error', error));
      }

      await createUserBookmark(backendUrl, session as any, categoryId, bookmark)
        .catch(error => console.log('error', error))
    } else {
      router.push("/auth/login", { scroll: false })
    }
  }
  return (
    <BookmarkFormContext.Provider
      value={{
        bookmark,
        setCategory,
        backendUrl,
        session,
        isSubmitSuccessful
      }}
    >
      <form className="pt-12 pb-36 2xl:py-28" onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </BookmarkFormContext.Provider>
  )
}

export const useBookmarkFormContext = () => useContext(BookmarkFormContext)
