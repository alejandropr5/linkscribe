"use client"
import React, { ReactNode, createContext, useContext, useEffect } from "react"
import { Control, FieldValues, UseFormRegister, UseFormSetValue, useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { Session } from "next-auth"
import { getUserCategories } from "@/components/utils/categoryAPI"
import { CategoryNode } from "@/types/types"
import useCategoriesData from "@/hooks/useCategoriesData"
import useCategoryUpdate from "@/hooks/useCategoryUpdate"


interface ContextProps {
  session: Session | null
  backendUrl: string | undefined
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  categories: CategoryNode | undefined
  control: Control<FieldValues, any, FieldValues>
}

const CategoryFormContext = createContext<ContextProps>({
  backendUrl: undefined,
  session: null,
  register: null as any,
  setValue: null as any,
  categories: null as any,
  control: null as any
})

export default function CategoryForm({
  children,
  backendUrl
}: {
  children: ReactNode
  backendUrl: string | undefined
}) {
  const { categories, setCategories } = useCategoriesData()
  const { register, setValue, control } = useForm({ mode: "all" })
  const { update } = useCategoryUpdate()

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      getUserCategories(backendUrl, session.user as any)
      .then((result: CategoryNode) => {
        setCategories(result)
      })
    }
  }, [backendUrl, session, setCategories, update])  

  return (
    <CategoryFormContext.Provider
      value={{
        backendUrl,
        session,
        register,
        setValue,
        categories,
        control
      }}
    >
      <form className="w-full flex flex-row">
        {children}
      </form>
    </CategoryFormContext.Provider>
  )
}

export const useCategoryFormContext = () => useContext(CategoryFormContext)
