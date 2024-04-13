"use client"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import queryString from "query-string"
import { CancelButton, CategorySelect, EditInput, Modal, ModalHeader, SaveButton } from "@/components/saved-page/bookmarks/BookmarkEdit"
import useCategoriesData from "@/hooks/useCategoriesData"
import useCategoryUpdate from "@/hooks/useCategoryUpdate"
import { CategoryNode, CustomUser } from "@/types/types"
import { searchCategory } from "@/components/utils/functions"
import { createUserCategory, deleteUserCategory, patchUserCategory } from "@/components/utils/categoryAPI"
import { toast } from "react-toastify"


function AddCategory ({
  children,
  category,
  backendUrl,
  user
} : {
  children: React.ReactNode
  category: CategoryNode
  backendUrl: string | undefined
  user: CustomUser
}) {
  const { register, handleSubmit } = useForm()
  const { clearCommand, forceUpdate } = useCategoryUpdate()

  const onSubmit = async (data: any) => {
    await createUserCategory(backendUrl, user, data.nameInput, category.id.toString())
    await forceUpdate()
    await clearCommand()
  }

  return (
    <>
      <ModalHeader label={`Add Folder to \"${category.name}\"`} />
      <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="p-6 font-sans space-y-6">
            <div className="space-y-4">
              <EditInput
                defaultValue=""
                label="Name"
                name="nameInput"
                type="text"
                register={register}
                autoFocus={true}
              />
            </div>
            { children }
          </div>
        </form>
    </>
  )
}


function RenameCategory ({
  children,
  category,
  categories,
  backendUrl,
  user
} : {
  children: React.ReactNode
  category: CategoryNode
  categories: CategoryNode
  backendUrl: string | undefined
  user: CustomUser
}) {
  const { register, handleSubmit } = useForm()
  const { clearCommand, forceUpdate } = useCategoryUpdate()
  
  const onSubmit = async (data: any) => {
    await patchUserCategory(
      backendUrl,
      user,
      category.id.toString(),
      data.nameInput      
    )
    await forceUpdate()
    await clearCommand()
  }

  return (
    <>
      <ModalHeader label="Rename Folder" />
      <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="p-6 font-sans space-y-6">
            <div className="space-y-4">
              <EditInput
                defaultValue={category.name}
                label="Name"
                name="nameInput"
                type="text"
                register={register}
                autoFocus={true}
              />
            </div>
            { children }
          </div>
        </form>
    </>
  )
}


function MoveCategory ({
  children,
  category,
  categories,
  backendUrl,
  user,
} : {
  children: React.ReactNode
  category: CategoryNode
  categories: CategoryNode
  backendUrl: string | undefined
  user: CustomUser
}) {
  const [ fatherCategory, setFatherCategory ] = useState<CategoryNode>(
    searchCategory(categories as any, category.father_id) as CategoryNode
  )
  const { handleSubmit } = useForm()
  const { clearCommand, forceUpdate } = useCategoryUpdate()
  
  const onSubmit = async (data: any) => {
    await patchUserCategory(
      backendUrl,
      user,
      category.id.toString(),
      undefined,
      fatherCategory.id.toString()
    )
    await forceUpdate()
    await clearCommand()
  }

  return (
    <>
      <ModalHeader label={`Move \"${category.name}\"`}  />
      <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="p-6 font-sans space-y-6">
            <div className="space-y-4">
              <CategorySelect
                categories={categories as CategoryNode}
                category={fatherCategory}
                setCategory={setFatherCategory as any}
                label="Move To"
                hiddenCategory={category.id}
                showRoot={true}
              />
            </div>
            { children }
          </div>
        </form>
    </>
  )
}


function DeleteCategory ({
  children,
  category,
  backendUrl,
  user
} : {
  children: React.ReactNode
  category: CategoryNode
  backendUrl: string | undefined
  user: CustomUser
}) {
  const { handleSubmit } = useForm()
  const { clearCommand, forceUpdate } = useCategoryUpdate()

  const onSubmit = async (data: any) => {
    await deleteUserCategory(backendUrl, user, category.id.toString())
    toast.info(`\"${category.name}\" deleted`)
    await forceUpdate()
    await clearCommand()
  }

  return (
    <>
      <ModalHeader label="Delete Folder" />
      <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="p-6 font-sans space-y-6">
            <div className="space-y-4">
            <label
              className="text-[#27272a] font-jakarta text-sm font-semibold"
            >
              All bookmarks in this folder will be deleted, are you sure you want to delete &quot;<b>{category.name}</b>&quot;?
            </label>
            </div>
            { children }
          </div>
        </form>
    </>
  )
}


function ButtonGroup ({
  closeModal,
  submitLabel
} : {
  closeModal: () => void
  submitLabel?: string
}) {
  return (
    <div className="flex items-center">
      <CancelButton onClick={closeModal} />
      <SaveButton submitLabel={submitLabel} />

    </div>
  )
}


export default function CommandModal ({ backendUrl }: {backendUrl: string | undefined}) {
  const { data: session } = useSession()
  const { categories } = useCategoriesData()
  const searchParams = useSearchParams()
  const params = queryString.parse(searchParams?.toString() ?? "")
  const categoryId = typeof params.cat === "string" ? params.cat : categories?.id.toString() ?? ""
  const { command, clearCommand, forceUpdate } = useCategoryUpdate()
  const category = searchCategory(categories as any, Number(categoryId))

  useEffect(() => {
    if (command) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [command])

  if (!command) {
    return null
  }
  else if (command === "add") {
    return (
      <Modal>
        <AddCategory
          backendUrl={backendUrl}
          category={category as CategoryNode}
          user={session?.user as CustomUser}
        >
          <ButtonGroup closeModal={clearCommand} submitLabel="Add"/>
        </AddCategory>
      </Modal>
    )
  }
  else if (command === "rename") {
    return (
      <Modal>
        <RenameCategory
          backendUrl={backendUrl}
          categories={categories as CategoryNode}
          category={category as CategoryNode}
          user={session?.user as CustomUser}
        >
          <ButtonGroup closeModal={clearCommand}/>
        </RenameCategory>
      </Modal>
    )
  }
  else if (command === "move") {
    return (
      <Modal>
        <MoveCategory
          backendUrl={backendUrl}
          categories={categories as CategoryNode}
          category={category as CategoryNode}
          user={session?.user as CustomUser}
        >
          <ButtonGroup closeModal={clearCommand} submitLabel="Move" />
        </MoveCategory>
      </Modal>
    )
  }
  else if (command === "delete") {
    return (
      <Modal>
        <DeleteCategory
          backendUrl={backendUrl}
          category={category as CategoryNode}
          user={session?.user as CustomUser}
        >
          <ButtonGroup closeModal={clearCommand} submitLabel="Delete" />
        </DeleteCategory>
      </Modal>
    )
  }
}
