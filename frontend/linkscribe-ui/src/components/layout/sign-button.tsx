"use client"
import React from "react"
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

  const { data: session } = useSession()
  console.log({ session })  
  
  return (
    <div className="ml-auto flex gap-2">
      {session?.user ? (
        <UserButton onClick={() => {signOut}}/>
      ) : (
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
      )}
    </div>

  )
} 
