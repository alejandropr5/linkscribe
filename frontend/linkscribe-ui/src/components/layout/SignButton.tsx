"use client"
import React, { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import UserButton from "@/components/layout/UserButton"

export default function SignButton(data: {
    loginLabel: string
    signUpLabel: string
  }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (status === "loading") {
        setLoading(true)
      } else {
        setLoading(false)
      }
    }, [status])

    const handleOnClick = () => {
      const params = searchParams?.toString()
        if (pathname?.startsWith("/login")) {
          router.replace("/sign-up?" + params, { scroll: false })
        }
        else if (pathname?.startsWith("/sign-up")) {
          router.replace("/login?" + params, { scroll: false })
        }
        else {
          router.push(`/login?redirect=${pathname}`, { scroll: false })
        }
    }
  
    return (
      <div className="ml-auto flex gap-2">
        {loading ? ( 
          <div className="w-7 h-7 rounded-full bg-slate-300"/>
        ) : session ? (
          <UserButton
            onClick={() => {
              signOut({ redirect: true, callbackUrl: "/" })
            }}
            session={session}
          />
        ) : (
          <button
            type="button"
            className="bg-[#00152a] rounded-full font-medium text-white text-sm font-sans px-4 py-2"
            onClick={handleOnClick}
          >
            {pathname?.startsWith("/login") ? data.signUpLabel : data.loginLabel}
          </button>
        )}
      </div>
    )
  }
