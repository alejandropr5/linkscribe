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

export interface BookmarkResponse {
  id: number
  name: string
  url: string
  image: string
  user_id: number
  category_id: number
  created_at: Date
}

export interface BookmarkUpdate {
  name: string
  url: string
  category_id: number
}
