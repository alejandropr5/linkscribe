import Login from "@/components/auth/login/Login"
import texts from "@messages/en.json"

export const metadata = {
  title: texts.Metadata.login.title
}

export default function LoginPage () {
  return (
    <div className="max-w-2xl px-6 mx-auto my-12 lg:my-16 2xl:my-24">
      <Login hardNavigation={true} />
    </div>
  )
}
