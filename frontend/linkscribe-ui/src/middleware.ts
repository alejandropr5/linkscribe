import { NextResponse, type NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
 
export async function middleware(req: NextRequest) {
  
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
 
  if (session) {
    return NextResponse.redirect(new URL("/", req.url))
  }
}

export const config = {
  matcher: ["/login", "/sign-up"]
}