import SignUp from "@/components/auth/sign-up/SignUp";
import texts from "@messages/en.json"

export const metadata = {
  title: texts.Metadata.signUp.title
}

export default function SignUpPage () {
  return (
    <div className="max-w-2xl px-6 mx-auto my-12 lg:my-16 2xl:my-24">
      <SignUp />
    </div>
  )
}