"use client"
import React, { useState, useEffect, ReactNode, createContext, useContext } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Session } from "next-auth"
import { FieldValues, UseFormRegister, useForm } from "react-hook-form"
import { APIConstants, Bookmark, CREATE_CATEGORY_BOOKMARK, CategoryNode } from "@/components/utils/constants"

interface ContextProps {
  register: UseFormRegister<FieldValues> | undefined
  bookmark: Bookmark | undefined
  categories: CategoryNode | undefined
  setCategory: (newCategory: CategoryNode) => void
  session: Session | null
}

const BookmarkFormContext = createContext<ContextProps>({
  register: undefined,
  bookmark: undefined,
  categories: undefined,
  setCategory: () => {},
  session: null
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
  const { data: session } = useSession()
  const [categories, setCategories] = useState<CategoryNode>()
  const router = useRouter()

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      session?.user?.token_type + " " + session?.user?.access_token
    );
    
    fetch(backendUrl + APIConstants.READ_USER_CATEGORY_ROOT, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })
      .then(response => response.json())
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
      .catch(error => console.log('error', error));
  }, [session?.user?.token_type, session?.user?.access_token])

  const onSubmit = () => {
    if (session) {
      var categoryId = bookmark.category.id

      if (categoryId === 0){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Authorization",
          session?.user?.token_type + " " + session?.user?.access_token
        )   
        
        var raw = JSON.stringify({
          "name": bookmark.category.name
        })
        
        fetch("http://0.0.0.0:8000/categories", {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        })
          .then(response => response.json())
          .then(result => {
            console.log(result)
            categoryId = result.id
          })
          .catch(error => console.log('error', error));
      }

      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")
      myHeaders.append(
        "Authorization",
        session?.user?.token_type + " " + session?.user?.access_token
      )      
      
      var raw = JSON.stringify({
        "name": bookmark.title,
        "url": bookmark.url,
        "image": bookmark.url,
        "words": bookmark.words
      })
      
      fetch(backendUrl + CREATE_CATEGORY_BOOKMARK(categoryId), {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
    } else {
      router.push("/login", { scroll: false })
    }
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful }
  } = useForm({ mode: "all" })

  return (
    <BookmarkFormContext.Provider
      value={{
        register,
        bookmark,
        categories,
        setCategory,
        session
      }}
    >
      <form className="pt-12 pb-36 2xl:py-28" onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </BookmarkFormContext.Provider>
  )
}

export const useBookmarkFormContext = () => useContext(BookmarkFormContext)
