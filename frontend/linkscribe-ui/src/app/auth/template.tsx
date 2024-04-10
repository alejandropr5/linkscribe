import Header from "@/components/layout/Header";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header withSignButton={false} />
      <div className="flex flex-row min-h-[calc(100vh-56px)] w-full bg-gradient-to-br from-white to-[#f3f8fc]">
        { children }
      </div>
    </>
  )
}