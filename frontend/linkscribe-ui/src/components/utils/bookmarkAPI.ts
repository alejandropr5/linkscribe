import { Bookmark, CREATE_CATEGORY_BOOKMARK } from "@/components/utils/constants"
import { Session } from "next-auth"

export const createUserBookmark = async (
  backendUrl: string | undefined,
  session: Session,
  categoryId: number,
  bookmark: Bookmark
) : Promise<Bookmark>  => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append(
    "Authorization",
    session?.user?.token_type + " " + session?.user?.access_token
  )      
  
  var raw = JSON.stringify({
    "name": bookmark.title,
    "url": bookmark.url,
    "image": bookmark.url,
    "words": bookmark.words
  })
  
  const result = await fetch(backendUrl + CREATE_CATEGORY_BOOKMARK(categoryId), {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })

  return result.json()
}