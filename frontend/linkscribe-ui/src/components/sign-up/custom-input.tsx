"use client"

import React from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

export default function CustomInput(data: {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  inputLabel: string
  id: string
  type: string
  autoFocus: boolean
  minLen: number
  maxLen: number
  reqText: string
  minText: string
  maxText: string
}) {
  return (
    <div className="relative">
      <input
        {...data.register(data.id, {
          required: data.reqText,
          minLength: {
            value: data.minLen,
            message: data.minText + data.minLen
          },
          maxLength: {
            value: data.maxLen,
            message: data.maxText + data.maxLen
          }
        })}
        id={data.id}
        className={`peer px-6 py-3 w-full font-normal h-[50px] rounded-full bg-white text-[#52525b] font-sans
        focus:outline-none  border-[1.5px] focus:border-2
        ${data.errors[data.id] ? "focus:border-red-400" : "focus:border-[#c1def1]"}`}
        type={data.type}
        placeholder=""
        autoComplete={data.type}
        autoFocus={data.autoFocus}
      />
      <label
        htmlFor={data.id}
        className={`absolute cursor-text top-0 left-6 -translate-y-[8px] transition-all text-[#9ca3af] text-sm bg-white px-1 rounded-lg
        peer-placeholder-shown:translate-y-[50%] peer-placeholder-shown:text-base
        peer-focus:-translate-y-[8px] peer-focus:text-sm
        ${data.errors[data.id] ? "peer-focus:text-red-500" : "peer-focus:text-[#20b0ff]"}`}
      >
        {data.inputLabel}
      </label>
      {data.errors[data.id] &&
        <label className="absolute text-red-500 text-sm left-6 -bottom-5">
          {String(data.errors[data.id]?.message)}
        </label>
      }
    </div>
  )
}

