import defaultImage from "@public/default-img.png"

/**
* API constants object container
* @constant
*/
export const APIConstants = Object.freeze({
  PREDICT_PATH: "/bookmarks/predict",
  CREATE_USER: "/users",
  LOGIN: "/users/login",
  GET_AVAILABILITY: "/users/available/",
  READ_USER_CATEGORY_ROOT: "/categories/root"
})

/**
 * Default image to show when bookmark img is empty.
 * @constant
 */
export const DEFAULT_IMG = defaultImage

export interface CategoryNode {
  id: number | undefined
  name: string | undefined
  father_id: number | undefined

  children: CategoryNode[]

  setCategory: (newCategory: string) => void
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}
