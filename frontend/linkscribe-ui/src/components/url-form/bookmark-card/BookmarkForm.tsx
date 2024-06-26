"use client"
import React, { ReactNode, createContext, useContext } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Session } from "next-auth"
import { useForm } from "react-hook-form"
import { Bookmark, CategoryNode } from "@/types/types"
import { createUserBookmark } from "@/components/utils/bookmarkAPI"
import { createUserCategory } from "@/components/utils/categoryAPI"
import { pathNames } from "@/lib/constants"

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
        const result = await createUserCategory(backendUrl, session.user as any, bookmark.category.name)

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
      router.push(pathNames.login, { scroll: false })
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
        className="py-12 2xl:py-14"
        onSubmit={(e: any) => handleSubmit(onSubmit)(e).catch(e => onError(e))}
      >
        {children}
      </form>
    </BookmarkFormContext.Provider>
  )
}

export const useBookmarkFormContext = () => useContext(BookmarkFormContext)
