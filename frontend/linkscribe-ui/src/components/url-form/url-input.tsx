import { FieldValues, UseFormRegister } from "react-hook-form"
import ClientImage from "@/components/utils/client-image"
import linkSVG from "@public/link.svg"
import searchSVG from "@public/search.svg"
import IndetProgressBar from "@/components/url-form/indeterminate-progress-bar"

export default function URLInput (data: {
    register: UseFormRegister<FieldValues>
    id: string
    isSubmitting: boolean
}) {
  return (
    <>
      <input
        id={data.id}
        {...data.register(data.id)}
        type="url"
        required
        placeholder="URL"
        autoComplete="url"
        className="px-14 w-full font-normal placeholder-shown:font-medium h-full rounded-full bg-transparent text-[#27272a] font-sans
        focus:outline-none focus:border-[#c1def1] border-[1.5px] focus:border-2" />
      <div className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 left-5">
        <ClientImage imageComponent={linkSVG} description={"Link SVG"} />
      </div>
      <button
        type="submit"
        className="absolute top-1/2 transform -translate-y-1/2 w-9 h-9 right-4 rounded-full p-2
        hover:bg-[#c1def193]"
      >
        <ClientImage imageComponent={searchSVG} description={"Search SVG"} />
      </button>
      {data.isSubmitting &&
        <IndetProgressBar />
      }
    </>
  )
}