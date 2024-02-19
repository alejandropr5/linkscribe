"use client"

import React from "react"
import Image, { StaticImageData } from "next/image"

export default function ClientImage({ imageComponent,  description}: {
  imageComponent: StaticImageData | string
  description: string
}) {
    return (
      <Image
        src={imageComponent}
        alt={description}
        className="w-auto h-auto"
      />
    )
  }