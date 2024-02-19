import SearchSelect from "@/components/url-form/search-select"

export default function CategorySelect () {
  return (
    <div
      className="flex flex-row h-12 items-center bg-white border border-gray-200 rounded-md shadow max-w-xl
      text-[#27272a] font-jakarta text-base tracking-tight">
      <button
        className="w-auto rounded-t-lg h-full md:w-64 md:rounded-none md:rounded-l-md bg-[#c1def193] hover:bg-gray-100 py-3
        font-bold"
      >
        Save Bookmark
      </button>
      <div className="flex flex-col justify-between grow">
        <SearchSelect/>
      </div>
    </div>
  )
}