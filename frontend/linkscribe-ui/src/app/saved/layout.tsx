import type { Metadata } from "next";
import texts from "@messages/en.json"
import SideBarContainer from "@/components/saved-page/sidebar/SideBarContainer";

export const metadata: Metadata = {
  title: texts.Metadata.saved.title,
  description: texts.Metadata.description,
};

export default function RootLayout({
  children,
  sidebar
}: {
  children: React.ReactNode,
  sidebar: React.ReactNode;
}) {
  return (
    <div className="w-full text-black flex flex-row">
      <div
        className="sticky top-[56px] flex flex-col
        w-[350px] 2xl:w-[370px] 3xl:w-[400px]
        border-r-[1px] border-r-[#eaecf0] h-[calc(100vh-56px)] overflow-y-auto"
      >
        { sidebar }
      </div>
      <div
        className="flex flex-col min-h-full h-fit w-full px-6 z-0 items-center"
      >
        { children }
      </div>
    </div>
  )
}
