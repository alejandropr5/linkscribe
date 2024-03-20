import React from "react"
import { CategoryNode } from "@/components/utils/constants"

// interface CategoryProps extends CategoryNode {
//   setCategory: (newCategory: string) => void
//   setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
// }

const CategoryTree: React.FC<CategoryNode> = (categoryProps: CategoryNode) => {
  const handleOnClick = () => {
    categoryProps.setCategory(categoryProps.name as string)
    categoryProps.setShowDropdown(false)
  }
  return (
    <div 
      className="max-h-36 overflow-y-auto px-1
      scrollbar-thin"
    >
      <div
        onClick={handleOnClick}
        className="block py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md overflow-hidden"
      >
        <div className="mx-4 overflow-hidden text-ellipsis">
          {categoryProps.name}
        </div>
      </div>
      {(categoryProps.children ?? []).map(
        (node: CategoryNode) => <CategoryTree {...node} key={node.id}/>
      )}
    </div>
  )
}

export default CategoryTree
