import React, {useEffect} from 'react';
import { useAuth } from '@polybase/react';
import { db } from '../App';

function Header() {
  const { auth, state, loading } = useAuth();
  const profileReference = db.collection("User");

  const connect = async () => {
    const authState = await auth.signIn();
    if(authState){
      await checkUser(authState);
      return authState;
    } else {
      return null;
    }
  }

  const checkUser = async (res) => {
  //  const res = await connect();
    if(res !== null) {
      try {
      const { data, block } = await profileReference.record(res.publicKey).get();
      console.log(data, block);
      } catch(error) {
        if(error == "Error: record/not-found error") {
          const recordData = await profileReference.create([
            "New User"
          ]);  
        }
      }

    } else {
      await connect();
    }
  }  

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
    <div className="bg-main">
        <header class="text-gray-600 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
      
    </nav>
    <a class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
      <span class="ml-3 text-5xl font-jura font-semibold text-primary">Verses.3</span>
    </a>
    <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
    <button onClick={connect} type="button" class="text-primary bg-secondary hover:bg-main font-jura font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2">{ state ? state.userId.slice(0,10) + "..." + state.userId.slice(-1) :  "Connect Wallet"}</button>
  
    </div>
  </div>
</header>
    </div>
  )
}

export default Header