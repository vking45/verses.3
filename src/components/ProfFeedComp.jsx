import React from "react";
import { Link } from "react-router-dom";
import { db } from "../App";

class ProfFeedComp extends React.Component {

    state = {rec : null, user : null}

    async addLike(inp, usr) {
      inp.call("addFavorite", [usr]);
    }

    componentDidMount() {
      const verseRef = db.collection("Verse");
      const profileReference = db.collection("User");
      const rec = verseRef.record(this.props.verseId);
      const _user = profileReference.record(this.props.user);
      this.setState({rec : rec, user : _user});
    }

    render() {
    return(
        <div class="p-4 lg:w-1/3">
        <div class="h-full bg-thor bg-opacity-75 px-8 pt-8 pb-12 rounded-xl overflow-hidden text-start relative">
          <h1 class=" text-3xl font-medium text-primary mb-3">{this.props.title}</h1>
          <hr class="h-px opacity-50 my-1 bg-loki border-0 "></hr>
          <h2 class="tracking-widest text-md title-font font-semibold text-primary rounded-lg  w-fit px-4 py-0.5">{this.props.collection}</h2>
          <hr class="h-px opacity-50 my-1 bg-loki border-0 "></hr>
          <p class="leading-relaxed mb-3 text-primary text-xl" dangerouslySetInnerHTML={{__html : this.props.content.replace(/\n/g, "<br />").slice(0,99)}}></p>
          <br />
          <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4 text-primary">
            <Link to={`/collection/${this.props.id}/`}>            <span class="text-primary mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-opacity-10 border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
            </svg>
            </span>
            </Link>
            <button onClick={() => {
              navigator.clipboard.writeText("http://localhost:3000/verse/" + this.props.verseId);
              alert("Link Copied To Clipboard!")
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            </button>
          </div>
        </div>
      </div>
    );
    }
}

export default ProfFeedComp;