import React, { useState, useEffect } from 'react';
import { db } from '../App';
import { useAuth, useIsAuthenticated } from '@polybase/react';
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

function Cform() {
    const { auth, state, loadng } = useAuth();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [user, setUser] = useState({});
    const [pvt, setPvt] = useState(false);
    const [price, setPrice] = useState(0);

    const [isLoggedIn, loading] = useIsAuthenticated();
    const profileReference = db.collection("User");
    const collectionRef = db.collection("Collection");

    const onCreate = async () => {
      const dateTime = dayjs();
      console.log(user);
      try {
      const recordData = await collectionRef.create([
        title + state.publicKey,
        title,
        desc,
        profileReference.record(state.publicKey),
        pvt,
        price,
        dateTime.unix()
      ]);  
      console.log(recordData);
      alert("Collection Successfully Created!!");
      } catch(error) {
        console.log(error);
      }
    }

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
            } else {
                const _user = await checkUser(state);
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
    <div className='h-screen bg-main'>
        <div className=''>
        <section class=" font-jura">
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <div>
          <div class="grid gap-4 sm:grid-cols-1 sm:gap-6">
              <div class="sm:col-span-2">
              <input onChange={(e) => setTitle(e.target.value)} type="Title" class="block py-2.5 px-0 w-full text-lg text-primary bg-main border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Collection Name" required />
              </div>
              <div class="sm:col-span-2">
                <label for="description" class="block mb-2 text-lg font-medium text-primary dark:text-white">Verse</label>
                  <textarea onChange={(e) => setDesc(e.target.value)} id="description" rows="8" class="block p-2.5 w-full text-sm text-primary bg-secondary rounded-lg border border-main focus:ring-secondary focus:border-secondary " placeholder="Collection Description"></textarea>
                  <input onChange={(e) => setPvt(e.target.value)} id="checked-checkbox" type="checkbox" value={pvt} class="w-4 h-4 mt-2 bg-secondary text-primary rounded"/>
                <label for="checked-checkbox" class="ml-2 mt-2 text-sm font-medium text-primary">Private Collection</label>
                  { pvt ? 
                  <div className='w-1/4'>
                  <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" name="price" id="price" class="block py-2.5 px-0 w-full text-lg text-primary bg-main border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="0" />
                  </div>
                  : "" }
              </div>
          </div>
          <button onClick={onCreate} type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-primary bg-secondary rounded-lg hover:bg-main">
              Add Verse
          </button>
      </div>
  </div>
</section>
    </div>
    </div>
  )
}

export default Cform