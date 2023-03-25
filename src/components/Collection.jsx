import React, {useEffect, useState} from 'react';
import { useAuth } from '@polybase/react';
import { db } from '../App';
import ColComp from './ColComp';

function Collection() {
  const { auth, state, loading } = useAuth();
  const collectionRef = db.collection("Collection");
  const [view, setView] = useState(true);
  const [loaded, setLoaded] = useState(false);

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

      let tempPub = [];
      let tempPvt = [];

      const _public = await fetchPublic();
      const _pvt = await fetchPvt();
      
      for(const i in _public.data){tempPub.push(_public.data[i].data)}
      for(const i in _pvt.data){tempPvt.push(_pvt.data[i].data)}
      setPublic(tempPub);
      setPvt(tempPvt);

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
<div className='font-jura bg-main h-screen text-center'>
<h1 class="sm:text-3xl text-3xl font-medium title-font text-primary mb-4">Collections</h1>


<div className='flex justify-center items-center'>
<ul class="flex flex-wrap text-sm font-medium text-center text-primary border-b border-primary items-center">
    <li class="mr-2">
        <button onClick={(e) => setView(true)} aria-current="page" class="inline-block p-4 text-primary hover:bg-secondary rounded-t-lg active">Public</button>
    </li>
    <li class="mr-2">
        <button onClick={(e) => setView(false)} class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-secondary">Private</button>
    </li>
</ul>
</div>

  { loaded ? 
  <div class="container px-5 py-12 mx-auto">
    <div class="flex flex-wrap -m-4">
      { view ?
          pubCollections.map((col) => (
            <ColComp title={col.name} desc={col.description} id={col.id} date={col.timestamp} />
          ))
      : 
          pvtCollections.map((col) => (
            <ColComp title={col.name} desc={col.description} id={col.id} date={col.timestamp} />
          ))
      }
    </div>
  </div>
  : ""}
</div>
  )
}

export default Collection