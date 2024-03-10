"use client"

import { useSession } from "next-auth/react"
import React from "react"


function AuthRedirect<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const { data: session } = useSession()

  const Redirect = (props: P) => {
    return (
      <WrappedComponent {...props} />
    )
  }
  return Redirect
}

export default AuthRedirect

