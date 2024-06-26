"use client"
import { ReadonlyURLSearchParams } from "next/navigation"
import queryString from "query-string"
import { CREATE_CATEGORY_BOOKMARK, APIConstants } from "@/lib/constants"
import { Bookmark, BookmarkPredicted, BookmarkResponse, BookmarkUpdate, CustomUser } from "@/types/types"


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
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
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
  searchParams: ReadonlyURLSearchParams | null,
  signal?: AbortSignal
) : Promise<BookmarkResponse[]>  => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append(
    "Authorization",
    user?.token_type + " " + user?.access_token
  )

  const params = queryString.pick(searchParams?.toString() ?? "", ["cat", "search"])

  const result = fetch(
    backendUrl + APIConstants.READ_USER_BOOKMARKS + `?${params}`,
    {
      method: "GET",
      headers: myHeaders,
      signal: signal
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
  .catch(error => {
    if (error instanceof DOMException) {
    } else {
        throw error
    }
  })

  return result
}


export const updateUserBookmark = (
  backendUrl: string | undefined,
  user: CustomUser | undefined,
  bookmarkId: number,
  bookmark: BookmarkUpdate
) : Promise<Bookmark>  => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append(
    "Authorization",
    user?.token_type + " " + user?.access_token
  )      
  
  var raw = JSON.stringify({
    "name": bookmark.name,
    "url": bookmark.url,
    "category_id": bookmark.category_id
  })
  
  const result = fetch(
    backendUrl + APIConstants.PATCH_USER_BOOKMARK + bookmarkId.toString(),
    {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
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

export const deleteUserBookmark = (
  backendUrl: string | undefined,
  user: CustomUser | undefined,
  bookmarkId: number,
) : Promise<Bookmark>  => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append(
    "Authorization",
    user?.token_type + " " + user?.access_token
  )      
  
  const result = fetch(
    backendUrl + APIConstants.DELETE_USER_BOOKMARK + bookmarkId.toString(),
    {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
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
