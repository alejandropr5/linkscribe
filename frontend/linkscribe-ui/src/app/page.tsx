import URLForm from "@/components/url-form/URLForm"
import texts from "@messages/en.json"

export default function Home() {
  const BACKEND_URL = process.env.BACKEND_URL
  const t = texts.Body

  return (
    <div className="max-w-2xl px-6 mx-auto my-6 2xl:my-14">
      <div className="text-center md:mb-12">
        <div className="text-3xl md:text-[44px] tracking-tight font-bold text-[#27272a] leading-none">
          {t.title.first}
          <br />
          {t.title.second}
        </div>
        <p className="text-[#52525b] md:text-lg mt-6 hidden md:block leading-normal font-sans">
          {t.paragraph.first}
          <br />
          {t.paragraph.second}
        </p>
      </div>
      <URLForm
        backendUrl={BACKEND_URL}
        searchPlaceholder={t.bookmark.searchPlaceholder}
      />
    </div>
  )
}
