'use client'

import React, { ReactNode, useState } from 'react'
import { SignModal, SignModalTexts } from '@client-component/sign-modal/sign-modal'

interface SignButtonProps extends SignModalTexts {
  children: ReactNode
}

export function SignButton (data: SignButtonProps) {
  const [showModal, setShowModal] = useState<boolean>(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <button
        type="button"
        className="text-white bg-[#00152a] font-medium rounded-full text-sm font-sans px-4 py-2"
        onClick={toggleModal}
      >
        {data.children}
      </button>
      {showModal &&
        <SignModal 
          backendUrl={data.backendUrl}
          loginTitle={data.loginTitle}
          pFirstLogin={data.pFirstLogin}
          pSecondLogin={data.pSecondLogin}
          switchLogin={data.switchLogin}
          signTitle={data.signTitle}
          pFirstSign={data.pFirstSign}
          pSecondSign={data.pSecondSign}
          switchSign={data.switchSign}
          emailLabel={data.emailLabel}
          passLabel={data.passLabel}
          nameLabel={data.nameLabel}
          toggleModal={toggleModal}
        />
      }      
    </>
  )
} 
