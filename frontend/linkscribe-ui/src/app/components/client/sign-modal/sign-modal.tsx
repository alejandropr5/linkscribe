'use client'

import React, { useState } from 'react'
import { LoginForm, LoginFormLabels } from '@client-component/sign-modal/login-form'
import { ModalText } from '@client-component/sign-modal/modal-text'
import { SignUpForm, SignUpFormLabels } from '@client-component/sign-modal/sign-up-form'

export interface SignModalTexts extends LoginFormLabels, SignUpFormLabels {
  loginTitle: string
  pFirstLogin: string
  pSecondLogin: string
  switchLogin: string
  signTitle: string
  pFirstSign: string
  pSecondSign: string
  switchSign: string
}

interface SignModalProps extends SignModalTexts {
  toggleModal: () => void
}

export function SignModal (data: SignModalProps) {
  const [isLogin, setIsLogin] = useState<boolean>(true)

  const toggleLogin = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div>
      <div className="fixed inset-0 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center px-6 bg-black/50">
        <div className="h-auto overflow-hidden rounded-2xl bg-white shadow-2xl w-full max-w-md font-sans">
          <div className="h-14 flex items-center px-6">
            <button onClick={data.toggleModal} type='button' className="cursor-pointer ml-auto text-[#52525b]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div className="p-6 sm:pb-10 sm:px-14 pt-0 sm:pt-0">
            <ModalText 
              title={isLogin ? data.loginTitle : data.signTitle}
              pFirst={isLogin ? data.pFirstLogin : data.pFirstSign}
              pSecond={isLogin ? data.pSecondLogin : data.pSecondSign}
            />
            {isLogin
              ? (
                <LoginForm
                  backendUrl={data.backendUrl}
                  buttonLabel={data.loginTitle}
                  emailLabel={data.emailLabel}
                  passLabel={data.passLabel}
                />
              )
              :(
                <SignUpForm
                  backendUrl={data.backendUrl}
                  buttonLabel={data.signTitle}
                  emailLabel={data.emailLabel}
                  passLabel={data.passLabel}
                  nameLabel={data.nameLabel}
                />
              )
            }
            <div className="flex justify-center mt-4 space-x-1">
              <span className="text-[#71717a] text-sm">
                {isLogin ? data.switchLogin : data.switchSign}
              </span>
              <button
                className="text-[#20b0ff] text-sm hover:underline"
                onClick={toggleLogin}
              >
                {isLogin ? data.signTitle : data.loginTitle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}