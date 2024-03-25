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
  READ_USER_CATEGORY_ROOT: "/categories/root",
  CREATE_USER_CATEGORY: "/categories"
})

export const CREATE_CATEGORY_BOOKMARK = (categoryId: number) => {
  return (`/categories/${categoryId}/bookmarks`)
}

/**
 * Default image to show when bookmark img is empty.
 * @constant
 */
export const DEFAULT_IMG = defaultImage

export interface CategoryNode {
  id: number
  name: string
  father_id: number

  children: CategoryNode[]
}

export interface Bookmark {
  url: string
  title: string
  image: string
  words: string[]
  category: CategoryNode
}

export interface BookmarkPredicted {
  url: string
  name: string
  image: string
  words: string[]  
  category: string
}

export interface CustomUser {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  access_token?: string | null | undefined;
  token_type?: string | null | undefined;
}
