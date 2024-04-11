"use client"
import React, { useEffect, useState, useRef } from "react"
import { Session } from "next-auth"
import { signOut, useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { pathNames } from "@/lib/constants"
import ClientImage from "@/components/utils/ClientImage"
import userSVG from "@public/user.svg"


function UserButton (data: {
  session: Session
  onClick: () => void
}) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const dropdown = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!dropdown.current?.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    window.addEventListener("mousedown", handleOutSideClick)

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick)
    }
  }, [dropdown])
  return (
    <div className="flex relative justify-between">
      <button
        className="w-8 h-8"
        onClick={() => {setShowDropdown(true)}}
      >
        <ClientImage description="User icon SVG" imageComponent={userSVG}/>
      </button>    
      {showDropdown &&
        <div
          className="absolute bg-white right-0 top-[100%] rounded-xl shadow-lg py-1 max-w-64 z-10 app-background-color border border-color mt-1"
          ref={dropdown}
        >
          <div
            onClick={data.onClick}
            className="block py-2 mx-1 font-medium text-[#27272a] hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-xl"
          >
            <div className="mx-4 overflow-hidden text-ellipsis">
              Sign Out
            </div>
          </div>
          <div className="px-4 py-2 text-sm text-[#60606b] truncate border-t border-color-subtle mt-1">
            {data.session.user?.email}
          </div>          
        </div>
      }
    </div>

  )
}


export default function SignButton(data: {
  loginLabel: string
  signUpLabel: string
}) {
  const router = useRouter()
  const pathname = usePathname()
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
    router.push(pathNames.login + `?redirect=${pathname}`, { scroll: false })
  }

  return (
    <div className="ml-auto flex gap-2">
      {loading ? ( 
        <div className="w-7 h-7 rounded-full bg-slate-300 animate-pulse"/>
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
          onClick={ handleOnClick }
        >
          { data.loginLabel }
        </button>
      )}
    </div>
  )
}
