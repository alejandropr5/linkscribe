"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import queryString from "query-string"
import { useCategoryFormContext } from "@/components/saved-page/sidebar/CategoryForm"
import { CategoryNode } from "@/types/types"
import BookmarkFolderSkeleton from "@/components/saved-page/sidebar/BookmarkFolderSkeleton"
import ClientImage from "@/components/utils/ClientImage"
import downArrow from "@public/down-arrow.svg"
import rightArrow from "@public/right-arrow-svgrepo-com.svg"
import folderSVG from "@public/folder.svg"
import { searchCategory } from "@/components/utils/functions"
import CommandBar from "@/components/saved-page/sidebar/CommandBar"
import useCategoriesData from "@/hooks/useCategoriesData"


interface CategoryProps {
  categoryNode: CategoryNode
  categorySelected: string
  setCategorySelected: React.Dispatch<React.SetStateAction<string>>
  isFirst: boolean
}


const CategoryTree: React.FC<CategoryProps> = ({
  categoryNode,
  categorySelected,
  setCategorySelected,
  isFirst
}: CategoryProps) => {
  const [ showChildren, setShowChildren ] = useState<boolean>(isFirst)

  const handleCategoryClick = () => {
    setCategorySelected(categoryNode.id.toString())
  }

  const handleArrowClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    if (searchCategory(categoryNode, Number(categorySelected))) {
      setCategorySelected(categoryNode.id.toString())
    }
    setShowChildren(!showChildren)
  }

  const hasChildren: boolean = categoryNode.children?.length > 0

  return (
    <>
      <div
        onClick={handleCategoryClick}
        className={`relative flex flex-row items-center py-2 h-[38px] w-full
        text-gray-700 active:bg-blue-100 rounded-l-full cursor-pointer
        ${ categorySelected === categoryNode.id.toString() ? "bg-[#e8f0fe]" : "hover:bg-gray-100" }`}
      >
        {hasChildren &&
          <div
            className={`w-6 h-6 p-[2px] ml-[5px] hover:bg-gray-300 rounded-full`}
            onClick={handleArrowClick}
          >
            <ClientImage
              imageComponent={ showChildren ? downArrow : rightArrow }
              description={"Arrow SVG"}
            />
          </div>
        }
        <div
          className={`flex flex-row w-full
          ${hasChildren ? "pl-1" : "pl-[28px]" }`}
        >
          <div className="min-w-5 max-w-5 h-5 mr-1">
            <ClientImage
              imageComponent={folderSVG}
              description={"Arrow SVG"}
            />
          </div>
          <p className="font-jakarta font-medium text-nowrap text-sm pr-2 overflow-hidden text-ellipsis">
            { categoryNode.name }
          </p>
        </div>
      </div>
      <div 
        className="ml-[14px] border-l-[1px] border-gray-300 pl-2 my-[1px]"
      >
        {showChildren && (categoryNode.children ?? []).map(
          (node: CategoryNode) =>
            <CategoryTree
              categoryNode={node}
              categorySelected={categorySelected}
              setCategorySelected={setCategorySelected}
              isFirst={false}   
              key={node.id}
            />
        )}
      </div>
    </>
  )
}


export default function BookmarkFolder() {
  const searchParams = useSearchParams()
  const params = queryString.parse(searchParams?.toString() ?? "")

  const { categories } = useCategoriesData()
  const [ categorySelected, setCategorySelected ] = useState<string>("")

  const { register, setValue } = useCategoryFormContext()

  useEffect(() => {
    setValue(
      "cat",
      categorySelected
    )
  }, [categorySelected, setValue])

  useEffect(() => {
    setCategorySelected(
      typeof params.cat === "string" ? (
        params.cat
      ) : (
        categories?.id.toString() ?? ""
      )
    )
  }, [categories, params.cat])

  return (
    <>
      <div className="relative ml-1 overflow-y-auto h-grow mb-1 scrollbar-thin">
        {categories ? (
          <CategoryTree
            categoryNode={categories as any}
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
            isFirst={true}
          />
        ) : (
          <BookmarkFolderSkeleton />
        )}
        <input
          id="cat"
          className="hidden"
          type="input"
          {...register("cat")}
        />
      </div>
      {categorySelected && categories &&
        <CommandBar hideButtons={categorySelected === categories?.id.toString()} />
      }
    </>
  )
}
