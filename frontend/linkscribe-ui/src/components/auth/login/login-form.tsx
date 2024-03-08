"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Flip, toast, ToastContainer } from "react-toastify"
import CustomInput from "@/components/auth/login/custom-input"
import PasswordInput from "@/components/auth/login/password-input"
import "react-toastify/dist/ReactToastify.css"

export default function LoginForm(loginData: {
  backendUrl: string | undefined
  emailLabel: string
  passLabel: string
  buttonLabel: string
  errorMessage: string
}) {
  const router = useRouter()
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
        router.back()
      } else if (response?.status === 401) {
        toast.error(loginData.errorMessage, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        })
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
      <ToastContainer />
    </div>
  )
}