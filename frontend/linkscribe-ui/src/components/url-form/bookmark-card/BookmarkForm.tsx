"use client"
import React, { ReactNode, createContext, useContext } from "react"
import { FieldValues, UseFormRegister, useForm } from "react-hook-form"

interface ContextProps {
  register: UseFormRegister<FieldValues> | undefined
}

const BookmarkFormContext = createContext<ContextProps>({
  register: undefined
})

export default function BookmarkForm({ children }: {children: ReactNode}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful }
  } = useForm({ mode: "all" })

  return (
    <BookmarkFormContext.Provider value={{register}}>
      <form className="pt-12 pb-36 2xl:py-28">
        {children}
      </form>
    </BookmarkFormContext.Provider>
  )
}

export const useBookmarkFormContext = () => useContext(BookmarkFormContext)
