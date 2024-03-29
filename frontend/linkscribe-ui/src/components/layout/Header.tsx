import React, { Suspense } from "react"
import Link from "next/link"
import linkscribe from "@public/linkscribe-logo.png"
import ClientImage from "@/components/utils/ClientImage"
import SignButton from "@/components/layout/SignButton"
import NavBar from "@/components/layout/NavBar"
import texts from "@messages/en.json"

export default function Header() {
  const t = texts.Header

  return (
    <header className="w-full bg-white border-b-[1px] border-b-[#eaecf0] z-40 sticky top-0 h-14">
      <div className="px-6 flex items-center justify-between h-full">
        <div className="flex flex-row">
          <Link
            className="flex flex-row justify-between items-center mr-3 min-[500px]:mr-6"
            href="/"
          >
            <div className="max-h-8 max-w-8">
              <ClientImage imageComponent={linkscribe} description={"linkscribe logo"} />
            </div>
            <span className="text-[#00152a] text-[20px] ml-1 font-bold tracking-wide max-[500px]:hidden">
              {t.title}
            </span>
          </Link>
          <NavBar/>
        </div>
        <Suspense>
          <SignButton
            loginLabel={t.loginLabel}
            signUpLabel={t.signUpLabel}
          />
        </Suspense>
      </div>
    </header>
  )
}