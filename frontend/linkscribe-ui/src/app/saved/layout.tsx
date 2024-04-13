import type { Metadata } from "next"
import texts from "@messages/en.json"
import Header from "@/components/layout/Header"
import Provider from "@/components/auth/Provider"
import BookmarkEditModal from "@/components/saved-page/bookmarks/BookmarkEditRSC"
import CategoryForm from "@/components/saved-page/sidebar/CategoryForm"
import CommandModal from "@/components/saved-page/sidebar/CommandModal"

export const metadata: Metadata = {
  title: texts.Metadata.saved.title,
  description: texts.Metadata.description,
}

export default function RootLayout({
  children,
  sidebar,
  search
}: {
  children: React.ReactNode,
  sidebar: React.ReactNode,
  search: React.ReactNode
}) {
  const BACKEND_URL = process.env.BACKEND_URL
  return (
    <Provider>
      <CommandModal backendUrl={BACKEND_URL} />
      <Header withSignButton={true} />
      <div className="flex flex-row min-h-[calc(100vh-56px)] w-full bg-gradient-to-br from-white to-[#f3f8fc]">
        <CategoryForm backendUrl={BACKEND_URL} >
          <div
            className="fixed flex flex-col top-[56px] 
            w-[250px] 2xl:w-[300px] 3xl:w-[350px]
            border-r-[1px] border-r-[#eaecf0] h-[calc(100vh-56px)]"
          >
            { sidebar }
          </div>
          <div
            className="flex flex-col min-h-full h-fit z-0 items-center
            ml-[250px] 2xl:ml-[300px] 3xl:ml-[350px]
            px-6 lg:px-16 2xl:px-24  3xl:px-32
            flex-grow"
          >
            { search }
            { children }
          </div>
        </CategoryForm>
      </div>
      <BookmarkEditModal />
    </Provider>
  )
}
