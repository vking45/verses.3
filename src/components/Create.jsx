import React from 'react'
import { Link } from 'react-router-dom'

function Create() {
  return (
    <div className='bg-main h-screen'>
        <section class="h-full text-gray-600 body-font font-jura">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4">
      <div class="p-4 lg:w-1/2">
        <div class="h-full text-watson border-dashed border-4 border-sherlock bg-main bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-xl overflow-hidden text-center relative">
          <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Create A Verse</h1>
          <Link to='/create/verse/' class="inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mt-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
          </Link>
        </div>
      </div>
      <div class="p-4 lg:w-1/2">
        <div class="h-full border-dashed text-loki border-4 border-thor bg-main bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Create A Collection</h1>
          <Link to='/create/collection/' class="text-indigo-500 inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mt-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Create