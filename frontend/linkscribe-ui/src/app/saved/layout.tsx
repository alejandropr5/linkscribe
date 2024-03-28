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
      <SideBarContainer>
        { sidebar }
      </SideBarContainer>
      <div
        className="flex flex-col min-h-full h-fit w-full justify-center px-6 z-0 items-center"
      >
        { children }
      </div>
    </div>
  )
}
