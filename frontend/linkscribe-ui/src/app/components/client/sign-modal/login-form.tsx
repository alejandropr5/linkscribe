'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { CustomInput } from '@client-component/sign-modal/custom-input'
import { PasswordInput } from '@client-component/sign-modal/password-input'

export interface LoginFormLabels {
  backendUrl: string | undefined
  emailLabel: string
  passLabel: string
}

interface LoginFormProps extends LoginFormLabels {
  buttonLabel: string
}

export function LoginForm (data: LoginFormProps) {
  const { register, watch, handleSubmit, setValue, reset } = useForm({
    mode: 'all'
  })

  return (
    <form className="space-y-6">
      <CustomInput
        register={register}
        id='loginEmail'
        type='email'
        inputLabel={data.emailLabel}
        autoFocus={false}
      />
      <PasswordInput
        register={register}
        id='loginPassword'
        inputLabel={data.passLabel}
      />
      <button type="submit" className="px-6 py-3 rounded-full bg-[#00152a] text-white w-full">
        <span>{data.buttonLabel}</span>
      </button>
    </form>
  )
}