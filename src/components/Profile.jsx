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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto w-6 h-6 text-primary">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
</svg>
            </button>
            <button class="w-full py-2 border-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-primary mx-auto w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
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