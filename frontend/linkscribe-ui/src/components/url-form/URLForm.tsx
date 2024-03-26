"use client"

import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import BookmarkCard from "@/components/url-form/bookmark-card/BookmarkCard"
import BookmarkForm from "@/components/url-form/bookmark-card/BookmarkForm"
import URLInput from "@/components/url-form/URLInput"
import { DEFAULT_IMG, Bookmark, CategoryNode } from "@/components/utils/constants"
import CategorySelect from "@/components/url-form/bookmark-card/CategorySelect"
import { predictBookmark } from "@/components//utils/bookmarkAPI"

export default function URLForm(data: {
  backendUrl: string | undefined
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful }
  } = useForm({ mode: "all" })

  const [bookmark, setBookmark] = useState<Bookmark>({
    url: "",
    title: "",
    image: "",
    words: [],
    category: {
      id: 0,
      name: "",
      father_id: 0,
      children: []
    }
  })

  const setCategory = (newCategory: CategoryNode) => {
    setBookmark(prevState => ({
      ...prevState,
      category: newCategory
  }))}

  var imageURL = useRef<string>(DEFAULT_IMG.src)

  const onSubmit = async  (formData: any) => {
    imageURL.current = DEFAULT_IMG.src

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const result = await predictBookmark(data.backendUrl, formData.urlInput)

    if (result.image !== "") {
      imageURL.current = result.image
    }
  
    setBookmark({
      url: result.url,
      title: result.name,
      image: imageURL.current,
      words: result.words,
      category: {
        id: 0,
        name: result.category,
        father_id: 0,
        children: []
      }
    })
  }

  const onError = (e: any) => {
    toast.error(e.message)
  }

  return (
    <div className="w-[580px] mx-auto">
      <form
        onSubmit={(e: any) => handleSubmit(onSubmit)(e).catch(e => onError(e))}
        className="md:relative h-14 fixed left-4 right-4 bottom-6 z-40 md:inset-0 rounded-full overflow-hidden shadow-lg shadow-[#c1def193]"
      >
        <URLInput
          id="urlInput"
          isSubmitting={isSubmitting}
          register={register}
        />
      </form>
      {isSubmitSuccessful && (!isSubmitting) &&
        <BookmarkForm
          backendUrl={data.backendUrl}
          setCategory={setCategory}
          bookmark={bookmark}
        >
          <BookmarkCard bookmark={bookmark} >
            <CategorySelect />
          </BookmarkCard>
        </BookmarkForm>
      }
    </div>
  )
}
