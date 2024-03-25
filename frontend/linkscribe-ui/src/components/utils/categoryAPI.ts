"use client"
import { APIConstants, Bookmark, CategoryNode } from "@/components/utils/constants"
import { CustomUser } from "@/components/utils/constants"

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
  .then(response => response.json())
  
  return result
}

export const createUserCategory = async (
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
  
  const result = await fetch(backendUrl + APIConstants.CREATE_USER_CATEGORY, {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })
  .then(response => response.json())
  
  return result
}