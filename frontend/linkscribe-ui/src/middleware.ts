import { NextResponse, type NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
 
export async function middleware(req: NextRequest) {
  
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
 
  if (req.nextUrl.pathname.startsWith("/auth/login") || req.nextUrl.pathname.startsWith("/auth/sign-up")) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }
  
  if (req.nextUrl.pathname.startsWith("/saved")) {
    if (!session) {
      const requestedPage = req.nextUrl.pathname
      const url = req.nextUrl.clone()
      url.pathname = "/login"
      url.search = `redirect=${requestedPage}`
      return NextResponse.redirect(url)
    }
  }
}
