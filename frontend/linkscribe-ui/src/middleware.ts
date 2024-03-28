import { NextResponse, type NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { pathNames } from "@/components/utils/constants"
 
export async function middleware(req: NextRequest) {
  
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
 
  if (req.nextUrl.pathname.startsWith(pathNames.login) || req.nextUrl.pathname.startsWith(pathNames.signUp)) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }
  
  if (req.nextUrl.pathname.startsWith("/saved")) {
    if (!session) {
      const requestedPage = req.nextUrl.pathname
      const url = new URL(pathNames.login, req.url)
      url.search = `redirect=${requestedPage}`
      return NextResponse.redirect(url)
    }
  }
}
