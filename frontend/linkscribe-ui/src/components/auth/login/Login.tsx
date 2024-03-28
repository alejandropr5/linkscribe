import React, { Suspense } from "react"
import LoginForm from "@/components/auth/login/LoginForm"
import ModalText from "@/components/auth-modal/ModalText"
import SwitchLink from "@/components/auth-modal/SwitchLink"
import texts from "@messages/en.json"

export default function Login() {
  const BACKEND_URL = process.env.BACKEND_URL
  const tModal = texts.Modal

  return (
    <div className="p-6 sm:pb-10 sm:px-14 pt-0 font-sans">
      <ModalText
        title={tModal.login.title}
        pFirst={tModal.login.paragraph.first}
        pSecond={tModal.login.paragraph.second}
      />
      <Suspense>
        <LoginForm
          backendUrl={BACKEND_URL}
          buttonLabel={tModal.login.title}
          emailLabel={tModal.emailLabel}
          passLabel={tModal.passwordLabel}
          errorMessage={tModal.login.errorMessage}
        />
        <SwitchLink
          linkText={tModal.signUp.title}
          paragraph={tModal.login.paragraph.switch}
        />
      </Suspense>
    </div>
  )
}