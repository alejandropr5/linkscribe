import { Suspense } from "react"
import SignUpForm from "@/components/auth/sign-up/SignUpForm"
import ModalText from "@/components/modal/ModalText"
import texts from "@messages/en.json"
import SwitchLink from "../../modal/SwitchLink"

export default function SignUp({
  hardNavigation
} : {
  hardNavigation?: boolean
}) {
  const BACKEND_URL = process.env.BACKEND_URL
  const tModal = texts.Modal

  return (
    <div className="p-6 sm:pb-10 sm:px-14 pt-0 font-sans">
      <ModalText
        title={tModal.signUp.title}
        pFirst={tModal.signUp.paragraph.first}
        pSecond={tModal.signUp.paragraph.second}
      />
      <Suspense>
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
          hardNavigation={hardNavigation}
          linkText={tModal.login.title}
          paragraph={tModal.signUp.paragraph.switch}
        />
      </Suspense>
    </div>
  )
}