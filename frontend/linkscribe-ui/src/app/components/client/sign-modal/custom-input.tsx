'use client'

import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
  register: UseFormRegister<FieldValues>
  inputLabel: string
  id: string
  type: string
  autoFocus: boolean
}

export function CustomInput (data: InputProps) {
  return (
    <div className="relative">
      <input
        {...data.register(data.id)}
        id={data.id}
        className="peer px-6 py-3 w-full font-normal h-[50px] rounded-full bg-white text-[#52525b] font-sans
        focus:outline-none focus:border-[#c1def1] border-[1.5px] focus:border-2"
        type={data.type}
        placeholder=""
        autoComplete={data.type}
        required
        autoFocus={data.autoFocus}
      />
      <label
        htmlFor={data.id}
        className="absolute cursor-text top-0 left-6 -translate-y-[8px] transition-all text-[#9ca3af] text-sm bg-white px-1 rounded-lg
        peer-placeholder-shown:translate-y-[50%] peer-placeholder-shown:text-base
        peer-focus:-translate-y-[8px] peer-focus:text-[#20b0ff] peer-focus:text-sm"
      >
        {data.inputLabel}
      </label>
    </div>
  )
}