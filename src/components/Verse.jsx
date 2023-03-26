import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../App';
import { useAuth } from '@polybase/react';


function Verse() {

  const { auth, state, loadng } = useAuth();
  const {id} = useParams();
  const collectionRef = db.collection("Collection");
  const profileReference = db.collection("User");
  const versesReference = db.collection("Verse");

  const [title, setTitle] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [creator, setCreator] = useState("");
  const [coll, setColl] = useState("");
  const [collId, setCollId] = useState("");
  const [liked, setLiked] = useState(false);
  const [content, setContent] = useState("");

  const addLike = async (inp, usr) => {
    try{
    await inp.call("addFavorite", [usr]);
    alert("Liked Successfully!");
    } catch (error){
      alert(error);
    }
  }

  useEffect(() => {
    (async () => {

        const _verse = await versesReference.where("id", "==", id).get();
        for( const k in _verse.data[0].data.favorites) {
          if(_verse.data[0].data.favorites[k].id == state.publicKey) {
            setLiked(true);
          }
        }
        setTitle(_verse.data[0].data.title);
        setContent(_verse.data[0].data.content);
        const _creator = await profileReference.where("id", "==", _verse.data[0].data.creator.id).get();
        setCreator(_creator.data[0].data.pen_name);
        const _coll = await collectionRef.where("id", "==", _verse.data[0].data.collectiion.id).get();
        setColl(_coll.data[0].data.name);
        setCollId(_coll.data[0].data.id);

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
    <div className='bg-thor w-full h-screen font-jura'>
        <main class="pt-8 pb-16 lg:pt-16 lg:pb-24">
  <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
      <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
      <h1 class="mb-4 text-4xl font-extrabold leading-tight text-loki  lg:mb-6 lg:text-4xl">{loaded ? title : ""}</h1>
      <h2 class="tracking-wide text-lg title-font font-bold text-secondary bg-loki rounded-2xl mb-4 w-fit px-8 py-0.5">{ loaded ? creator : "Creator"}</h2>
      <hr class="h-px opacity-50 my-1 bg-loki border-0 "></hr>
      <h2 class="tracking-widest text-lg title-font font-semibold text-primary rounded-lg  w-fit px-4 py-0.5"> {loaded ? coll : ""} </h2>
      <hr class="h-px opacity-50 my-1 bg-loki border-0 "></hr>
      <p className="leading-relaxed my-3 text-primary  text-2xl" dangerouslySetInnerHTML={{__html : content.replace(/\n/g, "<br />")}}></p>
      <div class="text-center mt-2 leading-none flex justify-center absolute left-0 w-full py-4 text-primary">
            <Link to={`/collection/${collId}/`}>
            <span class="text-primary mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-opacity-10 border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
            </svg>
            </span>
            </Link>
            <button onClick={() => {
              navigator.clipboard.writeText("http://localhost:3000/verse/" + id);
              alert("Link Copied To Clipboard!")
            }}>
            <span class="text-primary mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            </span>
            </button>
            { liked ? 
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                      </svg>
                    </span>
            : 
            <button onClick={() => addLike(versesReference.record(id), profileReference.record(state.publicKey))}><span className="text-gray-400 inline-flex items-center leading-none text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            </span>
            </button>
            }
          </div>
      </article>
      
      </div>
      </main>
    </div>
  )
}

export default Verse