"use client"
import React, { ReactNode, createContext, useContext, useEffect } from "react"
import { FieldValues, UseFormRegister, UseFormSetValue, useForm, useWatch } from "react-hook-form"
import { useSession } from "next-auth/react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Session } from "next-auth"
import queryString from "query-string"


interface ContextProps {
  session: Session | null
  backendUrl: string | undefined
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

const SideBarFormContext = createContext<ContextProps>({
  backendUrl: undefined,
  session: null,
  register: null as any,
  setValue: null as any,
})

export default function SideBarForm({
  children,
  backendUrl
}: {
  children: ReactNode
  backendUrl: string | undefined
}) {
  const { register, setValue, control } = useForm({ mode: "all" })
  const data = useWatch({ control: control })

  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = queryString.parse(searchParams?.toString() ?? "")  

  useEffect(() => {  
    const categories = Object.keys({ ...data })
    .reduce((acc: string[], key: string) => {
      if (data[key]) {
        acc.push(key)
      }
      return acc
    }, [])

    params.cat = (categories.length > 0 ? categories : null)
    const stringfiedParams = queryString.stringify({"cat": categories})

    router.push(pathname + (stringfiedParams ? `?${stringfiedParams}` : ""))
    
  }, [data, params])

  return (
    <SideBarFormContext.Provider
      value={{
        backendUrl,
        session,
        register,
        setValue,
      }}
    >
      <form>
        {children}
      </form>
    </SideBarFormContext.Provider>
  )
}

export const useSideBarFormContext = () => useContext(SideBarFormContext)
