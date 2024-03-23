import Link from "next/link"

export default function SwitchLink (data: {
  href: string
  paragraph: string
  linkText: string
}) {
  return (
    <div className="flex justify-center mt-4 space-x-1">
      <span className="text-[#71717a] text-sm">
        {data.paragraph}
      </span>
      <Link
        href={data.href}
        className="text-[#20b0ff] text-sm hover:underline"
        replace
        scroll={false}
      >
        {data.linkText}
      </Link>
    </div>
  )
}