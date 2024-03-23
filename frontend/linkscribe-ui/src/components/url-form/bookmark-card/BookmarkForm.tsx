"use client"
import React, { useState, useEffect, ReactNode, createContext, useContext } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Session } from "next-auth"
import { useForm } from "react-hook-form"
import { Bookmark, CategoryNode } from "@/components/utils/constants"
import { createUserBookmark } from "@/components/utils/bookmarkAPI"
import { createUserCategory, getUserCategories } from "@/components/utils/categoryAPI"

interface ContextProps {
  bookmark: Bookmark | undefined
  categories: CategoryNode | undefined
  setCategory: (newCategory: CategoryNode) => void
  session: Session | null
  isSubmitSuccessful: boolean
}

const BookmarkFormContext = createContext<ContextProps>({
  bookmark: undefined,
  categories: undefined,
  setCategory: () => {},
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
  const [categories, setCategories] = useState<CategoryNode>()
  const router = useRouter()

  useEffect(() => {
    getUserCategories(backendUrl, session)
      .then((result: CategoryNode) => {
        console.log(result)
        const categoryIndex = result.children.findIndex(
          child => child.name === bookmark.category?.name
        )

        if (categoryIndex === -1) {
          result.children.push({
            id: 0,
            name: bookmark.category?.name,
            father_id: result.id,
            children: []
          })
        } else {
          setCategory(result.children[categoryIndex])
        }

        setCategories(result)
      })
      .catch(error => console.log('error', error))
  }, [session?.user?.token_type, session?.user?.access_token])

  const onSubmit = async () => {
    if (session) {
      var categoryId = bookmark.category.id

      if (categoryId === 0){
        await createUserCategory(backendUrl, session, bookmark)
          .then((result: CategoryNode) => {
            console.log(result)
            categoryId = result.id
          })
          .catch(error => console.log('error', error));
      }

      await createUserBookmark(backendUrl, session, categoryId, bookmark)
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
    } else {
      router.push("/login", { scroll: false })
    }
  }
  return (
    <BookmarkFormContext.Provider
      value={{
        bookmark,
        categories,
        setCategory,
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
