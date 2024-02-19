import Link from "next/link"
import SignUpForm from "@/components/sign-up/sign-up-form"
import ModalText from "@/components/auth-modal/modal-text"
import texts from "@messages/en.json"
import SwitchLink from "../auth-modal/switch-link"

export default function SignUp() {
  const BACKEND_URL = process.env.BACKEND_URL
  const tModal = texts.Modal

  return (
    <div className="p-6 sm:pb-10 sm:px-14 pt-0 sm:pt-0 font-sans">
      <ModalText
        title={tModal.signUp.title}
        pFirst={tModal.signUp.paragraph.first}
        pSecond={tModal.signUp.paragraph.second}
      />
      <SignUpForm
        backendUrl={BACKEND_URL}
        buttonLabel={tModal.signUp.title}
        emailLabel={tModal.emailLabel}
        passLabel={tModal.passwordLabel}
        nameLabel={tModal.nameLabel}
        maxText={tModal.max}
        minText={tModal.min}
        reqText={tModal.required}
        invalid={tModal.email.invalid}
        registered={tModal.email.registered}
      />
      <SwitchLink
        href="/login"
        linkText={tModal.login.title}
        paragraph={tModal.signUp.paragraph.switch}
      />
    </div>
  )
}