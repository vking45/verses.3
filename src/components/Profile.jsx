import React, {useEffect, useState} from 'react'
import Feed from './Feed';
import { useAuth, useIsAuthenticated } from '@polybase/react';
import { db } from '../App';

function Profile() {
    const { auth, state, loadng } = useAuth();
    const [isLoggedIn, loading] = useIsAuthenticated();
    const profileReference = db.collection("User");
    const [user, setUser] = useState({id : "0x000..", balance : "0", pen_name : "loading..."});

    const connect = async () => {
        const authState = await auth.signIn();
        if(authState){
          const profInst = await checkUser(authState);
          return profInst;
        } else {
          return null;
        }
      }
    
    const checkUser = async (res) => {
    //  const res = await connect();
      if(res !== null) {
        try {
        const data = await profileReference.record(res.publicKey).get();
        return data;
        } catch(error) {
          if(error == "Error: record/not-found error") {
            const recordData = await profileReference.create([
              "New User"
            ]);  
            return recordData;
        }
        }
    
      } else {
        await connect();
      }
    }  

    useEffect(() => {
        (async () => {
            if(!isLoggedIn) {
                const _user = await connect();
                setUser(_user);
            } else {
                const _user = await checkUser(state);
                setUser(_user);
            }

            db.signer(async(data) => {
                return{
                  h: 'eth-personal-sign',
                  sig: await auth.ethPersonalSign(data)
                }
              });
        })();
      }, []);

  return (
    <div className='font-jura bg-main'>

<div class="max-w-2xl mx-auto">

    <div class="px-3 py-2">
      
        <div class="flex flex-col gap-1 text-center">
            <a class="block mx-auto bg-center bg-no-repeat bg-cover w-20 h-20 rounded-full border border-gray-400 shadow-lg" href="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"></a>
            <p class="text-primary font-semibold">{loading ? "" : user.pen_name}
            </p>
            <span class="text-sm text-primary">Token Balance : {loading ? "" : user.balance}</span>
            <span class="text-sm text-primary">Wallet Address : {loading ? "" : user.id.slice(0,20)}...</span>
        </div>


   
        <div class="flex justify-center items-center gap-2 my-3">
            <div class="font-semibold text-center mx-4">
                <p class="text-primary">102</p>
                <span class="text-primary">Verses</span>
            </div>
            <div class="font-semibold text-center mx-4">
                <p class="text-primary">102</p>
                <span class="text-primary">Collection</span>
            </div>
            <div class="font-semibold text-center mx-4">
                <p class="text-primary">102</p>
                <span class="text-primary">Private Collection</span>
            </div>
        </div>
        

     
        
        <div className='flex justify-center items-center'>
<ul class="flex flex-wrap text-sm font-medium text-center text-primary border-b border-primary items-center">
    <li class="mr-2">
        <a href="#" aria-current="page" class="inline-flex p-4 text-primary hover:bg-secondary rounded-t-lg active">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
        </svg>
          My Verses</a>
    </li>
    <li class="mr-2">
        <a href="#" class="inline-flex p-4 rounded-t-lg hover:text-gray-600 hover:bg-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
        </svg>
          My Collection</a>
    </li>
</ul>
</div>

        

    </div>



</div>
<Feed />
    </div>
  )
}

export default Profile