'use client'

import React from 'react'
import linkscribe from '../../../public/linkscribe-logo.png'
import { ClientImage } from './client-image'
import { SignButton } from './sign-button'

export function CustomHeader () {
  return (
    <header className="w-full bg-white border-b-[1px] border-b-[#eaecf0] z-50">
      <div className="px-6 flex items-center justify-between h-14">
        <div className="flex flex-row justify-between items-center">
          <div className="max-h-8 max-w-8">
            <ClientImage imageComponent={linkscribe} description={'linkscribe logo'}/>
          </div>
          <span className="text-[#00152a] text-[20px] ml-1 font-bold tracking-wide">
            LinkScribe
          </span>
        </div>
        <div className="flex flex-row h-full items-center">
          <SignButton/>
        </div>
      </div>
    </header>    
  )
}