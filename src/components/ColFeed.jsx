import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '@polybase/react';
import { db } from '../App';

let feedV = [];
function ColFeed() {

  const { auth, state, loadng } = useAuth();
  const {id} = useParams();
  const collectionRef = db.collection("Collection");
  const profileReference = db.collection("User");
  const versesReference = db.collection("Verse");

  const [pvt, setPvt] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const addSub = async (inp, usr) => {
    try{
    await inp.call("addSubscriber", [usr]);
    alert("Subscribed Successfully!");
    } catch (error){
      alert(error);
    }
  }

  useEffect(() => {
    (async () => {

        const _col = await collectionRef.where("id", "==", id).get();
        console.log(_col.data[0].data);
        setTitle(_col.data[0].data.name);
        setPvt(_col.data[0].data.private);
        setPrice(_col.data[0].data.price);

        for( const j in _col.data[0].data.subscribers) {
          if(_col.data[0].data.subscribers[j].id == state.publicKey) {
            setSubscribed(true);
          }
        }

        for(const i in _col.data[0].data.verses){
          const _verse = await versesReference.where("id", "==", _col.data[0].data.verses[i].id).get();
          const found = feedV.find(el => el.id === _verse.data[0].data.id);
          if(!found){
          feedV.push(_verse.data[0].data);
          }
          console.log(feedV);
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
    <div class="container px-5 py-24 mx-auto h-screen bg-main font-jura">
      
        <h1 class="sm:text-3xl text-3xl font-medium title-font text-primary mb-4 inline-flex">{ loaded ? title : "Loading..."}</h1>
 
        <button onClick={(e) => addSub(collectionRef.record(id), profileReference.record(state.publicKey))} type="button" class= { subscribed ? "inline-flex text-primary bg-sherlock hover:bg-thor border border-thor font-jura font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2" : "inline-flex text-primary bg-thor hover:bg-loki border border-thor font-jura font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2"} disabled={subscribed}> { subscribed ? "Subscribed" : "Subscribe" }
              <div className="mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-flex mx-1 w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
                { pvt ? price : "" }
              </div>
        </button>
    <div class="flex flex-wrap -m-4">
          {loaded ? 
            feedV.map((inst) => (
              <div class="p-4 lg:w-1/3">
              <div class="h-full bg-thor bg-opacity-75 px-8 pt-8 pb-12 rounded-xl overflow-hidden text-start relative">
              <Link to={`/verse/${inst.id}/`}>
                <h1 class=" text-3xl font-medium text-primary mb-3">{inst.title}</h1>
                <hr class="h-px opacity-50 my-1 bg-loki border-0 "></hr>
                <p class="leading-relaxed mb-3 text-primary text-xl" dangerouslySetInnerHTML={{__html : inst.content.replace(/\n/g, "<br />").slice(0,99)}}></p>
              </Link>   
                <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4 text-primary">
                  <button onClick={() => {
                    navigator.clipboard.writeText("http://localhost:3000/verse/" + inst.id);
                    alert("Link Copied To Clipboard!")
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                  </button>
                </div>
              </div>
            </div>

            ))
          : ""}
      </div>
    </div>

  )
}

export default ColFeed