'use client'

import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface ClientImageProps {
    imageComponent: StaticImageData | string
    description: string
  }
  
export function ClientImage({ imageComponent,  description}: ClientImageProps) {
    return (
        <Image
            src={imageComponent}
            alt={description}
            className="w-auto h-auto"
        />
    )
  }