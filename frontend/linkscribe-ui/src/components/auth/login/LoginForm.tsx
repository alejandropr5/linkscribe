"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-toastify"
import { FieldValues, UseFormRegister } from "react-hook-form"
import ClientImage from "@/components/utils/ClientImage"
import showSVG from "@public/show.svg"
import hideSVG from "@public/hide.svg"

function CustomInput(data: {
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


function PasswordInput(data: {
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


export default function LoginForm(loginData: {
  backendUrl: string | undefined
  emailLabel: string
  passLabel: string
  buttonLabel: string
  errorMessage: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams?.get("redirect") 

  const { register, handleSubmit } = useForm({
    mode: "onSubmit"
  })

  const onSubmit = async (data: any) => {
    await signIn("credentials", {
      email: data.loginEmail,
      password: data.loginPassword,
      redirect: false
    })
    .then(response => {
      if (response?.status === 200) {
        router.push(redirect ? `${redirect}` : "/", {
          scroll: false
        })        
      }
      else if (response?.status === 401) {
        toast.error(loginData.errorMessage)
      }
    })
  }

  return (
    <div>
      <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomInput
          register={register}
          id="loginEmail"
          type="email"
          inputLabel={loginData.emailLabel}
          autoFocus={true}
        />
        <PasswordInput
          register={register}
          id="loginPassword"
          inputLabel={loginData.passLabel}
        />
        <button type="submit" className="px-6 py-3 rounded-full bg-[#00152a] text-white w-full">
          <span>{loginData.buttonLabel}</span>
        </button>
      </form>
    </div>
  )
}
