'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { CustomInput } from '@client-component/sign-modal/custom-input'
import { PasswordInput } from '@client-component/sign-modal/password-input'
import { APIConstants } from '@client-component/utils/constants'

export interface SignUpFormLabels {
  backendUrl: string | undefined
  emailLabel: string
  passLabel: string
  nameLabel: string
}

interface SignUpFormProps extends SignUpFormLabels {
  buttonLabel: string
}

export function SignUpForm (signData: SignUpFormProps) {
  const { register, watch, handleSubmit, setValue, reset } = useForm({
    mode: 'all'
  })

  const onSubmit = async (data: any) => {
    console.log(data)

    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json");
    
    fetch(signData.backendUrl + APIConstants.API_CREATE_USER, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          "name": data.signName,
          "email": data.signEmail,
          "password": data.signPassword
        })
      })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
  }

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CustomInput
        register={register}
        id='signName'
        type='name'
        inputLabel={signData.nameLabel}
        autoFocus={true}
      />
      <CustomInput
        register={register}
        id='signEmail'
        type='email'
        inputLabel={signData.emailLabel}
        autoFocus={false}
      />
      <PasswordInput
        register={register}
        id='signPassword'
        inputLabel={signData.passLabel}
      />
      <button type="submit" className="px-6 py-3 rounded-full bg-[#00152a] text-white w-full">
        <span>{signData.buttonLabel}</span>
      </button>
    </form>
  )
}