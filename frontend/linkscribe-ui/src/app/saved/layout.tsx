import type { Metadata } from "next"
import texts from "@messages/en.json"
import CategoryForm from "@/components/saved-page/sidebar/CategoryForm"

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
    <div className="w-full flex flex-row">
      <CategoryForm backendUrl={BACKEND_URL}>
        <div
          className="sticky top-[56px] flex flex-col
          w-[350px] 2xl:w-[370px] 3xl:w-[400px]
          border-r-[1px] border-r-[#eaecf0] h-[calc(100vh-56px)] overflow-y-auto"
        >
          { sidebar }
        </div>
        <div
          className="flex flex-col min-h-full h-fit w-full px-36 2xl:px-40 z-0 items-center"
        >
          { search }
          { children }
        </div>
      </CategoryForm>
    </div>
  )
}
