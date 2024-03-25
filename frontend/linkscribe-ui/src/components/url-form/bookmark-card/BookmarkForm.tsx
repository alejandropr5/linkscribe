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
        const result = await createUserCategory(backendUrl, session.user as any, bookmark)

        categoryId = result.id
      }
      await createUserBookmark(backendUrl, session.user as any, categoryId, bookmark)
    } else {
      throw new Error("Not authenticated", {
        cause: session
      })
    }
  }

  const onError = (e: any) => {
    console.error(e)
    if (e.message === "Not authenticated") {
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
      <form
        className="pt-12 pb-36 2xl:py-28"
        onSubmit={(e: any) => handleSubmit(onSubmit)(e).catch(e => onError(e))}
      >
        {children}
      </form>
    </BookmarkFormContext.Provider>
  )
}

export const useBookmarkFormContext = () => useContext(BookmarkFormContext)
