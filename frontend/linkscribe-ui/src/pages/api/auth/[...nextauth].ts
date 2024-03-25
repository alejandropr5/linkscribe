import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { APIConstants } from "@/components/utils/constants";
import { CustomUser } from "@/components/utils/constants";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const {email, password} = credentials as any

        var formdata = new FormData()
        formdata.append("username", email)
        formdata.append("password", password)
    
        const res = await fetch(
          process.env.BACKEND_URL + APIConstants.LOGIN, {
            method: "POST",
            body: formdata,
            redirect: "follow"
          }
        )
  
        if (res.status === 200) {
          // Any object returned will be saved in `user` property of the JWT
          // console.log(res.json())
          return res.json()
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          // console.log(res.json())
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return {
        ...token, 
        ...user as CustomUser
      }
    },
    async session({ session, token, user }) {
      session.user = token as CustomUser
      return session
    }
  }
})