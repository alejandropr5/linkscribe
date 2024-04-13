import React from "react"
import ClientImage from "@/components/utils/ClientImage"
import { StaticImageData } from "next/image"
import editNameSVG from "@public/edit-name.svg"
import moveFolderSVG from "@public/folder-arrow-right.svg"
import deleteSVG from "@public/trash.svg"
import addFolderSVG from "@public/folder-plus.svg"
import useCategoryUpdate from "@/hooks/useCategoryUpdate"

function CommandButton ({
  imageComponent, 
  description,
  onClick
} : {
  imageComponent: StaticImageData | string
  description: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-9 h-9 rounded-full p-2 hover:bg-[#c1def1d3]"
    >
      <ClientImage imageComponent={imageComponent} description={description} />
    </button>
  )
}

export default function CommandBar({ hideButtons } : {hideButtons: boolean}) {
  const { setCommand } = useCategoryUpdate()


  return (
    <div className="flex flex-row items-center bg-[#e8f0fe] rounded-t-xl p-1 mt-auto space-x-1 h-11">
      <button
        type="button"
        onClick={() => setCommand("add")}
        className="flex flex-row h-9 flex-grow items-center justify-center rounded-full bg-[#00152a] px-2 space-x-1 group"
      >
        <div className="w-6 h-6 hover p-[1px]">
          <ClientImage imageComponent={addFolderSVG} description={"New folder icon"} />
        </div>
        <span className="text-white font-sans text-[12px] font-medium">
          Add Folder
        </span>
      </button>
      <div className={`overflow-hidden transition-all ${hideButtons ? "w-0" : "w-[116px]" }`}>
        <div className="flex flex-row space-x-1">       
          <CommandButton
            imageComponent={editNameSVG}
            description={"Edit name icon"}
            onClick={() => setCommand("rename")}
          />
          <CommandButton
            imageComponent={moveFolderSVG}
            description={"Move folder icon"}
            onClick={() => setCommand("move")}
          />
          <CommandButton
            imageComponent={deleteSVG}
            description={"Delete icon"}
            onClick={() => setCommand("delete")}
          />
        </div>
      </div>
    </div>
  )
}
