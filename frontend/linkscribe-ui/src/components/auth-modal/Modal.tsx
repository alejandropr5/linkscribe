"use client"
import { useRouter } from "next/navigation"

export default function Modal(data: {
  children: React.ReactNode
}) {
  const router = useRouter()
  return (
    <div
      className="absolute min-h-screen inset-0 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center px-6 bg-black/50"
      onClick={() => router.back()}
    >
      <div
        className="h-auto overflow-hidden rounded-2xl bg-white shadow-2xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        {data.children}
      </div>
    </div>
  )
}