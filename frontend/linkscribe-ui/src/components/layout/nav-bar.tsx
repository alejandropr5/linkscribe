"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import ClientImage from "@/components/utils/client-image"
import OuterLink from "@public/outer-link.svg"

export default function NavBar () {
  const pathname = usePathname()
  const navLinks = [
    {name: "Create", href: "/"},
    {name: "Saved", href: "/saved"}
  ]
  return (
    <div className="flex items-center space-x-3 text-[#60606b] font-medium font-sans">
      {navLinks.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            href={link.href}
            key={link.name}
            className={`flex p-1
            ${isActive ? "text-[#00152a]" : "text-[#60606b]"}`}
          >
            {link.name}
          </Link>
        )
      })}
      <a className="text-[#60606b] hidden sm:flex p-1" href="https://github.com/alejandropr5/linkscribe" target="_blank">
        Source Code
        <div className="w-5 h-5 ml-1">
          <ClientImage imageComponent={OuterLink} description={"Outer link svg"} />
        </div>
      </a>
    </div> 
  )
}