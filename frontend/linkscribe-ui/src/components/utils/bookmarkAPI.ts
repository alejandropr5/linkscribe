"use client"
import { Bookmark, CREATE_CATEGORY_BOOKMARK, APIConstants, BookmarkPredicted, BookmarkResponse } from "@/components/utils/constants"
import { CustomUser } from "@/components/utils/constants"
import { ReadonlyURLSearchParams } from "next/navigation"

export const createUserBookmark = (
  backendUrl: string | undefined,
  user: CustomUser | undefined,
  categoryId: number,
  bookmark: Bookmark
) : Promise<Bookmark>  => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append(
    "Authorization",
    user?.token_type + " " + user?.access_token
  )      
  
  var raw = JSON.stringify({
    "name": bookmark.title,
    "url": bookmark.url,
    "image": bookmark.image,
    "words": bookmark.words
  })
  
  const result = fetch(backendUrl + CREATE_CATEGORY_BOOKMARK(categoryId), {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(error => {
        throw new Error(error.detail, {
          cause: res
        })
      })
    }

    return res.json()
  })

  return result
}


export const predictBookmark = (
  backendUrl: string | undefined,
  url: string
) : Promise<BookmarkPredicted>  => {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const result = fetch(backendUrl + APIConstants.PREDICT_PATH, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "url": url
    })
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(error => {
        throw new Error(error.detail, {
          cause: res
        })
      })
    }

    return res.json()
  })

  return result
}

export const readBookmarks = (
  backendUrl: string | undefined,
  user: CustomUser | undefined,
  searchParams: ReadonlyURLSearchParams | null
) : Promise<BookmarkResponse[]>  => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append(
    "Authorization",
    user?.token_type + " " + user?.access_token
  )  

  const result = fetch(
    backendUrl + APIConstants.READ_USER_BOOKMARKS + `?${searchParams}`,
    {
      method: "GET",
      headers: myHeaders
    }
  )
  .then(res => {
    if (!res.ok) {
      return res.json().then(error => {
        throw new Error(error.detail, {
          cause: res
        })
      })
    }

    return res.json()
  })

  return result
}
