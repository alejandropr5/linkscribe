import Login from "@/components/auth/login/login"
import AuthRedirect from "@/components/hoc/auth-redirect"
import texts from "@messages/en.json"

export const metadata = {
  title: texts.Metadata.login.title
}

function LoginPage () {
  return (
    <div className="my-6 2xl:my-14">
      <Login />
    </div>
  )
}

export default AuthRedirect(LoginPage)
