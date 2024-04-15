"use client"
import { BookmarkResponse as Bookmark } from '@/types/types'
import { useSyncExternalStore } from 'react'

let bookmarkData: Bookmark | undefined = undefined
let updateData: number = 0

let setBookmark = (bookmark: Bookmark) => {
  bookmarkData = bookmark
  notifiers.forEach((notify: any) => notify())
}

let clearBookmark = () => {
  bookmarkData = undefined
  notifiers.forEach((notify: any) => notify())
}

let forceUpdate = () => {
  updateData = updateData + 1
  notifiers.forEach((notify: any) => notify())
}

let notifiers = new Set()

function subscribe (notify: any) {
  notifiers.add(notify)
  return () => notifiers.delete(notify)
}

export default function useBookmarkData() {
  let bookmark = useSyncExternalStore(subscribe, () => bookmarkData, () => bookmarkData)
  let update = useSyncExternalStore(subscribe, () => updateData, () => updateData)

  return { bookmark, setBookmark, clearBookmark, update, forceUpdate }
}
