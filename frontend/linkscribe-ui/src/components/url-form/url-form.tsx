"use client"

import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import BookmarkCard from "@/components/url-form/bookmark-card"
import URLInput from "@/components/url-form/url-input"
import { APIConstants, DEFAULT_IMG } from "@/components/utils/constants"
import CategorySelect from "@/components/url-form/category-select"

export default function URLForm(data: {
  backendUrl: string | undefined
  searchPlaceholder: string
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful }
  } = useForm({ mode: "all" })
  const bookmarkWords = useRef<string[]>()
  const [bookmark, setBookmark] = useState({
    url: "",
    title: "",
    category: "",
    image: ""
  })

  const setCategory = (newCategory: string) => {
    setBookmark(prevState => ({
      ...prevState,
      category: newCategory
  }))}

  var imageURL = useRef<string>(DEFAULT_IMG.src)

  const onSubmit = async (formData: any) => {
    imageURL.current = DEFAULT_IMG.src

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    await fetch(data.backendUrl + APIConstants.PREDICT_PATH, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        "url": formData.urlInput
      })
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.image !== "") {
          imageURL.current = result.image
        }

        setBookmark({
          url: result.url,
          title: result.name,
          image: imageURL.current,
          category: result.category
        })
        bookmarkWords.current = result.words
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  return (
    <div className="w-[580px] mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:relative h-14 fixed left-4 right-4 bottom-6 z-40 md:inset-0 rounded-full overflow-hidden shadow-lg shadow-[#c1def193]"
      >
        <URLInput
          id="urlInput"
          isSubmitting={isSubmitting}
          register={register}
        />
      </form>
      {isSubmitSuccessful &&
        <div className="pt-12 pb-36 2xl:py-28">
          <BookmarkCard
            url={bookmark.url}
            imgScr={bookmark.image}
            title={bookmark.title}
          >
            <CategorySelect
              category={bookmark.category}
              setCategory={setCategory}
              searchPlaceholder={data.searchPlaceholder}
            />
          </BookmarkCard>
        </div>
      }
    </div>
  )
}