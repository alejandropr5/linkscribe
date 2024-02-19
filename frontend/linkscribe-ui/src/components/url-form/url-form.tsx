"use client"

import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import BookmarkCard from "@/components/url-form/bookmark-card"
import URLInput from "@/components/url-form/url-input"
import { APIConstants, DEFAULT_IMG } from "@/components/utils/constants"
import CategorySelect from "@/components/url-form/category-select"


export default function URLForm({ backendUrl }: { backendUrl: string | undefined }) {
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

  var imageURL = useRef<string>(DEFAULT_IMG.src)

  const onSubmit = async (data: any) => {
    imageURL.current = DEFAULT_IMG.src

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    await fetch(backendUrl + APIConstants.PREDICT_PATH, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        "url": data.urlInput
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
        <div className="py-8 md:py-10 xl:py-16 2xl:py-20 ">
          <BookmarkCard
            url={bookmark.url}
            category={bookmark.category}
            imgScr={bookmark.image}
            title={bookmark.title}
          />
          <CategorySelect
          
          />
        </div>
      }
    </div>
  )
}