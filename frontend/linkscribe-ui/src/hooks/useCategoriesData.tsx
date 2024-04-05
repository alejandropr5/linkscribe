"use client"
import { CategoryNode } from '@/types/types'
import { useSyncExternalStore } from 'react'

let categoriesData: CategoryNode | undefined = undefined

let setCategories = (categories: CategoryNode) => {
  categoriesData = categories
  notifiers.forEach((notify: any) => notify())
}

let notifiers = new Set()

function subscribe (notify: any) {
  notifiers.add(notify)
  return () => notifiers.delete(notify)
}

export default function useBookmarkData() {
  let categories = useSyncExternalStore(subscribe, () => categoriesData, () => categoriesData)

  return { categories, setCategories }
}
