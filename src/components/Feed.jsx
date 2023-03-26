import React, { useState, useEffect } from 'react';
import FeedComp from './FeedComp';
import { db } from '../App';
import { useAuth, useIsAuthenticated } from '@polybase/react';

let feedV = [];
function Feed() {

  const [loaded, setLoaded] = useState(false);
  const { auth, state, loading } = useAuth();
  const profileReference = db.collection("User");
  const collectionRef = db.collection("Collection");
  const verseRef = db.collection("Verse");
  const [isLoggedIn, loadingTwo] = useIsAuthenticated();

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

      const _verses = await verseRef.get();
      for( const i in _verses.data) {
        if(_verses.data[i].data.content != ""){
          let likedArray = _verses.data[i].data.favorites;
          const t = await profileReference.where("id", "==" ,_verses.data[i].data.creator.id).get();
      //    console.log(t.data[0].data.pen_name);
          const c = await collectionRef.where("id", "==" ,_verses.data[i].data.collectiion.id).get();
      //    console.log(c.data[0].data.name);
          const found = feedV.find(el => el.verseId === _verses.data[i].data.id);
          if(!found){
            const liked =  likedArray.find(el => el.id === state.publicKey);
            if(!liked){
              feedV.push({ verseId : _verses.data[i].data.id, title : _verses.data[i].data.title, creator : t.data[0].data.pen_name, collectionName : c.data[0].data.name, collectionId : c.data[0].data.id, content : _verses.data[i].data.content, liked : false});
            } else {
              feedV.push({ verseId : _verses.data[i].data.id, title : _verses.data[i].data.title, creator : t.data[0].data.pen_name, collectionName : c.data[0].data.name, collectionId : c.data[0].data.id, content : _verses.data[i].data.content, liked : true});
            }
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
    })();
  }, []);

  return (
    <div className="bg-main h-screen font-jura">
      <div class="container p-5 py-12 mx-auto">
        <div class="flex flex-wrap -m-4">

          {loaded ?

            feedV.map((inst) => (
              <FeedComp user={state.publicKey} verseId={inst.verseId} liked={inst.liked} title={inst.title} creator={inst.creator} collection={inst.collectionName} id={inst.collectionId} content={inst.content}/>
            ))

          : 
          <div class="h-full bg-thor bg-opacity-75 px-8 pt-8 pb-12 rounded-xl overflow-hidden text-start relative">
          <h1 class=" text-3xl font-medium text-primary mb-3">Loading...</h1>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Feed