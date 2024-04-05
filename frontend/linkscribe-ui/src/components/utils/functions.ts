import { CategoryNode } from "@/types/types"

export const searchCategory = (
  category: CategoryNode,
  categoryId: number
) : CategoryNode | null => {
  if(category.id == categoryId){
       return category
  }else if (category.children != null){
       var result = null
       for(var i = 0; (result == null) && (i < category.children.length); i++){
            result = searchCategory(category.children[i], categoryId)
       }
       return result
  }
  return null
}