"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import CustomInput from "@/components/auth/sign-up/CustomInput"
import PasswordInput from "@/components/auth/sign-up/PasswordInput"
import EmailInput from "@/components/auth/sign-up/EmailInput"
import { APIConstants } from "@/components/utils/constants"


export default function SignUpForm(signData: {
    backendUrl: string | undefined
    emailLabel: string
    passLabel: string
    nameLabel: string
    maxText: string
    minText: string
    reqText: string
    invalid: string
    registered: string
    buttonLabel: string
  }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams?.get("redirect") 
  
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit
  } = useForm({ mode: "onSubmit" })

  const onSubmit = async (data: any) => {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json");

    fetch(signData.backendUrl + APIConstants.CREATE_USER, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        "name": data.signName,
        "email": data.signEmail,
        "password": data.signPassword
      })
    })
      .then(res => res.json())
      .then(() => {
        signIn("credentials", {
          email: data.signEmail,
          password: data.signPassword,
          redirect: false
        })
        .then(response => {
          if (response?.status === 200) {
            router.push(redirect ? `${redirect}` : "/", {
              scroll: false
            })   
          }
        })        
      })
  }

  return (
    <form
      className="space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CustomInput
        register={register}
        id="signName"
        type="name"
        inputLabel={signData.nameLabel}
        autoFocus={true}
        errors={errors}
        minLen={1}
        maxLen={40}
        maxText={signData.maxText}
        minText={signData.minText}
        reqText={signData.reqText}
      />
      <EmailInput
        backendUrl={signData.backendUrl}
        register={register}
        id="signEmail"
        inputLabel={signData.emailLabel}
        errors={errors}
        watch={watch}
        maxLen={50}
        invalid={signData.invalid}
        maxText={signData.maxText}
        registered={signData.registered}
        reqText={signData.reqText}
      />
      <PasswordInput
        register={register}
        id="signPassword"
        inputLabel={signData.passLabel}
        errors={errors}
        minLen={6}
        maxLen={50}
        maxText={signData.maxText}
        minText={signData.minText}
        reqText={signData.reqText}
      />
      <button type="submit" className="px-6 py-3 rounded-full bg-[#00152a] text-white w-full">
        <span>{signData.buttonLabel}</span>
      </button>
    </form>
  )
}