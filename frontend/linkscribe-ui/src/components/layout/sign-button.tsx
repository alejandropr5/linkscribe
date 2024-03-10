"use client"
import React, { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import UserButton from "./user-button"

export default function SignButton(data: {
    loginLabel: string
    signUpLabel: string
  }) {
    const router = useRouter()
    const pathname = usePathname()
    const isLogin = pathname?.startsWith("/login")
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      if (status === "loading") {
        setLoading(true)
      } else {
        setLoading(false)
      }
    }, [status])
  
    return (
      <div className="ml-auto flex gap-2">
        {loading ? ( 
          <div className="w-7 h-7 rounded-full bg-slate-300"/>
        ) : session ? (
          <UserButton
            onClick={() => {
              signOut({ redirect: false })
            }}
            session={session}
          />
        ) : (
          <button
            type="button"
            className="bg-[#00152a] rounded-full font-medium text-white text-sm font-sans px-4 py-2"
            onClick={() =>
              router.push(isLogin ? "/sign-up" : "/login", { scroll: false })
            }
          >
            {isLogin ? data.signUpLabel : data.loginLabel}
          </button>
        )}
      </div>
    )
  }
