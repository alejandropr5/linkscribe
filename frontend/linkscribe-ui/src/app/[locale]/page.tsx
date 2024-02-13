import { CustomHeader } from '@server-component/custom-header'
import { CustomBody } from '@server-component/custom-body'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between bg-white font-jakarta">
      <CustomHeader/>
      <CustomBody/>
    </main>
  )
}
