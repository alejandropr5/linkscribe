import React from "react"
import ClientImage from "@/components/utils/ClientImage"
import { StaticImageData } from "next/image"
import editNameSVG from "@public/edit-name.svg"
import moveFolderSVG from "@public/folder-arrow-right.svg"
import deleteSVG from "@public/trash.svg"
import addFolderSVG from "@public/folder-plus.svg"
import useCategoryUpdate from "@/hooks/useCategoryUpdate"


export function ButtonTooltip ({ children, label }: {
  children: React.ReactNode
  label: string
}) {
  return (
    <div className="group relative">
      { children }
      <div
        className="invisible group-hover:visible absolute flex justify-center
        -top-[22px] -inset-x-4"
      >
        <span className="text-[8pt] font-sans text-white bg-[#00152a] w-fit px-1 py-0.5 rounded-sm whitespace-nowrap">
          { label }
        </span>
      </div>
    </div>
  )
}


function CommandButton ({
  imageComponent, 
  description,
  label,
  onClick
} : {
  imageComponent: StaticImageData | string
  description: string
  label: string
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
  // return (
  //   <button
  //     type="button"
  //     onClick={onClick}
  //     className="flex flex-row h-9 flex-grow items-center justify-center rounded-full hover:bg-[#c1def1] group
  //     hover:absolute w-fit hover:w-[116px]"
  //   >
  //     <div className="w-9 h-9 hover p-2">
  //       <ClientImage imageComponent={imageComponent} description={description} />
  //     </div>
  //     <span
  //       className="hidden group-hover:inline-block overflow-hidden text-[#00152a] font-sans text-[12px] font-medium text-center"
  //     >
  //       { label }
  //     </span>
  //   </button>
  // )
}

export default function CommandBar({ hideButtons } : {hideButtons: boolean}) {
  const { setCommand } = useCategoryUpdate()


  return (
    <div className="flex flex-row items-center bg-[#e8f0fe] sm:rounded-t-xl rounded-bl-xl py-1 px-2 mt-auto h-11">
      <button
        type="button"
        onClick={() => setCommand("add")}
        className="flex flex-row h-9 flex-grow items-center justify-center rounded-full bg-[#00152a] space-x-1 group"
      >
        <div className="w-6 h-6 p-[1px]">
          <ClientImage imageComponent={addFolderSVG} description={"New folder icon"} />
        </div>
        <span className="text-white font-sans text-[12px] font-medium text-nowrap">
          Add Folder
        </span>
      </button>
      <div className={`overflow-hidden hover:overflow-visible transition-all ${hideButtons ? "w-0" : "w-[116px] ml-1" }`}>
        <div className="flex flex-row space-x-1">       
          <ButtonTooltip label="Rename">
            <CommandButton
              imageComponent={editNameSVG}
              description="Edit name icon"
              label="Rename"
              onClick={() => setCommand("rename")}
            />
          </ButtonTooltip>
          <ButtonTooltip label="Move">
            <CommandButton
              imageComponent={moveFolderSVG}
              description="Move folder icon"
              label="Move"
              onClick={() => setCommand("move")}
            />
          </ButtonTooltip>
          <ButtonTooltip label="Delete">
            <CommandButton
              imageComponent={deleteSVG}
              description="Delete icon"
              label="Delete"
              onClick={() => setCommand("delete")}
            />
          </ButtonTooltip>
        </div>
      </div>
    </div>
  )
}
