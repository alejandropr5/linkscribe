import SignUp from "@/components/auth/sign-up/sign-up";
import texts from "@messages/en.json"

export const metadata = {
  title: texts.Metadata.signUp.title
}

export default function SignUpPage () {
  return (
    <div className="my-6 2xl:my-14">
      <SignUp />
    </div>
  )
}