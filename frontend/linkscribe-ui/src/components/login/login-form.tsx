"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { APIConstants } from "@/components/utils/constants"
import CustomInput from "@/components/login/custom-input"
import PasswordInput from "@/components/login/password-input"

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
    var formdata = new FormData()
    formdata.append("username", data.loginEmail)
    formdata.append("password", data.loginPassword)

    fetch(loginData.backendUrl + APIConstants.LOGIN, {
      method: "POST",
      body: formdata,
      redirect: "follow"
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log("error", error))
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