import React from "react"

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
        className="relative flex flex-row items-center h-[38px] rounded-l-md rounded-r-full bg-[#f1f6ff] animate-pulse"
      />
      <div 
        className="relative ml-[14px] border-l-[1px] border-gray-100 pl-2 my-[2px]"
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
    children: [
      {
        id: 1,
        children: []
      },
      {
        id: 2,
        children: [
          {
            id: 21,
            children: []
          },
          {
            id: 22,
            children: []
          },
          {
            id: 23,
            children: []
          }
        ]
      },
      {
        id: 3,
        children: []
      },
      {
        id: 4,
        children: []
      },
      {
        id: 5,
        children: []
      },
      {
        id: 6,
        children: [
          {
            id: 61,
            children: []
          },
          {
            id: 62,
            children: []
          },
          {
            id: 63,
            children: []
          }
        ]
      },
      {
        id: 7,
        children: [
          {
            id: 71,
            children: []
          },
          {
            id: 72,
            children: []
          },
          {
            id: 73,
            children: []
          }
        ]
      }         
    ]
  }
  return (
    <div className="mr-1 overflow-y-auto">
      <CategoryTreeSkeleton
        CategorySkeletonNode={categories}
      />
    </div>
  )
}
