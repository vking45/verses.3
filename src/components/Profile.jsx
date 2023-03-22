import React from 'react'
import Feed from './Feed';

function Profile() {
  return (
    <div className='font-jura bg-main'>

<div class="max-w-2xl mx-auto">

    <div class="px-3 py-2">
      
        <div class="flex flex-col gap-1 text-center">
            <a class="block mx-auto bg-center bg-no-repeat bg-cover w-20 h-20 rounded-full border border-gray-400 shadow-lg" href="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"></a>
            <p class="text-primary font-semibold">Marina Davinchi
            </p>
            <span class="text-sm text-primary">Token Balance</span>
            <span class="text-sm text-primary">Wallet Address</span>
        </div>


   
        <div class="flex justify-center items-center gap-2 my-3">
            <div class="font-semibold text-center mx-4">
                <p class="text-primary">102</p>
                <span class="text-primary">Posts</span>
            </div>
            <div class="font-semibold text-center mx-4">
                <p class="text-primary">102</p>
                <span class="text-primary">Followers</span>
            </div>
            <div class="font-semibold text-center mx-4">
                <p class="text-primary">102</p>
                <span class="text-primary">Folowing</span>
            </div>
        </div>
        

     
        
        <div class="flex justify-between items-center">
            <button class="w-full py-2 border-b-2 border-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto text-primary h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
            </button>
            <button class="w-full py-2 border-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto text-primary h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
            </button>
        </div>

        

    </div>



</div>
<Feed />
    </div>
  )
}

export default Profile