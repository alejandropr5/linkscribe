"use client"

import React from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"

export default function CustomInput(data: {
  register: UseFormRegister<FieldValues>
  inputLabel: string
  id: string
  type: string
  autoFocus: boolean
}) {
  return (
    <div className="relative">
      <input
        {...data.register(data.id)}
        id={data.id}
        className="custom-autofill peer px-6 py-3 w-full font-normal h-[50px] rounded-full bg-white text-[#52525b] font-sans
        focus:outline-none  border-[1.5px] focus:border-2 focus:border-[#c1def1]"
        type={data.type}
        placeholder=""
        autoComplete={data.type}
        autoFocus={data.autoFocus}
        required
      />
      <label
        htmlFor={data.id}
        className="absolute cursor-text top-0 left-6 -translate-y-[8px] transition-all text-[#9ca3af] text-sm bg-white px-1 rounded-lg
        peer-placeholder-shown:translate-y-[50%] peer-placeholder-shown:text-base
        peer-focus:-translate-y-[8px] peer-focus:text-sm peer-focus:text-[#20b0ff]"
      >
        {data.inputLabel}
      </label>
    </div>
  )
}
