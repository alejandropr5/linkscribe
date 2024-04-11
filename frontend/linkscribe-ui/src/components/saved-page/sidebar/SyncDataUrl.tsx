"use client"
import React, { useEffect } from "react"
import queryString from "query-string"
import { useRouter, usePathname } from "next/navigation"
import { useWatch } from "react-hook-form"
import { useCategoryFormContext } from "@/components/saved-page/sidebar/CategoryForm"

const SyncDataUrl = () => {
  const { control } = useCategoryFormContext()
  const data = useWatch({ control: control })
  const router = useRouter()
  const pathname = usePathname()
  
  useEffect(() => {  
    // const categories = Object.keys({ ...data })
    // .reduce((acc: string[], key: string) => {
    //   if (data[key] && key !== "search") {
    //     acc.push(key)
    //   }
    //   return acc
    // }, [])

    const stringfiedParams = queryString.stringify({
      "cat": (data["cat"] ? data["cat"] : null),
      "search": (data["search"]?.length > 0 ? data["search"] : null)
    }, { skipNull: true })

    router.push(pathname + (stringfiedParams ? `?${stringfiedParams}` : ""))
    
  }, [data])
  
  return null
}

export default SyncDataUrl
