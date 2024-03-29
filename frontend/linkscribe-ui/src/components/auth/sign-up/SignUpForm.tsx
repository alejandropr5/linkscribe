"use client"

import React, { useState } from "react"
import { useForm, FieldErrors, FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { APIConstants } from "@/components/utils/constants"
import ClientImage from "@/components/utils/ClientImage"
import showSVG from "@public/show.svg"
import hideSVG from "@public/hide.svg"

function CustomInput(data: {
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
        className={`custom-autofill peer px-6 py-3 w-full font-normal h-[50px] rounded-full bg-white text-[#52525b] font-sans
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


function EmailInput(data: {
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
          available = result.is_available
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


function PasswordInput(data: {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  inputLabel: string
  id: string
  minLen: number
  maxLen: number
  reqText: string
  minText: string
  maxText: string
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePass = () => {
    setShowPassword(!showPassword)
  }

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
        className={`custom-autofill peer px-6 py-3 w-full font-normal h-[50px] rounded-full bg-white text-[#52525b] font-sans
        focus:outline-none  border-[1.5px] focus:border-2
        ${data.errors[data.id] ? "focus:border-red-400" : "focus:border-[#c1def1]"}`}
        type={showPassword ? "text" : "password"}
        placeholder=""
        autoComplete="password"
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
      {data.errors[data.id] &&
        <label className="absolute text-red-500 text-sm left-6 -bottom-5">
          {String(data.errors[data.id]?.message)}
        </label>
      }
    </div>
  )
}


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
