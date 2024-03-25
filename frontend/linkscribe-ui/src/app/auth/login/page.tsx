import Login from "@/components/auth/login/Login"
import texts from "@messages/en.json"

export const metadata = {
  title: texts.Metadata.login.title
}

export default function LoginPage () {
  return (
    <div className="my-6 2xl:my-14">
      <Login />
    </div>
  )
}
