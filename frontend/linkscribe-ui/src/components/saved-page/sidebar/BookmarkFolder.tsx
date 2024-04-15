"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import queryString from "query-string"
import { useCategoryFormContext } from "@/components/saved-page/sidebar/CategoryForm"
import { CategoryNode } from "@/types/types"
import BookmarkFolderSkeleton from "@/components/saved-page/sidebar/BookmarkFolderSkeleton"
import ClientImage from "@/components/utils/ClientImage"
import downArrow from "@public/down-arrow.svg"
import { searchCategory } from "@/components/utils/functions"
import CommandBar from "@/components/saved-page/sidebar/CommandBar"


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
        className={`relative flex flex-row items-center py-2 h-[38px] cursor-pointer rounded-l-md rounded-r-full overflow-hidden w-full
        text-gray-700 active:bg-blue-100
        ${ categorySelected === categoryNode.id.toString() ? "bg-[#e8f0fe]" : "hover:bg-gray-100" }`}
      >
        {hasChildren &&
          <div
            className="w-5 h-5 ml-[5px] hover:bg-gray-300 rounded-md"
            onClick={handleArrowClick}
          >
            <ClientImage imageComponent={downArrow} description={"Down Arrow SVG"} />
          </div>
        }
        <p
          className={`pr-2 overflow-hidden text-ellipsis font-jakarta font-medium text-nowrap text-sm 2xl:text-base
          ${hasChildren ? "pl-1" : "pl-[30px]" }`}
        >
          { categoryNode.name }
        </p>
      </div>
      <div 
        className="ml-[14px] border-l-[1px] border-gray-300 pl-2 my-[2px]"
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

  const { categories } = useCategoryFormContext()
  const [ categorySelected, setCategorySelected ] = useState<string>("")

  const { register, setValue } = useCategoryFormContext()

  useEffect(() => {
    setValue(
      "cat",
      categorySelected !== categories?.id.toString() ? categorySelected : ""
    )
  }, [categorySelected])

  useEffect(() => {
    setCategorySelected(
      typeof params.cat === "string" ? (
        params.cat
      ) : (
        categories?.id.toString() ?? ""
      )
    )
  }, [categories])

  return (
    <>
      <div className="relative mr-1 overflow-y-auto h-grow mb-1 scrollbar-thin">
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
