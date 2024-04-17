import defaultImage from "@public/default-img.png"

/**
* API constants object container
* @constant
*/
export const APIConstants = Object.freeze({
  PREDICT_PATH: "/bookmarks/predict",
  CREATE_USER: "/users/",
  LOGIN: "/users/login",
  GET_AVAILABILITY: "/users/available/",
  READ_USER_CATEGORY_ROOT: "/categories/root",
  CREATE_USER_CATEGORY: "/categories/",
  PATCH_USER_CATEGORY: "/categories/",
  DELETE_USER_CATEGORY: "/categories/",
  READ_USER_BOOKMARKS: "/bookmarks/",
  PATCH_USER_BOOKMARK: "/bookmarks/",
  DELETE_USER_BOOKMARK: "/bookmarks/"
})

export const pathNames = Object.freeze({
  login: "/auth/login/",
  signUp: "/auth/sign-up/"
})

export const CREATE_CATEGORY_BOOKMARK = (categoryId: number) => {
  return (`/categories/${categoryId}/bookmarks`)
}

/**
 * Default image to show when bookmark img is empty.
 * @constant
 */
export const DEFAULT_IMG = defaultImage
