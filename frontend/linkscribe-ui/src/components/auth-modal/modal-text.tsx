export default function ModalText (data: {
  title: string
  pFirst: string
  pSecond: string
}) {
  return (
    <div className="text-center mb-8">
      <div className="text-4xl md:text-[44px] tracking-tight font-bold text-[#27272a] font-jakarta">
        {data.title}
      </div>
      <p className="text-[#52525b] text-base md:text-lg md:mt-6 mt-4 leading-normal">
        {data.pFirst}
        <br/>
        {data.pSecond}
      </p>
    </div>
  )
}