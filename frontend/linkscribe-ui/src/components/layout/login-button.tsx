"use client"
// import Link from "next/link"
import React from "react"
import { useRouter } from 'next/navigation'

export default function LoginButton(data: {
    children: React.ReactNode
  }) {
  const router = useRouter()
  
  return (
    <button
      type="button"
      className="text-white bg-[#00152a] font-medium rounded-full text-sm font-sans px-4 py-2"
      onClick={() => router.push("/login", {
        scroll: false
      })}
      // href="/login"
      // scroll={false}
    //   locale={false}
    >
      {data.children}
    </button>
  )
} 
