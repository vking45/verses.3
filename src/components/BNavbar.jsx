import React from 'react'

function BNavbar() {
  return (
    <div className="">
        
<div class="fixed bottom-0 left-0 w-full h-20 bg-secondary">
    <div class=" flex justify-between h-full max-w-lg mx-auto">
        <button type="button" class="inline-flex flex-col py-3 items-center justify-center px-5 w-1/3">
            <svg class="w-8 h-8 mx-1 text-primary " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            <span class="text-lg text-primary font-jura font-medium">Home</span>
        </button>
        <button type="button" class="inline-flex flex-col py-3 items-center justify-center px-5 w-1/3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mx-1 text-primary">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
            <span class="text-lg text-primary font-jura font-medium">Create</span>
        </button>
        <button type="button" class="inline-flex flex-col py-3 items-center justify-center px-5 w-1/3">
            <svg class="w-8 h-8 mx-1 text-primary " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"></path>
            </svg>
            <span class="text-lg text-primary font-jura font-medium">Profile</span>
        </button>
    </div> 
</div>

    </div>
  )
}

export default BNavbar