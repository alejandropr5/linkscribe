"use client"
import { useRouter } from "next/navigation"

import ClientImage from "@/components/utils/client-image"
import quitSVG from "@public/quit.svg"

export default function ModalHeader () {
  const router = useRouter()
  return (
    <div className="h-14 flex items-center px-6">
      <button
        onClick={() => router.back()}
        type="button"
        className="cursor-pointer ml-auto text-[#52525b]">
        <ClientImage
          imageComponent={quitSVG}
          description={"Quit button SVG"}
        />
      </button>
    </div> 
  )
}