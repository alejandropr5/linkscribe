import SearchSelect from "@/components/url-form/search-select"
import ClientImage from "@/components/utils/client-image"
import downArrow from "@public/down-arrow.svg"

export default function CategorySelect (data: {
  category: string
}) {
  return (
    <div className="flex flex-row items-center rounded-md bg-[#c1def193] text-[#52525b] font-medium w-fit h-fit text-xs pl-2">
      {data.category}
      <div className="w-5 h-5 mx-2">
        <ClientImage imageComponent={downArrow} description={"Down Arrow SVG"} />
      </div>
    </div>
  )
}