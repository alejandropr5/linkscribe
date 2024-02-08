'use client'

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ClientImage } from './client-image'
import linkSVG from '../../../public/link.svg'
import searchSVG from '../../../public/search.svg'
import { BookmarkCard } from './bookmark-card'
import { IndetProgressBar } from './indeterminate-progress-bar'


export function URLForm ({ backendUrl }: { backendUrl: string | undefined }) {
  const API_PREDICT_PATH = '/bookmark/predict'
  const { register, watch, handleSubmit, setValue, reset } = useForm({
    mode: 'all'
  })
  const [bookmark, setBookmark] = useState({
    url: '',
    title: '',
    image: '',
    category: '',
    showResult: false,
    showProgress: false
  })

  const updateVariable = (key: string, value: any) => {
    setBookmark(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const bookmarkWords = useRef()

  const onSubmit = async (data: any) => {
    updateVariable('showProgress', true)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "url": data.urlInput
    });
    
    await fetch(backendUrl + API_PREDICT_PATH, {
        method: 'POST',
        headers: myHeaders,
        body: raw
      })
      .then(response => response.json())
      .then(result => {
        console.log(result) // <----- Print fetch json results
        setBookmark({
          url: result.url,
          title: result.name,
          image: result.image,
          category: result.category,
          showResult: true,
          showProgress: false
        })
        bookmarkWords.current = result.words
      })
      .catch(error => console.log('error', error))
  }

  return (
    <div className="w-[580px] mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:relative h-14 fixed left-4 right-4 bottom-6 z-40 md:inset-0 rounded-full overflow-hidden shadow-lg shadow-[#c1def193]"           
      >
        <input
          id='urlInput'
          {...register('urlInput')}
          type="url"
          required
          placeholder="URL"
          className="px-14 w-full font-normal placeholder-shown:font-medium h-full rounded-full bg-transparent text-[#27272a] font-sans focus:outline-none focus:border-[#c1def1] border-[1.5px] focus:border-2"/>
        <div className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 left-5">
          <ClientImage imageComponent={linkSVG} description={'Link SVG'}/>
        </div>
        <button
          type="submit"
          className="absolute top-1/2 transform -translate-y-1/2 w-9 h-9 right-4 rounded-full hover:bg-[#c1def193] p-2"
        >
          <ClientImage imageComponent={searchSVG} description={'Search SVG'}/>
        </button>
        {bookmark.showProgress &&
          <IndetProgressBar/>
        }
      </form>
      {bookmark.showResult &&
        <div className="mt-20">
          <BookmarkCard
            url={bookmark.url}        
            category={bookmark.category}
            imgScr={bookmark.image}
            title={bookmark.title}
          />
        </div>         
      }
    </div>
  )
}