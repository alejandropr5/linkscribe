"use client"

// import Link from "next/link"
import { usePathname } from "next/navigation"
import ClientImage from "@/components/utils/ClientImage"
import OuterLink from "@public/outer-link.svg"

export default function NavBar () {
  const pathname = usePathname()
  const navLinks = [
    {name: "Create", href: ["/", "/with-modal"]},
    {name: "Saved", href: ["/saved"]}
  ]
  return (
    <div className="flex flex-row justify-center items-center space-x-5 font-medium font-sans md:text-base h-full">
      {navLinks.map((link) =>
        <a
          href={link.href[0]}
          key={link.name}
          className={`flex ${link.href.includes(pathname ?? "") ? "text-[#00152a]" : "text-[#60606b]"}`}
        >
          {link.name}
        </a>
      )}
      <a className="text-[#60606b] hidden sm:flex items-center" href="https://github.com/alejandropr5/linkscribe" target="_blank">
        Source Code
        <div className="w-5 h-5 ml-1">
          <ClientImage imageComponent={OuterLink} description={"Outer link svg"} />
        </div>
      </a>
    </div> 
  )
}
