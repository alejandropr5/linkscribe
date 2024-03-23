import { APIConstants, Bookmark, CategoryNode } from "@/components/utils/constants";
import { Session } from "next-auth"

export const getUserCategories = async (
  backendUrl: string | undefined,
  session: Session | null
) : Promise<CategoryNode> => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    session?.user?.token_type + " " + session?.user?.access_token
  );
  
  const response = await fetch(backendUrl + APIConstants.READ_USER_CATEGORY_ROOT, {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  })
  
  return response.json()
}

export const createUserCategory = async (
  backendUrl: string | undefined,
  session: Session,
  bookmark: Bookmark
) : Promise<CategoryNode>  => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    session?.user?.token_type + " " + session?.user?.access_token
  )   
  
  var raw = JSON.stringify({
    "name": bookmark.category.name
  })
  
  const response = await fetch(backendUrl + APIConstants.CREATE_USER_CATEGORY, {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })
  
  return response.json()
}