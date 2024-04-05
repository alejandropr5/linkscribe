"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import queryString from "query-string"
import { useCategoryFormContext } from "@/components/saved-page/sidebar/CategoryForm"
import { CategoryNode } from "@/types/types"
import BookmarkFolderSkeleton from "@/components/saved-page/sidebar/BookmarkFolderSkeleton"
import ClientImage from "@/components/utils/ClientImage"
import downArrow from "@public/down-arrow.svg"


interface CategoryProps {
  categoryNode: CategoryNode
}


const CategoryTree: React.FC<CategoryProps> = ({
    categoryNode
}: CategoryProps) => {
  const searchParams = useSearchParams()
  const params = queryString.parse(searchParams?.toString() ?? "")

  const [ showChildren, setShowChildren ] = useState<boolean>(true)
  const [ isClicked, setIsClicked ] = useState<boolean>(
    params.cat?.includes(categoryNode.id.toString()) ?? false
  )
  const { register, setValue } = useCategoryFormContext()

  useEffect(() => {
    setValue(categoryNode.id.toString(), isClicked)
  }, [isClicked])

  const handleCategoryClick = () => {
    setIsClicked(!isClicked)
  }

  const handleArrowClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setShowChildren(!showChildren)
  }

  const hasChildren: boolean = categoryNode.children?.length > 0

  return (
    <>
      <div
        onClick={handleCategoryClick}
        className={`relative flex flex-row items-center py-2 h-[38px] cursor-pointer rounded-l-md rounded-r-full overflow-hidden w-full
        text-gray-700 active:bg-blue-100 ${ isClicked ? "bg-[#e8f0fe]" : "hover:bg-gray-100" }`}
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
          className={`pr-2 overflow-hidden text-ellipsis font-jakarta font-medium text-nowrap
          ${hasChildren ? "pl-1" : "pl-[30px]" }`}
        >
          { categoryNode.name }
        </p>
        <input
          id={categoryNode.id.toString()}
          className="hidden"
          type="checkbox"
          {...register(categoryNode.id.toString())}
        />
      </div>
      <div 
        className="ml-[14px] border-l-[1px] border-gray-300 pl-2 my-[2px]"
      >
        {showChildren && (categoryNode.children ?? []).map(
          (node: CategoryNode) =>
            <CategoryTree
              categoryNode={node}
              key={node.id}
            />
        )}
      </div>
    </>
  )
}


export default function BookmarkFolder() {
  const { categories } = useCategoryFormContext()

  return (
    <div className="relative mr-1 overflow-y-auto">
      {categories ? (
        <CategoryTree
          categoryNode={categories as any}
        />
      ) : (
        <BookmarkFolderSkeleton />
      )}
    </div>
  )
}
