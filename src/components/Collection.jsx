import React, {useEffect, useState} from 'react';
import { useAuth } from '@polybase/react';
import { db } from '../App';

function Collection() {
  const { auth, state, loading } = useAuth();
  const collectionRef = db.collection("Collection");

  const fetchPublic = async() => {
    const collects = await collectionRef.where("private", "==", false).get();
    return collects;
  }

  const fetchPvt = async() => {
    const collects = await collectionRef.where("private", "==", true).get();
    return collects;
  }

  const [pubCollections, setPublic] = useState([]);
  const [pvtCollections, setPvt] = useState([]);

  useEffect(() => {
    (async () => {

      db.signer(async(data) => {
        return{
          h: 'eth-personal-sign',
          sig: await auth.ethPersonalSign(data)
        }
      });

    })();
  }, []);


  return (
<div className='font-jura bg-main h-screen text-center'>
<h1 class="sm:text-3xl text-3xl font-medium title-font text-primary mb-4">Collection</h1>


<div className='flex justify-center items-center'>
<ul class="flex flex-wrap text-sm font-medium text-center text-primary border-b border-primary items-center">
    <li class="mr-2">
        <a href="#" aria-current="page" class="inline-block p-4 text-primary hover:bg-secondary rounded-t-lg active">Public Collection</a>
    </li>
    <li class="mr-2">
        <a href="#" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-secondary">Private Collection</a>
    </li>
</ul>
</div>


  <div class="container px-5 py-12 mx-auto">
    <div class="flex flex-wrap -m-4">
      <div class="p-4 lg:w-1/3">
        <div class="h-full bg-thor bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h2 class="tracking-widest text-md title-font font-medium text-primary mb-2">CATEGORY</h2>
          <h1 class="title-font sm:text-2xl text-xl font-medium text-primary mb-3">Raclette Blueberry Nextious Level</h1>
          <p class="leading-relaxed text-primary mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
          <a class="text-indigo-400 inline-flex text-loki items-center">Learn More
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
          <div class="text-center mt-2 leading-none flex justify-center absolute left-0 w-full py-4">
            <span class="text-gray-500 inline-flex items-center leading-none text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="text-primary w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            </span>
          </div>
        </div>
      </div>
      <div class="p-4 lg:w-1/3">
      <div class="h-full bg-thor bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h2 class="tracking-widest text-md title-font font-medium text-primary mb-2">CATEGORY</h2>
          <h1 class="title-font sm:text-2xl text-xl font-medium text-primary mb-3">Raclette Blueberry Nextious Level</h1>
          <p class="leading-relaxed text-primary mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
          <a class="text-indigo-400 inline-flex text-loki items-center">Learn More
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
          <div class="text-center mt-2 leading-none flex justify-center absolute left-0 w-full py-4">
            <span class="text-gray-500 inline-flex items-center leading-none text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="text-primary w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            </span>
          </div>
        </div>
      </div>
      <div class="p-4 lg:w-1/3">
      <div class="h-full bg-thor bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h2 class="tracking-widest text-md title-font font-medium text-primary mb-2">CATEGORY</h2>
          <h1 class="title-font sm:text-2xl text-xl font-medium text-primary mb-3">Raclette Blueberry Nextious Level</h1>
          <p class="leading-relaxed text-primary mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
          <a class="text-indigo-400 inline-flex text-loki items-center">Learn More
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
          <div class="text-center mt-2 leading-none flex justify-center absolute left-0 w-full py-4">
            <span class="text-gray-500 inline-flex items-center leading-none text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="text-primary w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            </span>
          </div>
        </div>
      </div>
      <div class="p-4 lg:w-1/3">
      <div class="h-full bg-thor bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h2 class="tracking-widest text-md title-font font-medium text-primary mb-2">CATEGORY</h2>
          <h1 class="title-font sm:text-2xl text-xl font-medium text-primary mb-3">Raclette Blueberry Nextious Level</h1>
          <p class="leading-relaxed text-primary mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
          <a class="text-indigo-400 inline-flex text-loki items-center">Learn More
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
          <div class="text-center mt-2 leading-none flex justify-center absolute left-0 w-full py-4">
            <span class="text-gray-500 inline-flex items-center leading-none text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="text-primary w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            </span>
          </div>
        </div>
      </div>
      <div class="p-4 lg:w-1/3">
      <div class="h-full bg-thor bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h2 class="tracking-widest text-md title-font font-medium text-primary mb-2">CATEGORY</h2>
          <h1 class="title-font sm:text-2xl text-xl font-medium text-primary mb-3">Raclette Blueberry Nextious Level</h1>
          <p class="leading-relaxed text-primary mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
          <a class="text-indigo-400 inline-flex text-loki items-center">Learn More
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
          <div class="text-center mt-2 leading-none flex justify-center absolute left-0 w-full py-4">
            <span class="text-gray-500 inline-flex items-center leading-none text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="text-primary w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            </span>
          </div>
        </div>
      </div>
      <div class="p-4 lg:w-1/3">
      <div class="h-full bg-thor bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h2 class="tracking-widest text-md title-font font-medium text-primary mb-2">CATEGORY</h2>
          <h1 class="title-font sm:text-2xl text-xl font-medium text-primary mb-3">Raclette Blueberry Nextious Level</h1>
          <p class="leading-relaxed text-primary mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
          <a class="text-indigo-400 inline-flex text-loki items-center">Learn More
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
          <div class="text-center mt-2 leading-none flex justify-center absolute left-0 w-full py-4">
            <span class="text-gray-500 inline-flex items-center leading-none text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="text-primary w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Collection