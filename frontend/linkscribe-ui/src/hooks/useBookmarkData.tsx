"use client"
import { BookmarkResponse as Bookmark } from '@/types/types'
import { useSyncExternalStore } from 'react'

let bookmarkData: Bookmark | undefined = undefined

let setBookmark = (bookmark: Bookmark) => {
  bookmarkData = bookmark
  notifiers.forEach((notify: any) => notify())
}

let clearBookmark = () => {
  bookmarkData = undefined
  notifiers.forEach((notify: any) => notify())
}

let notifiers = new Set()

function subscribe (notify: any) {
  notifiers.add(notify)
  return () => notifiers.delete(notify)
}

export default function useBookmarkData() {
  let bookmark = useSyncExternalStore(subscribe, () => bookmarkData, () => bookmarkData)

  return { bookmark, setBookmark, clearBookmark }
}
