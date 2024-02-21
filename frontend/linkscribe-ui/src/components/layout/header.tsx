import React from "react"
import Link from "next/link"
import linkscribe from "@public/linkscribe-logo.png"
import ClientImage from "@/components/utils/client-image"
import SignButton from "@/components/layout/sign-button"
import texts from "@messages/en.json"

export default function Header() {
  const t = texts.Header

  return (
    <header className="w-full bg-white border-b-[1px] border-b-[#eaecf0] z-40 sticky top-0">
      <div className="px-6 flex items-center justify-between h-14">
        <Link
          className="flex flex-row justify-between items-center"
          href="/">
          <div className="max-h-8 max-w-8">
            <ClientImage imageComponent={linkscribe} description={"linkscribe logo"} />
          </div>
          <span className="text-[#00152a] text-[20px] ml-1 font-bold tracking-wide">
            {t.title}
          </span>
        </Link>
        <div className="flex flex-row h-full items-center">
          <SignButton 
            loginLabel={t.loginLabel}
            signUpLabel={t.signUpLabel}
          />
        </div>
      </div>
    </header>
  )
}