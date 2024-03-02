import Link from "next/link"
import LoginForm from "@/components/auth/login/login-form"
import ModalText from "@/components/auth-modal/modal-text"
import SwitchLink from "@/components/auth-modal/switch-link"
import texts from "@messages/en.json"

export default function Login() {
  const BACKEND_URL = process.env.BACKEND_URL
  const tModal = texts.Modal

  return (
    <div className="p-6 sm:pb-10 sm:px-14 pt-0 sm:pt-0 font-sans">
      <ModalText
        title={tModal.login.title}
        pFirst={tModal.login.paragraph.first}
        pSecond={tModal.login.paragraph.second}
      />
      <LoginForm
        backendUrl={BACKEND_URL}
        buttonLabel={tModal.login.title}
        emailLabel={tModal.emailLabel}
        passLabel={tModal.passwordLabel}
      />
      <SwitchLink
        href="/sign-up"
        linkText={tModal.signUp.title}
        paragraph={tModal.login.paragraph.switch}
      />
    </div>
  )
}