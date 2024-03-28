import React from "react"
import ClientImage from "@/components/utils/ClientImage"
import downArrow from "@public/down-arrow.svg"


interface CategorySkeletonNode {
  id: number
  children: CategorySkeletonNode[]
}

interface CategoryTreeSkeletonProps {
  CategorySkeletonNode: CategorySkeletonNode
}

const CategoryTreeSkeleton: React.FC<CategoryTreeSkeletonProps> = ({
  CategorySkeletonNode
}: CategoryTreeSkeletonProps) => {
  return (
    <>
      <div
        className="relative flex flex-row items-center h-[38px] rounded-l-md rounded-r-full bg-[#ecf3ff] animate-pulse"
      >
        {CategorySkeletonNode.children?.length > 0 &&
          <div
            className="w-5 h-5 ml-[5px] hover:bg-gray-300 rounded-md"
          >
            <ClientImage imageComponent={downArrow} description={"Down Arrow SVG"} />
          </div>
        }
      </div>
      <div 
        className="relative ml-[14px] border-l-[1px] border-gray-300 pl-2 my-[2px]"
      >
        {(CategorySkeletonNode.children ?? []).map(
          (node: CategorySkeletonNode) =>
            <CategoryTreeSkeleton
              CategorySkeletonNode={node}
              key={node.id}
            />
        )}
      </div>
    </>
  )
}

export default function BookmarkFolderSkeleton() {
  const categories: CategorySkeletonNode = {
    id: 0,
    children: []
  }
  return (
    <>
      <CategoryTreeSkeleton
        CategorySkeletonNode={categories}
      />
    </>
  )
}
