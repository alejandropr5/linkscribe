"use client"

import React from "react"
import { APIConstants } from "@/components/utils/constants"
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch
} from "react-hook-form"

export default function EmailInput(data: {
  backendUrl: string | undefined
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  watch: UseFormWatch<FieldValues>
  inputLabel: string
  id: string
  maxLen: number
  registered: string
  invalid: string
  reqText: string
  maxText: string
}) {
  const validation = async () => {
    const currentVal = data.watch(data.id)
    const isEmail = !((data.errors[data.id]?.type) === "pattern")
    var available = true

    if (isEmail) {
      await fetch(data.backendUrl + APIConstants.GET_AVAILABILITY + currentVal, {
        method: "GET"
      })
        .then(response => response.json())
        .then(result => {
          available = result.available
        })
        .catch(error => console.log("error", error))
    }
    if (!available) {
      return data.registered
    }
    return available
  }

  return (
    <div className="relative">
      <input
        {...data.register(data.id, {
          pattern: {
            value: /^[\w-.]+@[\w-]+(\.[\w]{2,})+$/,
            message: data.invalid
          },
          validate: validation,
          required: data.reqText,
          maxLength: {
            value: data.maxLen,
            message: data.maxText + data.maxLen
          }
        })}
        id={data.id}
        className={`custom-autofill peer px-6 py-3 w-full font-normal h-[50px] rounded-full bg-white text-[#52525b] font-sans
        focus:outline-none  border-[1.5px] focus:border-2
        ${data.errors[data.id] ? "focus:border-red-400" : "focus:border-[#c1def1]"}`}
        placeholder=""
        autoComplete="email"
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