"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-toastify"
import CustomInput from "@/components/auth/login/CustomInput"
import PasswordInput from "@/components/auth/login/PasswordInput"

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
          autoFocus={false}
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