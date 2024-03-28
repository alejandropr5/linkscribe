"use client"
import React, { ReactNode, createContext, useContext, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { Session } from "next-auth"
import queryString from "query-string"
import { FieldValues, UseFormRegister, UseFormSetValue, useForm, useWatch } from "react-hook-form"
import { createUserCategory } from "@/components/utils/categoryAPI"
import { pathNames } from "@/components/utils/constants"

interface ContextProps {
  session: Session | null
  backendUrl: string | undefined
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  // isSubmitSuccessful: boolean
}

const SideBarFormContext = createContext<ContextProps>({
  backendUrl: undefined,
  session: null,
  register: null as any,
  setValue: null as any,
  // isSubmitSuccessful: false
})

export default function SideBarForm({
  children,
  backendUrl
}: {
  children: ReactNode
  backendUrl: string | undefined
}) {
  const {
    register,
    // handleSubmit,
    setValue,
    control
    // formState: { isSubmitSuccessful }
  } = useForm({ mode: "all" })

  const data = useWatch({ control: control })

  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {  
    const categories = Object.keys({ ...data })
    .reduce((acc: string[], key: string) => {
      if (data[key]) {
        acc.push(key)
      }
      return acc
    }, [])

    const stringfiedParams = queryString.stringify({"cat": categories})

    router.push(pathname + (stringfiedParams ? `?${stringfiedParams}` : ""))
    
  }, [data, pathname, router])

  const onError = (e: any) => {

  }

  return (
    <SideBarFormContext.Provider
      value={{
        backendUrl,
        session,
        register,
        setValue,
        // isSubmitSuccessful
      }}
    >
      <form
        // onSubmit={(e: any) => handleSubmit(onSubmit)(e).catch(e => onError(e))}
      >
        {children}
      </form>
    </SideBarFormContext.Provider>
  )
}

export const useSideBarFormContext = () => useContext(SideBarFormContext)
