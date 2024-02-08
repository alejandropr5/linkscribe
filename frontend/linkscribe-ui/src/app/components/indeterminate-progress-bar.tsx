'use client'

import React from 'react'

export function IndetProgressBar () {
  return (
    <div className='absolute bottom-0 w-full'>
      <div className='h-[2px] w-full bg-[#c1def193]'>
        <div className='animate-progress w-full h-full bg-[#a6dbff] origin-left-right rounded-full'/>
      </div>
    </div> 
  )
}