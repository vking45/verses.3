import React, {useState, useEffect} from 'react';
import { db } from '../App';
import { useAuth, useIsAuthenticated } from '@polybase/react';
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";
import { uniqueNamesGenerator, adjectives, colors, starWars, names } from 'unique-names-generator';
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)


const customConfig = {
  dictionaries: [adjectives, colors, starWars, names],
  separator: '-',
  length: 2,
  style: 'capital'
};

function Vform() {
    const { auth, state, loadng } = useAuth();
    const [title, setTitle] = useState("");
    const [collection, setCollection] = useState("");
    const [options, setOptions] = useState([]);
    const [content, setContent] = useState("");
    const [user, setUser] = useState({});

    const [isLoggedIn, loading] = useIsAuthenticated();
    const profileReference = db.collection("User");
    const versesReference = db.collection("Verse");
    const collectionRef = db.collection("Collection");

    const fetchCollections = async () => {
      let temp = [];
      const temp_user = profileReference.record(state.publicKey)
      const collections = await collectionRef.get();
      for( const i in collections.data) {
        if(collections.data[i].data.creator.id == state.publicKey){
          temp.push(collections.data[i].data);
        }
      }
      console.log(temp);
      return temp;
    }

    const onCreate = async () => {
      const dateTime = dayjs();
      console.log(collectionRef.record(collection));
      let tempId = title + state.publicKey;
      try {
      const recordData = await versesReference.create([
        String(tempId).replace(/\s/g, ""),
        title,
        collectionRef.record(collection),
        profileReference.record(state.publicKey),
        content,
        dateTime.unix()
      ]);  
      console.log(recordData);
      await collectionRef.record(collection).call("addVerse", [versesReference.record(String(tempId).replace(/\s/g, ""))]);
      alert("Verse Created Successfully");
      window.location.href = "/";
      } catch(error) {
        console.log(error);
        alert(error);
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
                setUser(_user);
                try{
                  const _options = await fetchCollections();
                  setOptions(_options);
                } catch (error) {
                  console.log(error);
                }
            } else {;
                const _user = await checkUser(state);
                setUser(_user);
                try{
                  const _options = await fetchCollections();
                  setOptions(_options);
                } catch (error) {
                  console.log(error);
                }
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
        <div className='bg-main h-screen'>
            <section class="bg-main font-jura">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <div>
            <div class="grid gap-4 sm:grid-cols-1 sm:gap-6">
                <div class="sm:col-span-2">
                <input onChange={(e) => setTitle(e.target.value)} type="Title" class="block py-2.5 px-0 w-full text-lg text-primary bg-main border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Verse Title" required />
                </div>
                <div>
                    <select id="category" class="block py-2.5 px-0 w-full text-lg text-primary bg-main border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" onChange={(e) => setCollection(e.target.value)}>
                        <option value="" defaultValue>Select A Collection</option>
                        { options.length != 0 ?
                            options.map((opt) => (
                              <option value={opt["id"]}>{opt["name"]}</option>
                            ))
                          : 
                          ""
                        }
                    </select>
                </div>
                <div class="sm:col-span-2">
                    <label for="description" class="block mb-2 text-lg font-medium text-primary dark:text-white">Verse</label>
                    <textarea onChange={(e) => setContent(e.target.value)} value={content} id="description" rows="8" class="block p-2.5 w-full text-sm text-primary bg-secondary rounded-lg border border-main focus:ring-secondary focus:border-secondary " placeholder="Enter Your Creation Here"></textarea>
                </div>
            </div>
            <button onClick={onCreate} type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-primary bg-secondary rounded-lg hover:bg-main">
                Add Verse
            </button>
        </div>
    </div>
    </section>
        </div>
    )
}

export default Vform
