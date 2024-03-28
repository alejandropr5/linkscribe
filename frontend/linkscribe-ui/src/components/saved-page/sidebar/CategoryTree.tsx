"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import queryString from "query-string"
import { CategoryNode } from "@/components/utils/constants"
import ClientImage from "@/components/utils/ClientImage"
import downArrow from "@public/down-arrow.svg"
import { useSideBarFormContext } from "@/components/saved-page/sidebar/SideBarFormContext"

interface CategoryProps {
  categoryNode: CategoryNode
  isFirst: boolean
  // isParentClicked?: boolean
  // setIsParentClicked?: React.Dispatch<React.SetStateAction<boolean>>
}

const CategoryTree: React.FC<CategoryProps> = ({
    categoryNode,
    isFirst,
    // isParentClicked,
    // setIsParentClicked
}: CategoryProps) => {
  const searchParams = useSearchParams()
  const params = queryString.parse(searchParams?.toString() ?? "")

  const [ showChildren, setShowChildren ] = useState<boolean>(isFirst)
  const [ isClicked, setIsClicked ] = useState<boolean>(
    params.cat?.includes(categoryNode.id.toString()) ?? isFirst
  )
  const { register, setValue } = useSideBarFormContext()

  // useEffect(() => {
  //   if (isParentClicked) {
  //     setIsClicked(false)
  //   }
  // }, [isParentClicked])

  useEffect(() => {
    setValue(categoryNode.id.toString(), isClicked)
  }, [isClicked])

  const handleCategoryClick = () => {
    // propagateClick(!isClicked)
    setIsClicked(!isClicked)
  }

  // const propagateClick = (newIsClicked: boolean) => {
  //   setIsClicked(newIsClicked)
    
  //   if (newIsClicked) {
  //     if (setIsParentClicked) {
  //       setIsParentClicked(false)
  //     }
  //   }
  // }

  const handleArrowClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setShowChildren(!showChildren)
  }

  return (
    <>
      <div
        onClick={handleCategoryClick}
        className={`relative flex flex-row items-center py-2 h-[38px] cursor-pointer rounded-l-md rounded-r-full overflow-hidden
        text-gray-700 active:bg-blue-100 ${ isClicked ? "bg-[#e8f0fe]" : "hover:bg-gray-100" }`}
      >
        {categoryNode.children?.length > 0 &&
          <div
            className="w-5 h-5 ml-[5px] hover:bg-gray-300 rounded-md"
            onClick={handleArrowClick}
          >
            <ClientImage imageComponent={downArrow} description={"Down Arrow SVG"} />
          </div>
        }
        <div className="absolute left-[30px] overflow-hidden text-ellipsis font-jakarta font-medium">
          { categoryNode.name }
        </div>
        <input
          className="hidden"
          type="checkbox"
          {...register(categoryNode.id.toString())}
        />
      </div>
      <div 
        className="relative ml-[14px] border-l-[1px] border-gray-300 pl-2 my-[2px]"
      >
        {showChildren && (categoryNode.children ?? []).map(
          (node: CategoryNode) =>
            <CategoryTree
              categoryNode={node}
              isFirst={true}
              // isParentClicked={isClicked}
              // setIsParentClicked={setIsClicked}
              key={node.id}
            />
        )}
      </div>
    </>
  )
}

export default CategoryTree
