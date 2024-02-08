import React from 'react'
import { URLForm } from './link-form'

export function CustomBody () {
  const BACKEND_URL = process.env.BACKEND_URL
  return (
    <main className="flex w-full h-full bg-gradient-to-br from-white to-[#f3f8fc]">
      <div className="max-w-2xl px-6 mx-auto mt-8 md:mt-16 md:mb-12 mb-6">
        <div className="text-center md:mb-12">
          <div className="text-3xl md:text-[44px] tracking-tight font-bold text-[#27272a] leading-none">
            Streamline Your 
            <br/>
            Bookmarks Management
          </div>
          <p className="text-[#52525b] md:text-lg mt-6 hidden md:block leading-normal font-sans">
            Paste an URL into the input below, and let Linkscribe intelligently
            <br/>
            categorize and store your bookmarks with ease
          </p>
        </div>
        <URLForm backendUrl={BACKEND_URL}/>
      </div>
    </main>
  )
}