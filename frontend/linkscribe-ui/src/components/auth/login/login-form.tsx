"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import CustomInput from "@/components/auth/login/custom-input"
import PasswordInput from "@/components/auth/login/password-input"

export default function LoginForm(loginData: {
  backendUrl: string | undefined
  emailLabel: string
  passLabel: string
  buttonLabel: string
}) {
  const { register, handleSubmit } = useForm({
    mode: "onSubmit"
  })

  const onSubmit = async (data: any) => {
    await signIn("credentials", {
      email: data.loginEmail,
      password: data.loginPassword,
      redirect: true,
      callbackUrl: "/"
    })
    .then(response => console.log(response))
  }

  return (
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
  )
}