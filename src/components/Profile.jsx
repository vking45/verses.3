import React, {useEffect, useState} from 'react'
import ProfFeedComp from './ProfFeedComp';
import ProfColComp from './ProfColComp';
import { useAuth, useIsAuthenticated } from '@polybase/react';
import { db } from '../App';
import { uniqueNamesGenerator, adjectives, colors, starWars, names } from 'unique-names-generator';

const customConfig = {
  dictionaries: [adjectives, colors, starWars, names],
  separator: '-',
  length: 2,
  style: 'capital'
};

let feedV = [];
let feedC = [];

function Profile() {
    const { auth, state, loadng } = useAuth();
    const [loaded, setLoaded] = useState(false);
    const [verse, setVerse] = useState(true);
    const collectionRef = db.collection("Collection");
    const verseRef = db.collection("Verse");
    const [isLoggedIn, loading] = useIsAuthenticated();
    const profileReference = db.collection("User");
    const [user, setUser] = useState({id : "0x000000000000000000000000000..", balance : "0", pen_name : "loading..."});

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
              uniqueNamesGenerator(customConfig)
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
                setUser(_user.data);
            } else {
                const _user = await checkUser(state);
                setUser(_user.data);
            }

            const _verses = await verseRef.get();
            for( const i in _verses.data) {
              if(_verses.data[i].data.content != "" && _verses.data[i].data.creator.id == state.publicKey){
                let likedArray = _verses.data[i].data.favorites;
                const t = await profileReference.where("id", "==" ,_verses.data[i].data.creator.id).get();
            //    console.log(t.data[0].data.pen_name);
                const c = await collectionRef.where("id", "==" ,_verses.data[i].data.collectiion.id).get();
            //    console.log(c.data[0].data.name);
                const found = feedV.find(el => el.title === _verses.data[i].data.title);
                if(!found){
                  const liked =  likedArray.find(el => el.id === state.publicKey);
                  if(!liked){
                    feedV.push({ verseId : _verses.data[i].data.id,title : _verses.data[i].data.title, creator : t.data[0].data.pen_name, collectionName : c.data[0].data.name, collectionId : c.data[0].data.id, content : _verses.data[i].data.content, liked : false});
                  } else {
                    feedV.push({ verseId : _verses.data[i].data.id,title : _verses.data[i].data.title, creator : t.data[0].data.pen_name, collectionName : c.data[0].data.name, collectionId : c.data[0].data.id, content : _verses.data[i].data.content, liked : true});
                  }
                }
              }
            }

            const _coll = await collectionRef.get();
            for( const i in _coll.data){
              if(_coll.data[i].data.creator.id == state.publicKey) {
                console.log(_coll.data[i].data.id);
                const found = feedC.find(el => el.id == _coll.data[i].data.id);
                if(!found){
                  feedC.push(_coll.data[i].data);
                }
              }
            }

            db.signer(async(data) => {
                return{
                  h: 'eth-personal-sign',
                  sig: await auth.ethPersonalSign(data)
                }
              });

            setLoaded(true);  
            console.log(feedC);
        })();
      }, []);

  return (
    <div className='font-jura bg-main'>

<div class="max-w-2xl mx-auto">

    <div class="px-3 py-2">
      
        <div class="flex flex-col gap-1 text-center">
            <p class="text-primary font-semibold">{loaded ? user.pen_name : "" }
            </p>
            <span class="text-sm text-primary">Token Balance : {loaded ? user.balance : ""} </span>
            <span class="text-sm text-primary">Wallet Address : {loaded ? user.id.slice(0,20) : ""}... </span>
        </div>


   
        <div class="flex justify-center items-center gap-2 my-3">
            <div class="font-semibold text-center mx-4">
                <p class="text-primary">{feedV.length}</p>
                <span class="text-primary">Verses</span>
            </div>
            <div class="font-semibold text-center mx-4">
                <p class="text-primary">{feedC.length}</p>
                <span class="text-primary">Collections</span>
            </div>
        </div>
        

     
        
        <div className='flex justify-center items-center'>
<ul class="flex flex-wrap text-sm font-medium text-center text-primary border-b border-primary items-center">
    <li class="mr-2">
        <button onClick={(e) => setVerse(true)} aria-current="page" class="inline-flex p-4 text-primary hover:bg-secondary rounded-t-lg active">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
        </svg>
          My Verses</button>
    </li>
    <li class="mr-2">
        <button onClick={(e) => setVerse(false)} class="inline-flex p-4 rounded-t-lg hover:text-gray-600 hover:bg-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
        </svg>
          My Collection</button>
    </li>
</ul>
  </div>
  </div>
</div>
  <div className="h-screen w-screen">
    <div className="bg-main h-full font-jura">
      <div class="container p-5 py-12 mx-auto">
        <div class="flex flex-wrap -m-4">
        { verse ?
          feedV.map((inst) => (
            <ProfFeedComp user={state.publicKey} verseId={inst.verseId} liked={inst.liked} title={inst.title} creator={inst.creator} collection={inst.collectionName} id={inst.collectionId} content={inst.content}/>
          ))
          : 
            feedC.map((col) => (
              <ProfColComp title={col.name} desc={col.description} id={col.id} />            
          ))
          }
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Profile