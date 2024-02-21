"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

export default function SignButton(data: {
    loginLabel: string
    signUpLabel: string
  }) {
  const router = useRouter()
  const pathname = usePathname()
  const isLogin = pathname.startsWith("/login")
  
  return (
    <button
      type="button"
      className="bg-[#00152a] rounded-full font-medium text-white text-sm font-sans px-4 py-2"
      onClick={() => router.push((
        isLogin ? "/sign-up" : "/login"
      ), {
        scroll: false
      })}
    >
      {isLogin ? data.signUpLabel : data.loginLabel}
    </button>
  )
} 
