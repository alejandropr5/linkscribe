import React from 'react'
import {useTranslations} from 'next-intl'
import linkscribe from '@public/linkscribe-logo.png'
import { ClientImage } from '@client-component/utils/client-image'
import { SignButton } from '@client-component/sign-modal/sign-button'

export function CustomHeader () {
  const BACKEND_URL = process.env.BACKEND_URL
  const t = useTranslations('Header')
  const tModal = useTranslations('SignModal')

  return (
    <header className="w-full bg-white border-b-[1px] border-b-[#eaecf0] z-50 sticky top-0">
      <div className="px-6 flex items-center justify-between h-14">
        <div className="flex flex-row justify-between items-center">
          <div className="max-h-8 max-w-8">
            <ClientImage imageComponent={linkscribe} description={'linkscribe logo'}/>
          </div>
          <span className="text-[#00152a] text-[20px] ml-1 font-bold tracking-wide">
            {t('title')}
          </span>
        </div>
        <div className="flex flex-row h-full items-center">
          <SignButton 
            backendUrl={BACKEND_URL}
            loginTitle={tModal('login.title')}
            pFirstLogin={tModal('login.paragraph.first')}
            pSecondLogin={tModal('login.paragraph.second')}
            switchLogin={tModal('login.paragraph.switch')}   
            signTitle={tModal('sign-up.title')}
            pFirstSign={tModal('sign-up.paragraph.first')}
            pSecondSign={tModal('sign-up.paragraph.second')}
            switchSign={tModal('sign-up.paragraph.switch')}   
            emailLabel={tModal('email-label')}
            passLabel={tModal('password-label')}
            nameLabel={tModal('name-label')}
          >
            {t('sign-button-label')}
          </SignButton>
        </div>
      </div>
    </header>    
  )
}