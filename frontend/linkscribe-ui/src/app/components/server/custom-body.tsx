import React from 'react'
import {useTranslations} from 'next-intl'

import { URLForm } from '@client-component/link-form/link-form'

export function CustomBody () {
  const BACKEND_URL = process.env.BACKEND_URL
  const t = useTranslations('Body')

  return (
    <main className="flex w-full h-[calc(100vh-56px)] overflow-y-auto sticky top-14 bg-gradient-to-br from-white to-[#f3f8fc]">
      <div className="max-w-2xl px-6 mx-auto mt-8 md:mt-16 md:mb-12 mb-6">
        <div className="text-center md:mb-12">
          <div className="text-3xl md:text-[44px] tracking-tight font-bold text-[#27272a] leading-none">
            {t('title.first')}
            <br/>
            {t('title.second')}
          </div>
          <p className="text-[#52525b] md:text-lg mt-6 hidden md:block leading-normal font-sans">
            {t('paragraph.first')}
            <br/>
            {t('paragraph.second')}
          </p>
        </div>
        <URLForm backendUrl={BACKEND_URL}/>
      </div>
    </main>
  )
}