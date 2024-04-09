"use client"
import { APIConstants } from "@/lib/constants"
import { Bookmark, CategoryNode, CustomUser } from "@/types/types"


export const getUserCategories = (
  backendUrl: string | undefined,
  user: CustomUser | undefined
) : Promise<CategoryNode> => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    user?.token_type + " " + user?.access_token
  );
  
  const result = fetch(backendUrl + APIConstants.READ_USER_CATEGORY_ROOT, {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(error => {
        throw new Error(error.detail, {
          cause: res
        })
      })
    }

    return res.json()
  })
  
  return result
}

export const createUserCategory = (
  backendUrl: string | undefined,
  user: CustomUser | undefined,
  bookmark: Bookmark
) : Promise<CategoryNode>  => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    user?.token_type + " " + user?.access_token
  )   
  
  var raw = JSON.stringify({
    "name": bookmark.category.name
  })
  
  const result = fetch(backendUrl + APIConstants.CREATE_USER_CATEGORY, {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(error => {
        throw new Error(error.detail, {
          cause: res
        })
      })
    }

    return res.json()
  })
  
  return result
}