"use client"
import React, { useEffect, useRef, useState } from "react"
import useBookmarkData from "@/hooks/useBookmarkData"
import useCategoriesData from "@/hooks/useCategoriesData"
import { searchCategory } from "@/components/utils/functions"
import { FieldValues, UseFormRegister, useForm } from "react-hook-form"
import { updateUserBookmark } from "@/components/utils/bookmarkAPI"
import { useSession } from "next-auth/react"
import { CategoryNode } from "@/types/types"
import CategoryTree from "@/components/url-form/bookmark-card/CategoryTree"
import ClientImage from "@/components/utils/ClientImage"
import downArrow from "@public/down-arrow.svg"

function Modal ({ children, closeCB }: {
  children: React.ReactNode,
  closeCB: () => void
}) {
  return (
    <div
      className="fixed min-h-screen inset-0 z-50 flex items-center justify-center px-6 bg-black/50"
      // onClick={closeCB}
    >
      <div
        className="h-auto overflow-visible rounded-2xl bg-white shadow-2xl w-full max-w-md"
        // onClick={e => e.stopPropagation()}
      >
        { children }
      </div>
    </div>      
  )
}


function ModalHeader () {
  return (
    <div className="h-12 flex items-center px-6 pt-6">
      <div className="text-lg md:text-xl tracking-tight font-bold text-[#52525b] font-jakarta">
        Edit Bookmark
      </div>      
    </div> 
  )
}


function CancelButton ({ onClick }: {onClick: () => void}) {
  return (
    <button
      id="cancelButton"
      type="button"
      onClick={ onClick }
      className=" rounded-full font-medium  text-sm font-sans px-auto py-auto h-9 w-20 ml-auto
      border-[#00152a] border-2 text-[#00152a] bg-white hover:bg-slate-200"
    >
      Cancel
    </button>
  )
}


function SaveButton () {
  return (
    <button
      id="saveButton"
      type="submit"
      className="bg-[#00152a] rounded-full font-medium text-white text-sm font-sans px-auto py-auto h-9 w-20 ml-1"
    >
      Save
    </button>
  )
}


function EditInput (
  {
    label,
    name,
    type,
    defaultValue,
    register,
    autoFocus
  }: {
    label: string,
    name: string,
    type: string,
    defaultValue: string,
    autoFocus?: boolean
    register: UseFormRegister<FieldValues>
  }
) {  
  return (
    <div className="flex flex-col space-y-1">
      <label
        className="text-[#27272a] font-jakarta text-sm font-bold"
        htmlFor={name}
      >
        { label }
      </label>
      <input
        className="block rounded-t-lg px-2.5 py-2.5 w-full text-sm text-gray-900 bg-gray-50 font-sans
        border-0 border-b-2 border-gray-200 appearance-none
        focus:outline-none focus:ring-0 focus:border-[#c1def1]"
        id={name}
        type={type}
        placeholder={label}
        {...register(name, {
          value: defaultValue
        })}
        required
        autoFocus={autoFocus ?? false}
      />
    </div> 
  )
}


function CategorySelect ({
  categories,
  category,
  setCategory
} : {
  categories: CategoryNode,
  category: CategoryNode,
  setCategory: React.Dispatch<React.SetStateAction<CategoryNode>>
}) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const dropdown = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!dropdown.current?.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    window.addEventListener("mousedown", handleOutSideClick)

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick)
    }
  }, [dropdown])

  return (
    <div className="relative flex flex-col space-y-1">
      <label
        className="text-[#27272a] font-jakarta text-sm font-bold"
      >
        Category
      </label>
      <button
        onClick={() => setShowDropdown(true)}
        type="button"
        className="flex flex-row justify-between
        rounded-lg px-2.5 py-2.5 w-full text-sm text-gray-900 bg-gray-50 font-sans
        border-2 border-gray-200 appearance-none
        focus:outline-none focus:ring-0 focus:border-[#c1def1]"
      >
        <div className="flex items-center max-w-[252px] h-5 overflow-hidden text-ellipsis">
          { category?.name }
        </div>
        <div className="w-5 h-5 ml-2">
          <ClientImage imageComponent={downArrow} description={"Down Arrow SVG"} />
        </div>
      </button>
      {showDropdown &&
        <div
          className="absolute top-16 w-full"
          ref={dropdown}
        >
          <div
            className="w-full mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 space-y-1 text-sm" 
          >
            <div 
              className="max-h-40 overflow-y-auto px-1
              scrollbar-thin"
            >
              <CategoryTree
                categoryNode={categories as any}
                setCategory={setCategory}
                setShowDropdown={setShowDropdown}
                isFirst={true}
              />
            </div>
          </div>
        </div>      
      }
    </div>
  )
}


export default function BookmarkEditModal ({ backendUrl }: {backendUrl: string | undefined}) {
  const { bookmark, clearBookmark } = useBookmarkData()
  const { categories } = useCategoriesData()
  const [ category, setCategory ] = useState<CategoryNode | null>()
  const { register, reset, handleSubmit } = useForm()
  const { data: session } = useSession()

  useEffect(() => {
    if (bookmark) {
      document.body.style.overflow = "hidden"
      setCategory(searchCategory(categories as any, bookmark.category_id))
    } else {
      document.body.style.overflow = "unset"
    }
  }, [bookmark, categories])

  const closeModal = () => {
    reset()
    clearBookmark()
  }  

  if (!bookmark) {
    return null
  }
  else {
    const onSubmit = async (data: any) => {
      await updateUserBookmark(
        backendUrl,
        session?.user,
        bookmark.id,
        {
          name: data.nameInput,
          url: data.urlInput,
          category_id: category?.id as number
        }
      )

      closeModal()
    }

    return (
      <Modal closeCB={closeModal}>
        <ModalHeader />
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="p-6 font-sans space-y-6">
            <div className="space-y-4">
              <EditInput
                defaultValue={bookmark.name}
                label="Name"
                name="nameInput"
                type="text"
                register={register}
                autoFocus={true}
              />
              <EditInput
                defaultValue={bookmark.url}
                label="URL"
                name="urlInput"
                type="url"
                register={register}
              />
              <CategorySelect 
                categories={categories as CategoryNode}
                category={category as CategoryNode}
                setCategory={setCategory as any}
              />
            </div>
            <div className="flex items-center">
              <CancelButton onClick={closeModal} />
              <SaveButton />
            </div>
          </div>
        </form>
      </Modal>
    )
  }
}
