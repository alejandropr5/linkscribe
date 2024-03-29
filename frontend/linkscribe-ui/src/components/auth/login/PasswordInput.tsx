"use client"

import React, { useState } from "react"
import {  FieldValues, UseFormRegister } from "react-hook-form"
import showSVG from "@public/show.svg"
import hideSVG from "@public/hide.svg"
import ClientImage from "@/components/utils/ClientImage"

export default function PasswordInput(data: {
  register: UseFormRegister<FieldValues>
  inputLabel: string
  id: string
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePass = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="relative">
      <input
        {...data.register(data.id)}
        id={data.id}
        className="custom-autofill peer px-6 py-3 w-full font-normal h-[50px] rounded-full bg-white text-[#52525b] font-sans
        focus:outline-none  border-[1.5px] focus:border-2focus:border-[#c1def1"
        type={showPassword ? "text" : "password"}
        placeholder=""
        autoComplete="password"
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
      <button
        onClick={togglePass}
        type="button"
        className="absolute top-1/2 transform -translate-y-1/2 w-9 h-9 right-3 rounded-full hover:bg-[#c1def193] p-2"
      >
        <ClientImage
          imageComponent={showPassword ? hideSVG : showSVG}
          description={"Sow/Hide Password"}
        />
      </button>
    </div>
  )
}
