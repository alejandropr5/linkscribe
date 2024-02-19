import ClientImage from "@/components/utils/client-image"
import downArrow from "@public/down-arrow.svg"

export default function SearchSelect () {
  return (
    <div className="relative group">
      <button
        id="dropdown-button"
        className="flex items-center justify-between w-full rounded-r-md h-full py-3 cursor-default border-l-[1.5px]"
        // focus:outline-none focus:border-[#c1def1] focus:border-2"
      >
        <span className="flex justify-center grow font-medium text-[#52525b]">
          Open Dropdown
          </span>
        <div className="w-6 h-6 mr-1 cursor-pointer">
          <ClientImage imageComponent={downArrow} description={"Down Arrow SVG"} />
        </div>
      </button>
      {/* <div id="dropdown-menu" className="hidden absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
        <input id="search-input" className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Search items" autoComplete="off"/>
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Uppercase</a>
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Lowercase</a>
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Camel Case</a>
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Kebab Case</a>
      </div> */}
    </div>
  )
}