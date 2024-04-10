"use client"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { pathNames } from "@/lib/constants"

export default function SwitchLink (data: {
  paragraph: string
  linkText: string
  hardNavigation?: boolean
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = searchParams?.toString()

  return (
    <div className="flex justify-center mt-4 space-x-1">
      <span className="text-[#71717a] text-sm">
        {data.paragraph}
      </span>
      {data.hardNavigation ?
        (
          <a
            href={
              pathname?.startsWith(pathNames.login) ? (
                pathNames.signUp + `?${params}`
              ) : (
                pathNames.login + `?${params}`
              )
            }
            className="text-[#20b0ff] text-sm hover:underline"
          >
            {data.linkText}
          </a>
        ) : (
          <Link
            href={
              pathname?.startsWith(pathNames.login) ? (
                pathNames.signUp + `?${params}`
              ) : (
                pathNames.login + `?${params}`
              )
            }
            className="text-[#20b0ff] text-sm hover:underline"
            replace
            scroll={false}
          >
            {data.linkText}
          </Link>
        )
      }
    </div>
  )
}