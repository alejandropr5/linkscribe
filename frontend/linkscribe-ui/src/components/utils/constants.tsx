import defaultImage from "@public/default-img.png"

/**
* API constants object container
* @constant
*/
export const APIConstants = Object.freeze({
  PREDICT_PATH: "/bookmark/predict",
  CREATE_USER: "/users",
  LOGIN: "/users/login",
  GET_AVAILABILITY: "/users/available/"
})

/**
 * Default image to show when bookmark img is empty.
 * @constant
 */
export const DEFAULT_IMG = defaultImage
