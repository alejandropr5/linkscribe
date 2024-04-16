import type { Metadata } from "next"
import texts from "@messages/en.json"
import Header from "@/components/layout/Header"
import Provider from "@/components/auth/Provider"
import BookmarkEditModal from "@/components/saved-page/bookmarks/BookmarkEditRSC"
import CategoryForm from "@/components/saved-page/sidebar/CategoryForm"
import CommandModal from "@/components/saved-page/sidebar/CommandModal"
import { ContentContainer, SidebarContainer } from "@/components/saved-page/PageContainer"
import { Suspense } from "react"

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
      <Suspense>
        <CommandModal backendUrl={BACKEND_URL} />
      </Suspense>
      <Header withSignButton={true} />
      <div className="flex flex-row min-h-[calc(100vh-56px)] w-full bg-gradient-to-br from-white to-[#f3f8fc]">
        <CategoryForm backendUrl={BACKEND_URL} >
          <SidebarContainer>
            { sidebar }
          </SidebarContainer>
          <ContentContainer>
            { search }
            { children }
          </ContentContainer>
        </CategoryForm>
      </div>
      <BookmarkEditModal />
    </Provider>
  )
}
