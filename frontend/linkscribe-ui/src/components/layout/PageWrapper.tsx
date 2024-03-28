import { ReactNode } from "react"

export default function PageWrapper ({ children }: {children: ReactNode}) {
  return (
    <div className="flex w-full h-[calc(100vh-56px)] overflow-y-auto sticky top-14 bg-gradient-to-br from-white to-[#f3f8fc]">
      {/* <div className="max-w-2xl px-6 mx-auto my-6 2xl:my-14"> */}
        {children}
      {/* </div> */}
    </div>
  )
}