import texts from "@messages/en.json"

export default function NotFound () {
  const t = texts.Error

  return (
    <div className="flex flex-row items-center justify-between font-bold text-[#27272a] h-full ">
      <div className="text-5xl">
        404
      </div>
      <hr className="w-fit h-14 border-l-[#bdc0c7] border-l-2 mx-6"></hr>
      <div className="text-xl">
        {t.notFound}
      </div>      
    </div>
  )
}